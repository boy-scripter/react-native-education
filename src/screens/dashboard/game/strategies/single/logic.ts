// strategies/SinglePlayerStrategy.ts
import { BaseGameStrategy } from '../abstract.strategy';
import { GameModeType, IStartGame, AnswerType, EventsEnum, BaseGameState } from '@/types/quiz';
import { store } from '@/store/store';
import { setCurrentQuestion, setGameDetail, setGameState, setResult } from '@/store/quiz/quiz.slice';
import { navigate } from '@/hooks';
import { debounce } from '@/util/debounce';
import { createSelector } from '@reduxjs/toolkit';
import { selectGameResult } from '@/store/quiz/quiz.selector';


export interface ISinglerPlayerStateType extends BaseGameState { }

export const selectQuizStats = createSelector(
    [selectGameResult],
    (gameState) => {
        if (!gameState) {
            return {
                totalQuestions: 0,
                asked: 0,
                skipped: 0,
                incorrect: 0,
                correct: 0,
                totalTimeTaken: 0,
                totalAvailableTime: 0,
                totalPoints: 0,
            };
        }

        const {
            tq: totalQuestions,
            ci,
            totalCorrect = 0,
            totalIncorrect = 0,
            totalSkipped = 0,
            totalTimeTaken = 0,
            totalTimeAvailable = 0,
            score: totalPoints = 0,
        } = gameState;

        const asked = ci + 1;
        return {
            totalQuestions,
            asked,
            skipped: totalSkipped,
            incorrect: totalIncorrect,
            correct: totalCorrect,
            totalTimeTaken,
            totalAvailableTime: totalTimeAvailable,
            totalPoints,
        };
    }
);

export class SinglePlayerStrategy extends BaseGameStrategy {
    protected MODE = GameModeType.Single;



    // Define listeners (used by BaseGameStrategy)
    protected getListeners() {
        return {
            [EventsEnum.STARTED_GAME]: (state: any) => { console.log(state, 'state'); store.dispatch(setGameDetail({ mode: this.MODE, categoryId: state.ca })); console.log(state, 'state'); },

            [EventsEnum.NEW_QUESTION]: (question: any) =>
                store.dispatch(setCurrentQuestion(question)),

            [EventsEnum.STATE]: (state: any) =>
                store.dispatch(setGameState(state)),

            [EventsEnum.RESULT]: (result: any) => {
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

    // Optional: you can extend gameClean if needed
    public gameClean() {
        super.gameClean(); // cleans listeners + resets redux
    }
}
