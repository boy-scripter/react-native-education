// src/redux/selectors/gameSelectors.ts
import { RootState } from '../store'; // <-- adjust path if needed
import { BaseGameState, GameModeType, Question } from '@myTypes/quiz';

// Select whole slice
export const selectGame = (state: RootState) => state.quiz;
export const selectCurrentMode = (state: RootState): GameModeType | undefined => state.quiz.currentMode;
export const selectCurrentQuestion = (state: RootState): Question | undefined => state.quiz.currentQuestion;
export const selectGameState = (state: RootState): BaseGameState | undefined => state.quiz.gameState;
