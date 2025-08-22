// strategies/createSinglePlayerStrategy.ts
import { Socket } from 'socket.io-client';
import { GameModeType, IStartGame, GameStrategy, ListenEventsMap } from '@/types/quiz';
import { Observer } from '@/util';
import { QuizSocketService } from '@/store/quiz/socket';

export interface ISinglePlayerStrategy extends GameStrategy { }

export const useSinglePlayerStrategy = (): ISinglePlayerStrategy => {
    const MODE = GameModeType.Single;
    const socket: Socket = QuizSocketService.getInstance().getSocket();
    const events = new Observer<ListenEventsMap>();

    socket.on('new_question', (q) => events.emit('new_question', q));
    socket.on('started_game', (summary) => events.emit('started_game', summary));
    socket.on('result', (result) => events.emit('result', result));

    function getGameMode() {
        return MODE;
    }

    function startGame(options: IStartGame) {
        socket.emit('start_game', options);
    }

    function submitAnswer(answerId: string) {
        socket.emit('submit_answer', { answerId });
    }

    return { getGameMode, startGame, submitAnswer, events };
};
