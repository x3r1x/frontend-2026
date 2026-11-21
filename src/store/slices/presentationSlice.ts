import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {Presentation} from "../../types/presentation.ts";
import type {Slide} from "../../types/slide.ts";
import {updatePresentationName as updateNameFn} from "../../actions/presentation.ts"
import {
    addSlide as addSlideFn,
    removeSlides as removeSlidesFn,
    moveSlide as moveSlideFn,
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
    updateImageObjectUrl as updateImageUrlFn,
    type TextObjectProps, type ImageObjectProps,
} from "../../actions/objects.ts"
import type {BaseSlideObject, ObjectSize, Vector} from "../../types/objects.ts";

export interface PresentationState {
    presentation: Presentation | null,
}

const initialState: PresentationState = {
    presentation: null,
}

function slideActionContainer(presentation: Presentation, slideId: string, modifySlide: (slide: Slide) => Slide): Presentation {
    return {
        ...presentation,
        slideCollection: presentation.slideCollection.map(
            slide => slide.id === slideId ? modifySlide(slide) : slide
        )
    }
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
        },
        changeSlideName: (state, action: PayloadAction<{ slideId: string, newName: string }>) => {
            if (state.presentation) {
                return {
                    ...state,
                    presentation: slideActionContainer(
                        state.presentation,
                        action.payload.slideId,
                        slide => changeSlideNameFn(slide, action.payload.newName)
                    )
                }
            }
        },
        setSlideBackgroundColor: (state, action: PayloadAction<{ slideId: string, color: string }>) => {
            if (state.presentation) {
                return {
                    ...state,
                    presentation: slideActionContainer(
                        state.presentation,
                        action.payload.slideId,
                        slide => setColorBgFn(slide, action.payload.color)
                    )
                }
            }
        },
        setSlideBackgroundImage: (state, action: PayloadAction<{ slideId: string, imageUrl: string }>) => {
            if (state.presentation) {
                return {
                    ...state,
                    presentation: slideActionContainer(
                        state.presentation,
                        action.payload.slideId,
                        slide => setImageBgFn(slide, action.payload.imageUrl)
                    )
                }
            }
        },
        setSlideBackgroundGradient: (state, action: PayloadAction<{ slideId: string, colors: string[], angle?: number }>) => {
            if (state.presentation) {
                return {
                    ...state,
                    presentation: slideActionContainer(
                        state.presentation,
                        action.payload.slideId,
                        slide => setGradBgFn(slide, action.payload.colors, action.payload.angle)
                    )
                }
            }
        },
        clearSlideBackground: (state, action: PayloadAction<{ slideId: string }>) => {
            if (state.presentation) {
                return {
                    ...state,
                    presentation: slideActionContainer(
                        state.presentation,
                        action.payload.slideId,
                        slide => clearBgFn(slide)
                    )
                }
            }
        },
        addSlideObject: (state, action: PayloadAction<{ slideId: string, baseObject: BaseSlideObject, props: TextObjectProps | ImageObjectProps }>) => {
            if (state.presentation) {
                return {
                    ...state,
                    presentation: slideActionContainer(
                        state.presentation,
                        action.payload.slideId,
                        slide => addObjectFn(slide, {
                            baseObject: action.payload.baseObject,
                            props: action.payload.props
                        })
                    )
                }
            }
        },
        removeObjects: (state, action: PayloadAction<{ slideId: string, objectIds: string[] }>) => {
            if (state.presentation) {
                return {
                    ...state,
                    presentation: slideActionContainer(
                        state.presentation,
                        action.payload.slideId,
                        slide => removeObjectsFn(slide, action.payload)
                    )
                }
            }
        },
        moveObjects: (state, action: PayloadAction<{ slideId: string, objectIds: string[], shift: Vector }>) => {
            if (state.presentation) {
                return {
                    ...state,
                    presentation: slideActionContainer(
                        state.presentation,
                        action.payload.slideId,
                        slide => moveObjectsFn(slide, action.payload)
                    )
                }
            }
        },
        resizeObject: (state, action: PayloadAction<{ slideId: string, objectId: string, newSize: ObjectSize }>) => {
            if (state.presentation) {
                return {
                    ...state,
                    presentation: slideActionContainer(
                        state.presentation,
                        action.payload.slideId,
                        slide => resizeObjectFn(slide, {
                            objectId: action.payload.objectId,
                            newSize: action.payload.newSize
                        })
                    )
                }
            }
        },
        updateTextObjectContent: (state, action: PayloadAction<{ slideId: string, objectId: string, content: string }>) => {
            if (state.presentation) {
                return {
                    ...state,
                    presentation: slideActionContainer(
                        state.presentation,
                        action.payload.slideId,
                        slide => updateTextContentFn(slide, action.payload.objectId, action.payload.content)
                    )
                }
            }
        },
        updateTextObjectStyle: (state, action: PayloadAction<{ slideId: string, objectId: string, props: TextObjectProps }>) => {
            if (state.presentation) {
                return {
                    ...state,
                    presentation: slideActionContainer(
                        state.presentation,
                        action.payload.slideId,
                        slide => updateTextStyleFn(slide, action.payload.objectId, action.payload.props)
                    )
                }
            }
        },
        updateTextObjectUrl: (state, action: PayloadAction<{ slideId: string, objectId: string, imageUrl: string }>) => {
            if (state.presentation) {
                return {
                    ...state,
                    presentation: slideActionContainer(
                        state.presentation,
                        action.payload.slideId,
                        slide => updateImageUrlFn(slide, action.payload.objectId, action.payload.imageUrl)
                    )
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
    moveSlide,
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
} = presentationSlice.actions

export default presentationSlice.reducer