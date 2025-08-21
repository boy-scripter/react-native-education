import { GameModeType, GameStatus } from "./quiz.enum";
import { Question } from "@/graphql/generated";



export type { Question }

export interface GameModeStrategy {
  startGame(options: startGameProps): void;
  submitAnswer(answerId: string): void;

  // Callback-based events
  onResult(callback: (result: any) => void): void; // result can be typed more specifically
  onNewQuestion(callback: (question: Question) => void): void;
  onState<T extends BaseGameState>(callback: (state: T) => void): void; // current game state
}


export interface startGameProps {
  category: string;
  mode: GameModeType
}

export type Answer = {
  c: boolean;    // correct
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