import {configureStore} from "@reduxjs/toolkit";
import presentationSlice from "./slices/presentationSlice.ts";
import historySlice from "./slices/historySlice.ts";

export const store = configureStore({
    reducer: {
        presentation: presentationSlice,
        history: historySlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;