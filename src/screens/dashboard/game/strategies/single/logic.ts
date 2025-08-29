// strategies/SinglePlayerStrategy.ts
import { BaseGameStrategy } from '../abstract.strategy';
import { GameModeType, IStartGame, AnswerType, EventsEnum, BaseGameState, SinglePlayerGame, Question } from '@/types/quiz';
import { store } from '@/store/store';
import { setCurrentQuestion, setGameDetail, setGameState, setResult } from '@/store/quiz/quiz.slice';
import { navigate } from '@/hooks';
import { debounce } from '@/util/debounce';
import { createSelector } from '@reduxjs/toolkit';
import { selectGameResult, selectGameState } from '@/store/quiz/quiz.selector';

export type SinglePlayerGameResult = SinglePlayerGame
export interface ISinglerPlayerStateType extends BaseGameState { }


export class SinglePlayerStrategy extends BaseGameStrategy {
    protected MODE = GameModeType.Single;

    // Define listeners (used by BaseGameStrategy)
    protected getListeners() {
        return {
            [EventsEnum.STARTED_GAME]: (state: ISinglerPlayerStateType) => store.dispatch(setGameDetail({ mode: this.MODE, categoryId: state.ca })),
            [EventsEnum.NEW_QUESTION]: (question: Question) => store.dispatch(setCurrentQuestion(question)),
            [EventsEnum.STATE]: (state: ISinglerPlayerStateType) => debounce(() => store.dispatch(setGameState(state)), 1000),
            [EventsEnum.RESULT]: (result: SinglePlayerGameResult) => {
                {
                    store.dispatch(setResult(result)),
                        navigate('DashboardStack', { screen: 'Result' })
                }
            }
        };
    }


    startGame(options: IStartGame) {
        this.socket.emit(EventsEnum.START_GAME, options);
    }


    submitAnswer(answerId: AnswerType) {
        this.socket.emit(EventsEnum.SUBMIT_ANSWER, { answer: answerId });
    }

    public gameClean() {
        super.gameClean();
    }
}

export const selectQuizResult = createSelector(
    [selectGameResult],
    (game: SinglePlayerGameResult | undefined) => {
        return {
            gameId: game?._id,
            asked:
                (game?.totalCorrect || 0) +
                (game?.totalIncorrect || 0) +
                (game?.totalSkipped || 0),
            totalQuestions: game?.questions?.length || 0,
            skipped: game?.totalSkipped || 0,
            incorrect: game?.totalIncorrect || 0,
            correct: game?.totalCorrect || 0,
            totalTimeTaken: game?.totalTimeTaken || 0,
            totalAvailableTime: game?.totalTimeAvailable || 0,
            totalPoints: game?.score || 0,
        };
    }
);

export const selectQuizStats = createSelector(
    [selectGameState],
    (state: ISinglerPlayerStateType | undefined) => {
        return {
            asked: state?.ci !== undefined ? state.ci + 1 : 0,
            total: state?.tq ?? 1,
        };
    }

)