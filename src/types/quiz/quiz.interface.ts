import { GameModeType, GameStatus } from "./quiz.enum";
import { SinglePlayerStrategy, ISinglerPlayerStateType, SinglePlayerGameResult } from "@/screens/dashboard/game/strategies/single/logic";
import React, { lazy } from "react";

import { AnswerType as AnswerTypeGql, Question, AnswerStatus, SinglePlayerGame, GameHistory, Answer } from "@/graphql/generated";
export type { Question, AnswerTypeGql, AnswerStatus, SinglePlayerGame, GameHistory, Answer }

export enum AnswerType {
  OPTION_SKIP = '',
  OPTION_0 = '0',
  OPTION_1 = '1',
  OPTION_2 = '2',
  OPTION_3 = '3',
}
// basic events for game
export interface IStartGame {
  categoryId: string;
  mode: GameModeType
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
  [EventsEnum.RESULT]: GameHistory
  [EventsEnum.STATE]: BaseGameState
  [EventsEnum.STARTED_GAME]: BaseGameState
}

export interface EmitEventsMap {
  [EventsEnum.START_GAME]: IStartGame
  [EventsEnum.SUBMIT_ANSWER]: { answer: string }
}

// state related 
export type AnswerState = {
  c: boolean;
  p: number;     // points
  t: number;     // time taken (ms)
  at: number;    // available time
  sk: boolean;   // skipped
  s?: string;    // selected answer (undefined if skipped)
};

export interface PlayerState {
  id: string;
  si: string;
  n: string;             // name
  tc: number;            // total correct
  a: Record<number, Answer>; // index -> Answer
}

export interface BaseGameState {
  m: GameModeType;       // mode
  s: GameStatus;         // status
  ps: PlayerState[];          // players
  qs: string[];          // question MongoIds
  tq: number;            // total questions
  ci: number;            // current question index
  ca: string;            // categoryId
  st: number;            // startedAt (epoch ms)
  et?: number;           // endedAt (epoch ms)
  la?: string;           // lastAskedAt
}

export type ExtractByType<T extends AllGameStrategy, K extends AllGameStrategy['type']> = T extends { type: K } ? T : never

// all game startergy
export type AllGameStrategy =
  | { type: typeof GameModeType.Single; strategy: SinglePlayerStrategy; state: ISinglerPlayerStateType; history: SinglePlayerGameResult }
  | { type: typeof GameModeType.Single; strategy: SinglePlayerStrategy; state: ISinglerPlayerStateType; history: SinglePlayerGameResult }

export const GameRegistry: {
  [K in AllGameStrategy['type']]: {
    screen: React.ComponentType<IStartGame>
    result: React.ComponentType
    sheet: React.ComponentType<{ data: ExtractByType<AllGameStrategy, K>['history'] }>
    strategy: new () => ExtractByType<AllGameStrategy, K>['strategy']
  }
} = {
  [GameModeType.Single]: {
    screen: lazy(() => import('@/screens/dashboard/game/strategies/single/ui/game')),
    result: lazy(() => import('@/screens/dashboard/game/strategies/single/ui/result')),
    sheet: lazy(() => import('@/screens/dashboard/game/strategies/single/ui/sheet')),
    strategy: SinglePlayerStrategy,
  } as const
} 
