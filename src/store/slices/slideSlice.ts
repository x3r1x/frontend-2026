import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {Slide} from '../../types/slide';
import {
    changeSlideName as changeSlideNameFn,
    setSlideBackgroundColor as setColorBgFn,
    setSlideBackgroundImage as setImageBgFn,
    setSlideBackgroundGradient as setGradBgFn,
    clearSlideBackground as clearBgFn,
} from "../../actions/slide.ts"
import {
    addSlideObject as addObjectFn,
    removeObjects as removeObjectsFn,
    moveObjects as moveObjectsFn,
    resizeObject as resizeObjectFn,
    updateTextObjectStyle as updateTextStyleFn,
    updateTextObjectContent as updateTextContentFn,
    updateImageObjectUrl as updateImageUrlFn, type TextObjectProps, type ImageObjectProps,
} from "../../actions/objects.ts"
import type {BaseSlideObject, ObjectSize, Vector} from "../../types/objects.ts";

interface SlideState {
    currentSlide: Slide | null;
}

const initialState: SlideState = {
    currentSlide: null,
};

const slideSlice = createSlice({
    name: "slide",
    initialState: initialState,
    reducers: {
        changeSlideName: (state, action: PayloadAction<{ newName: string }>) => {
            if (state.currentSlide) {
                return {
                    ...state,
                    currentSlide: changeSlideNameFn(state.currentSlide, action.payload.newName)
                }
            }
        },
        setSlideBackgroundColor: (state, action: PayloadAction<{ color: string }>) => {
            if (state.currentSlide) {
                return {
                    ...state,
                    currentSlide: setColorBgFn(state.currentSlide, action.payload.color)
                }
            }
        },
        setSlideBackgroundImage: (state, action: PayloadAction<{ imageUrl: string }>) => {
            if (state.currentSlide) {
                return {
                    ...state,
                    currentSlide: setImageBgFn(state.currentSlide, action.payload.imageUrl)
                }
            }
        },
        setSlideBackgroundGradient: (state, action: PayloadAction<{ colors: string[], angle?: number }>) => {
            if (state.currentSlide) {
                return {
                    ...state,
                    currentSlide: setGradBgFn(state.currentSlide, action.payload.colors, action.payload.angle)
                }
            }
        },
        clearSlideBackground: (state) => {
            if (state.currentSlide) {
                return {
                    ...state,
                    currentSlide: clearBgFn(state.currentSlide)
                }
            }
        },
        addSlideObject: (state, action: PayloadAction<{ baseObject: BaseSlideObject, props: TextObjectProps | ImageObjectProps }>) => {
            if (state.currentSlide) {
                return {
                    ...state,
                    currentSlide: addObjectFn(state.currentSlide, action.payload)
                }
            }
        },
        removeObjects: (state, action: PayloadAction<{ objectIds: string[] }>) => {
            if (state.currentSlide) {
                return {
                    ...state,
                    currentSlide: removeObjectsFn(state.currentSlide, action.payload)
                }
            }
        },
        moveObjects: (state, action: PayloadAction<{ objectIds: string[], shift: Vector }>) => {
            if (state.currentSlide) {
                return {
                    ...state,
                    currentSlide: moveObjectsFn(state.currentSlide, action.payload)
                }
            }
        },
        resizeObject: (state, action: PayloadAction<{ objectId: string, newSize: ObjectSize }>) => {
            if (state.currentSlide) {
                return {
                    ...state,
                    currentSlide: resizeObjectFn(state.currentSlide, action.payload)
                }
            }
        },
        updateTextObjectContent: (state, action: PayloadAction<{ objectId: string, content: string }>) => {
            if (state.currentSlide) {
                return {
                    ...state,
                    currentSlide: updateTextContentFn(state.currentSlide, action.payload.objectId, action.payload.content)
                }
            }
        },
        updateTextObjectStyle: (state, action: PayloadAction<{ objectId: string, props: TextObjectProps }>) => {
            if (state.currentSlide) {
                return {
                    ...state,
                    currentSlide: updateTextStyleFn(state.currentSlide, action.payload.objectId, action.payload.props)
                }
            }
        },
        updateTextObjectUrl: (state, action: PayloadAction<{ objectId: string, imageUrl: string }>) => {
            if (state.currentSlide) {
                return {
                    ...state,
                    currentSlide: updateImageUrlFn(state.currentSlide, action.payload.objectId, action.payload.imageUrl)
                }
            }
        }
    }
})

export const {
    changeSlideName,
    setSlideBackgroundColor,
    setSlideBackgroundImage,
    setSlideBackgroundGradient,
    clearSlideBackground,
    addSlideObject,
    removeObjects,
    moveObjects,
    resizeObject,
    updateTextObjectContent,
    updateTextObjectStyle,
    updateTextObjectUrl
} = slideSlice.actions

export default slideSlice.reducer