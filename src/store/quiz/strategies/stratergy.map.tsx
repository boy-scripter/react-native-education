import {GameModeType} from '@/types/quiz';
import {SinglePlayerStrategy} from './singleplayer.stratergy';
import type {FC} from 'react';

// Generic component type
type ComponentDef<P = {}> = FC<P>;

// Mode-specific props
interface SinglePlayerComponents {
  Question: ComponentDef<{questionText: string}>;
  ScoreBoard?: ComponentDef<{score: number}>;
}

// Type-safe registry
export type GameStrategyMapType = {
  [GameModeType.Single]: {
    strategyFactory: () => ReturnType<typeof SinglePlayerStrategy>;
    components: SinglePlayerComponents;
    customText: {
      startButton: string;
      hint: string;
    };
  };
};

// Registry
export const GameStrategyRegistry: GameStrategyMapType = {
  [GameModeType.Single]: {
    strategyFactory: () => SinglePlayerStrategy(),
    components: {
      Question: ({questionText}) => <div>{questionText} </div>,
    },
    customText: {
      startButton: 'Start Solo Game',
      hint: 'Answer carefully!',
    },
  },
};
