// strategies/createSinglePlayerStrategy.ts
import { GameModeType, IStartGame, GameStrategy, ListenEventsMap, EmitEventsMap, EventsEnum, BaseGameState, AnswerType } from '@/types/quiz';
import { Observer } from '@/util';
import { QuizSocketService } from '@/store/quiz/socket';
import { useAppDispatch } from '@/store/store';
import { setCurrentQuestion, setGameDetail, setGameState, resetGame } from '@/store/quiz/quiz.slice';
import { createSelector } from '@reduxjs/toolkit';
import { selectGameState } from '@/store/quiz/quiz.selector';
import { replace } from '@/hooks';

export interface ISinglePlayerStrategy extends GameStrategy { }
export interface ISinglerPlayerStateType extends BaseGameState { }

export const selectQuizStats = createSelector(
    [selectGameState],
    (gameState?: BaseGameState) => {
        if (!gameState) {
            return { totalQuestions: 0, asked: 0 };
        }

        const totalQuestions = gameState.tq;
        const asked = gameState.ci + 1; // current index is 0-based

        return { totalQuestions, asked };
    }
);

export const SinglePlayerStratergy = (): ISinglePlayerStrategy => {


    const dispatch = useAppDispatch()
    const MODE = GameModeType.Single;
    const socket = QuizSocketService.getInstance().getSocket<ListenEventsMap, EmitEventsMap>();
    const events = new Observer<ListenEventsMap>();

    function getGameMode() { return MODE }   /* returns mode */

    function gameClean() {
        socket.off(EventsEnum.STARTED_GAME);
        socket.off(EventsEnum.NEW_QUESTION)
        socket.off(EventsEnum.STATE)
        socket.off(EventsEnum.RESULT)
        dispatch(resetGame())
    }

    // listners and dispaetchers
    socket.on(EventsEnum.STARTED_GAME, (state) => {
        events.emit(EventsEnum.STARTED_GAME, state)
        dispatch(
            setGameDetail({
                mode: MODE,
                categoryId: state.ca
            }))
    });

    socket.on(EventsEnum.NEW_QUESTION, (question) => {
        events.emit(EventsEnum.NEW_QUESTION, question)
        dispatch(setCurrentQuestion(question))
    });

    socket.on(EventsEnum.STATE, (state) => {
        events.emit(EventsEnum.STATE, state)
        dispatch(setGameState(state))
    });

    socket.on(EventsEnum.RESULT, (result) => {
        events.emit(EventsEnum.RESULT, result)
        replace('DashboardStack', { screen: 'Result' })
    });


    // end here listners and dispaetchers
    function startGame(options: IStartGame) {
        socket.emit(
            EventsEnum.START_GAME,
            options
        );
    }

    function submitAnswer(answerId: AnswerType) {
        socket.emit(
            EventsEnum.SUBMIT_ANSWER,
            { answer: answerId }
        );
    }

    return { getGameMode, startGame, submitAnswer, gameClean, events };
};
