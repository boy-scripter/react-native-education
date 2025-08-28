// src/redux/gameSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameModeType, Question } from '@/graphql/generated';
import { BaseGameState, IStartGame } from '@/types/quiz';



// Define the initial state
interface quizState {
    currentQuestion?: Question;
    currentMode?: GameModeType;
    currentCategory?: string;
    gameState?: BaseGameState;
    result?: any
}

const initialState: quizState = {
    currentMode: undefined,
    gameState: undefined, // Default to loading state
    currentQuestion: undefined,
    currentCategory: undefined,
    result: undefined
};

// Create the slice
const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        setGameDetail(state, action: PayloadAction<IStartGame>) {
            state.currentCategory = action.payload.categoryId;
            state.currentMode = action.payload.mode;
        },
        setCurrentQuestion(state, action: PayloadAction<Question>) {
            state.currentQuestion = action.payload;
        },
        setGameState(state, action: PayloadAction<BaseGameState>) {
            state.gameState = action.payload;
        },
        setResult(state, action: PayloadAction<any>) {
            state.result = action.payload;
        },
        resetGame(state) {
            state.currentMode = undefined;
            state.currentQuestion = undefined;
            state.gameState = undefined;
            state.currentCategory = undefined;
        },
    },
});

// Export the actions and the reducer
export const { setGameDetail, setCurrentQuestion, setGameState, resetGame ,setResult} = quizSlice.actions;
export default quizSlice.reducer;