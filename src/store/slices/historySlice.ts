import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {Presentation} from "../../types/presentation.ts";

interface HistoryState {
    past: Presentation[];
    future: Presentation[];
    canUndo: boolean;
    canRedo: boolean;
}

const initialState: HistoryState = {
    past: [],
    future: [],
    canUndo: false,
    canRedo: false,
};

const historySlice = createSlice({
    name: "history",
    initialState: initialState,
    reducers: {
        pushHistory: (state, action: PayloadAction<Presentation>) => {
            state.past = [...state.past, action.payload];
            state.future = [];
            state.canUndo = true;
            state.canRedo = false;
        },
        undo: (state) => {
            if (state.past.length === 0) return;
            const previous = state.past[state.past.length - 1];
            state.past = state.past.slice(0, -1);
            state.future = [previous, ...state.future];
            state.canUndo = state.past.length > 0;
            state.canRedo = true;
        },
        redo: (state) => {
            if (state.future.length === 0) return;
            const next = state.future[0];
            state.future = state.future.slice(1);
            state.past = [...state.past, next];
            state.canUndo = true;
            state.canRedo = state.future.length > 0;
        },
        clearHistory: (state) => {
            state.past = [];
            state.future = [];
            state.canUndo = false;
            state.canRedo = false;
        }
    }
})

export const { pushHistory, undo, redo, clearHistory } = historySlice.actions;
export default historySlice.reducer;