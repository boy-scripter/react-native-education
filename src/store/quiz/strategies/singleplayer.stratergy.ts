// strategies/SinglePlayerModeStrategy.ts
import { Socket, WebSocket } from 'socket.io-client';
import { GameModeStrategy, GameModeType, startGameProps } from '@/types/quiz';
import { QuizSocketService } from '../socket';



export class SinglePlayerModeStrategy implements GameModeStrategy {
    private socket: Socket;

    constructor() {
        this.socket = QuizSocketService
            .getInstance()
            .getSocket()
    }

    startGame(options: startGameProps): void {
        this.socket.emit('start-game', options)
    }

    selectAnswer(): void {

    }

    OnResult(): void {
        
    }

    onNewQuestion(): void {
        
    }

    onState(): void {
        
    }

}