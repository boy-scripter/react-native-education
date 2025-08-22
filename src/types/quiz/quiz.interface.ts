import { GameModeType, GameStatus } from "./quiz.enum";
import { Question } from "@/graphql/generated";
import { Observer } from "@/util";

export type { Question }

export interface ListenEventsMap {
  new_question: Question,
  result: GameHistoryDoc
  started_game: any
}

export interface EmitEventsMap {
  start_game: IStartGame
  submit_answer: { answer: string }
}

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

// export type Answer = {
//   c: boolean;
//   p: number;     // points
//   t: number;     // time taken (ms)
//   at: number;    // available time
//   sk: boolean;   // skipped
//   s?: string;    // selected answer (undefined if skipped)
// };

// export interface Player {
//   id: string;
//   si: string;
//   n: string;             // name
//   tc: number;            // total correct
//   a: Record<number, Answer>; // index -> Answer
// }

// export interface BaseGameState {
//   m: GameModeType;       // mode
//   s: GameStatus;         // status
//   ps: Player[];          // players
//   qs: string[];          // question MongoIds
//   tq: number;            // total questions
//   ci: number;            // current question index
//   ca: string;            // categoryId
//   st: number;            // startedAt (epoch ms)
//   et?: number;           // endedAt (epoch ms)
//   la?: string;           // lastAskedAt
// }


export interface GameStrategy {
  /* ── required API ── */
  getGameMode(): GameModeType;
  startGame(options: IStartGame): void;
  submitAnswer(answerId: string): void;

  /* ── optional callback hooks ── */
  events: Observer<ListenEventsMap>
}


