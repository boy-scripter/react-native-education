import { GameModeType, IStartGame, AnswerType, ListenEventsMap, EventsEnum } from '@/types/quiz';
import { Observer } from '@/util';
import { QuizSocketService } from '@/store/quiz/socket';
import { store } from '@/store/store';
import { resetGame } from '@/store/quiz/quiz.slice';

export abstract class BaseGameStrategy {
    protected socket = QuizSocketService.getInstance().getSocket();
    protected events = new Observer<ListenEventsMap>();
    protected abstract MODE: GameModeType;

    constructor() {
        this.registerListeners();
    }

    private registeredListeners: Partial<Record<EventsEnum, Function>> = {};

    public getGameMode() {
        return this.MODE;
    }

    public get eventsObserver() {
        return this.events;
    }

    protected abstract getListeners(): Partial<Record<EventsEnum, Function>>;

    protected registerListeners() {
        this.cleanupListeners();
        const listeners = this.getListeners();

        for (const [event, handler] of Object.entries(listeners) as [EventsEnum, Function][]) {
            this.socket.on(event, handler);
            this.registeredListeners[event] = handler;
        }
    }

    protected cleanupListeners() {
        for (const [event, handler] of Object.entries(this.registeredListeners) as [EventsEnum, Function][]) {
            this.socket.off(event, handler);
        }
        this.registeredListeners = {};
    }

    public gameClean() {
        this.cleanupListeners();
        store.dispatch(resetGame());
    }

    abstract startGame(options: IStartGame): void;
    abstract submitAnswer(answerId: AnswerType): void;
}
