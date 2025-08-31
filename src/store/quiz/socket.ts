import { io, Socket } from 'socket.io-client';
import { HOST_URL } from '@env';
import { refreshTokenAction, isMutexLocked, waitForMutex } from '@/baseApi/refreshAction';
import { store } from '@store/store';
import { logout } from '@store/auth/auth.slice';
import { selectAuth } from '../auth/auth.selector';
import { EventsMap } from "@socket.io/component-emitter"

export class QuizSocketService {
  private static instance: QuizSocketService | null = null;
  private socket: Socket;
  private connected = false;
  private DEBUG: boolean = false;

  private constructor() {
    this.socket = io(`${HOST_URL}/quiz`, {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      extraHeaders: {
        Authorization: `Bearer ${this.getAccessToken()}`,
      },
    });

    this.socket.on('connect', () => {
      this.connected = true;
    });

    this.socket.on('disconnect', () => {
      this.connected = false;
    });

    this.socket.on('connect_error', async (err: any) => {
      if (!err.message?.toLowerCase().includes('unauthorized')) return;
      const handleLogout = () => store.dispatch(logout());

      if (!isMutexLocked()) {
        const newAccessToken = await refreshTokenAction();
        if (newAccessToken) {
          this.reconnectWithNewToken(newAccessToken);
        } else {
          handleLogout();
        }
        return;
      }

      await waitForMutex();
      const token = this.getAccessToken();
      if (token) {
        this.reconnectWithNewToken(token);
      } else {
        handleLogout();
      }
    });
  }

  /** Singleton getter */
  public static getInstance(): QuizSocketService {
    if (!QuizSocketService.instance) {
      QuizSocketService.instance = new QuizSocketService();
    }
    return QuizSocketService.instance;
  }

  /** 🔄 Reset: disconnect and destroy instance */
  public static reset(): void {
    if (QuizSocketService.instance) {
      QuizSocketService.instance.socket.removeAllListeners();
      QuizSocketService.instance.socket.disconnect();
      QuizSocketService.instance = null;
    }
  }

  public getSocket<TServer extends EventsMap, TClient extends EventsMap>(): Socket<TServer, TClient> {
    return this.socket;
  }

  public onConnect(callBack: () => any): void {
    this.socket.on('connect', callBack);
  }

  public onDisconnect(callBack: () => any): void {
    this.socket.on('disconnect', callBack);
  }

  public onException(callBack: (p1: any) => void): void {
    this.socket.on('exception', (err: any) => {
      if (this.DEBUG) {
        console.log(err);
      }
      callBack(err);
    });
  }

  public isConnected(): boolean {
    return this.connected;
  }

  /** 🔑 Helper: get token from Redux */
  private getAccessToken(): string | null {
    const state = store.getState();
    return selectAuth(state).access_token || null;
  }

  private reconnectWithNewToken(newToken: string) {
    console.log('Reconnecting socket with refreshed token...');
    this.socket.io.opts.extraHeaders = {
      ...this.socket.io.opts.extraHeaders,
      Authorization: `Bearer ${newToken}`,
    };
    this.socket.disconnect();
    this.socket.connect();
  }
}
