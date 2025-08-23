import { GameModeType, GameStatus } from "./quiz.enum";
import { AnswerType, Question } from "@/graphql/generated";
import { ISinglePlayerStrategy, ISinglerPlayerStateType } from "@/screens/dashboard/game/stratigies/single/logic";
import { Observer } from "@/util";

export type { Question }

// basic events for game
export interface IStartGame {
  category: string;
  mode: GameModeType
}

export interface GameHistoryDoc {
  id: string;
  categoryId: string;
  startedAt: string;
  endedAt?: string;
  questions: string[];
  players: string[];
  mode: GameModeType;
}

export enum EventsEnum {
  START_GAME = 'start_game',
  STARTED_GAME = 'started_game',
  NEW_QUESTION = 'new_question',
  SUBMIT_ANSWER = 'submit_answer',
  STATE = 'state',
  RESULT = 'result',
}

export interface ListenEventsMap {
  [EventsEnum.NEW_QUESTION]: Question,
  [EventsEnum.RESULT]: GameHistoryDoc
  [EventsEnum.STATE]: BaseGameState
  [EventsEnum.STARTED_GAME]: BaseGameState
}

export interface EmitEventsMap {
  [EventsEnum.START_GAME]: IStartGame
  [EventsEnum.SUBMIT_ANSWER]: { answer: string }
}

// state related 
export type Answer = {
  c: boolean;
  p: number;     // points
  t: number;     // time taken (ms)
  at: number;    // available time
  sk: boolean;   // skipped
  s?: string;    // selected answer (undefined if skipped)
};

export interface Player {
  id: string;
  si: string;
  n: string;             // name
  tc: number;            // total correct
  a: Record<number, Answer>; // index -> Answer
}

export interface BaseGameState {
  m: GameModeType;       // mode
  s: GameStatus;         // status
  ps: Player[];          // players
  qs: string[];          // question MongoIds
  tq: number;            // total questions
  ci: number;            // current question index
  ca: string;            // categoryId
  st: number;            // startedAt (epoch ms)
  et?: number;           // endedAt (epoch ms)
  la?: string;           // lastAskedAt
}

// for implementaing structre
export interface GameStrategy {

  getGameMode(): GameModeType;
  startGame<TStartGameProps extends IStartGame>(options: TStartGameProps): void;
  submitAnswer(answerId: AnswerType): void;

  /* ── optional callback hooks ── */
  events: Observer<ListenEventsMap>
}

// all game startergy
export type AllGameStrategy =
  | { type: typeof GameModeType.Single; strategy: ISinglePlayerStrategy; state: ISinglerPlayerStateType }
  | { type: typeof GameModeType.Single; strategy: ISinglePlayerStrategy; state: ISinglerPlayerStateType }


