import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {Presentation} from "../../types/presentation.ts";
import {updatePresentationName as updateNameFn} from "../../actions/presentation.ts"
import {
    addSlide as addSlideFn,
    removeSlides as removeSlidesFn,
    moveSlide as moveSlideFn,
} from "../../actions/slide.ts"

export interface PresentationState {
    presentation: Presentation | null,
}

const initialState: PresentationState = {
    presentation: null,
}

const presentationSlice = createSlice({
    name: "presentation",
    initialState: initialState,
    reducers: {
        setPresentation: (state, action: PayloadAction<Presentation>) => {
            state.presentation = action.payload;
        },
        updatePresentationName: (state, action: PayloadAction<{ name: string }>) => {
            if (state.presentation) {
                return {
                    ...state,
                    presentation: updateNameFn(state.presentation, action.payload)
                }
            }
        },
        addSlide: (state, action: PayloadAction<{ slideId: string, slideName?: string }>) => {
            if (state.presentation) {
                return {
                    ...state,
                    presentation: addSlideFn(state.presentation, action.payload)
                }
            }
        },
        removeSlides: (state, action: PayloadAction<{ slideIds: string[] }>) => {
            if (state.presentation) {
                return {
                    ...state,
                    presentation: removeSlidesFn(state.presentation, action.payload)
                }
            }
        },
        moveSlide: (state, action: PayloadAction<{ slideId: string, newIndex: number }>) => {
            if (state.presentation) {
                return {
                    ...state,
                    presentation: moveSlideFn(state.presentation, action.payload.slideId, action.payload.newIndex)
                }
            }
        }
    }
})

export const {
    setPresentation,
    updatePresentationName,
    addSlide,
    removeSlides,
    moveSlide
} = presentationSlice.actions

export default presentationSlice.reducer