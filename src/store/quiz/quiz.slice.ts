// store/quizSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameModeType } from '@/types/quiz';
import { GameStrategyRegistry, GameStrategyMapType } from './strategies/stratergy.map';

interface QuizState {
    strategy?: ReturnType<GameStrategyMapType[GameModeType]['strategyFactory']>;
    mode?: GameModeType;
}

const initialState: QuizState = {
    strategy: undefined,
    mode: undefined,
};

export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        // Set strategy by passing a GameModeType key
        initiateStrategy: (state, action: PayloadAction<GameModeType>) => {
            const entry = GameStrategyRegistry[action.payload];

            if (!entry) throw new Error(`No strategy found for mode ${action.payload}`);

            state.strategy = entry.strategyFactory(); // ✅ typed
            state.mode = action.payload; // ✅ typed
        },

        // Reset strategy
        resetStrategy: (state) => {
            state.strategy = undefined;
            state.mode = undefined;
        },

        // Reset and immediately set new strategy
        resetToNewStrategy: (state, action: PayloadAction<GameModeType>) => {
            state.strategy = undefined;
            state.mode = undefined;

            const entry = GameStrategyRegistry[action.payload];
            if (!entry) throw new Error(`No strategy found for mode ${action.payload}`);

            state.strategy = entry.strategyFactory();
            state.mode = action.payload;
        },
    },
});

// Export actions
export const { initiateStrategy, resetStrategy, resetToNewStrategy } = quizSlice.actions;

export default quizSlice.reducer;
