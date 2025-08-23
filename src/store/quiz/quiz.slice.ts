// src/redux/gameSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameModeType, Question } from '@/graphql/generated';
import { BaseGameState } from '@/types/quiz';

// Define the initial state
interface quizState {
    currentQuestion?: Question;
    currentMode?: GameModeType;
    gameState?: BaseGameState; // e.g., 'loading', 'playing', 'finished'
}

const initialState: quizState = {
    currentMode: undefined,
    gameState: undefined, // Default to loading state
    currentQuestion: undefined,
};

// Create the slice
const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setCurrentMode(state, action: PayloadAction<GameModeType>) {
            state.currentMode = action.payload;
        },
        setCurrentQuestion(state, action: PayloadAction<Question>) {
            state.currentQuestion = action.payload;
        },
        setGameState(state, action: PayloadAction<BaseGameState>) {
            state.gameState = action.payload;
        },
        resetGame(state) {
            state.currentMode = undefined;
            state.currentQuestion = undefined;
            state.gameState = undefined;
        },
    },
});

// Export the actions and the reducer
export const { setCurrentMode, setCurrentQuestion, setGameState, resetGame } = quizSlice.actions;
export default quizSlice.reducer;