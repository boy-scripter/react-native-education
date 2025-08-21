// strategies/SinglePlayerModeStrategy.ts
import { Socket, WebSocket } from 'socket.io-client';
import { GameModeStrategy, GameModeType, startGameProps } from '@/types/quiz';
import { QuizSocketService } from '../socket';
import { AppDispatch } from '@/store/store';

export class SinglePlayerModeStrategy extends GameModeStrategy {
    private MODE = GameModeType.Single
    private socket: Socket;

    constructor(private dispatcher: AppDispatch) {
        super(dispatcher)
        this.socket = QuizSocketService
            .getInstance()
            .getSocket()
    }

    startGame(options: startGameProps): void {
        this.socket.emit('start-game', options)
    }

    submitAnswer(): void {

    }

    onNewQuestion(): void {

    }

    getGameMode() {
        return this.MODE
    }




}