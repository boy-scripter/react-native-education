// strategies/createSinglePlayerStrategy.ts
import { Socket } from 'socket.io-client';
import { GameModeType, IStartGame, GameStrategy, ListenEventsMap, EventsEnum, BaseGameState } from '@/types/quiz';
import { Observer } from '@/util';
import { QuizSocketService } from '@/store/quiz/socket';
import { useAppDispatch } from '@/store/store';

export interface ISinglePlayerStrategy extends GameStrategy { }
export interface ISinglerPlayerStateType extends BaseGameState { }

export const SinglePlayerStratergy = (): ISinglePlayerStrategy => {
    
    const MODE = GameModeType.Single;
    const socket =  QuizSocketService.getInstance().getSocket();
    const events = new Observer<ListenEventsMap>();

    const dispatch = useAppDispatch()

    socket.on(EventsEnum.NEW_QUESTION, (question) => events.emit(EventsEnum.NEW_QUESTION, question));
    socket.on(EventsEnum.STATE, (state) => events.emit(EventsEnum.STATE, state));
    socket.on(EventsEnum.STARTED_GAME, (state) => events.emit(EventsEnum.STARTED_GAME, state));
    socket.on(EventsEnum.RESULT, (result) => events.emit(EventsEnum.RESULT, result));

    function getGameMode() {
        return MODE;
    }

    function startGame(options: IStartGame) {
        socket.emit(EventsEnum.START_GAME, options);
    }

    function handleSkip() {
        socket.emit(EventsEnum.SKIP_QUESTION);
    }

    function submitAnswer(answerId: string) {
        socket.emit(EventsEnum.SUBMIT_ANSWER, { answerId });
    }

    return { getGameMode, startGame, submitAnswer, events };
};
