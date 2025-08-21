import { AppDispatch } from "@/store/store";
import { GameModeType, GameStatus } from "./quiz.enum";
import { Question } from "@/graphql/generated";

export type { Question }

export abstract class GameModeStrategy {
  /* ── constructor with injected Redux dispatcher ── */
  constructor(protected readonly dispatch: AppDispatch) { }

  /* ── required API ── */
  abstract getGameMode(): GameModeType;
  abstract startGame(options: startGameProps): void;
  abstract submitAnswer(answerId: string): void;

  /* ── optional callback hooks (no-op by default) ── */
  abstract onNewQuestion<TQuestion extends Question>(callback: (question: TQuestion) => void): void;
  onResult?<TGameHistoryDoc extends GameHistoryDoc>(callback: (result: TGameHistoryDoc) => void): void;
  onState?<TGameState extends BaseGameState>(callback: (state: TGameState) => void): void;
}

export interface startGameProps {
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