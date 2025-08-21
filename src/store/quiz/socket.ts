// utils/QuizSocketService.ts
import { io, Socket } from 'socket.io-client';
import { HOST_URL } from '@env';

export class QuizSocketService {
  private static instance: QuizSocketService;
  private socket: Socket;

  private constructor() {
    this.socket = io(`${HOST_URL}/quiz`, {
      transports: ['websocket'], // ensures real-time connection
      autoConnect: true,         // automatically connect on import
      reconnection: true,        // enable automatic reconnection
      reconnectionAttempts: 5,   // number of attempts before giving up
      reconnectionDelay: 1000,   // wait 1s before retry
    });
  }

  public static getInstance(): QuizSocketService {
    if (!QuizSocketService.instance) {
      QuizSocketService.instance = new QuizSocketService();
    }
    return QuizSocketService.instance;
  }

  public getSocket(): Socket {
    return this.socket;
  }
}