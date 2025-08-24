// strategies/createSinglePlayerStrategy.ts
import { GameModeType, IStartGame, GameStrategy, ListenEventsMap, EventsEnum, BaseGameState } from '@/types/quiz';
import { Observer } from '@/util';
import { QuizSocketService } from '@/store/quiz/socket';
import { useAppDispatch } from '@/store/store';
import { setCurrentQuestion, setCurrentMode, setGameState } from '@/store/quiz/quiz.slice';

export interface ISinglePlayerStrategy extends GameStrategy { }
export interface ISinglerPlayerStateType extends BaseGameState { }

export const SinglePlayerStratergy = (): ISinglePlayerStrategy => {

    const dispatch = useAppDispatch()
    const MODE = GameModeType.Single;
    const socket = QuizSocketService.getInstance().getSocket();
    const events = new Observer<ListenEventsMap>();

    function getGameMode() {
        return MODE
    }

    socket.on(EventsEnum.STARTED_GAME, (state) => {
        events.emit(EventsEnum.STARTED_GAME, state)
        dispatch(setCurrentMode(MODE))
    });

    socket.on(EventsEnum.NEW_QUESTION, (question) => {
        events.emit(EventsEnum.NEW_QUESTION, question)
        alert(question)
        dispatch(setCurrentQuestion(question))
    });

    socket.on(EventsEnum.STATE, (state) => {
        events.emit(EventsEnum.STATE, state)
        dispatch(setGameState(state))
    });

    socket.on(EventsEnum.RESULT, (result) => events.emit(EventsEnum.RESULT, result));

    function startGame(options: IStartGame) {
        socket.emit(EventsEnum.START_GAME, options);
    }

    function submitAnswer(answerId: string) {
        socket.emit(EventsEnum.SUBMIT_ANSWER, { answerId });
    }

    return { getGameMode, startGame, submitAnswer, events };
};
