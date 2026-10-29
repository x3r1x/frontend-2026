import {changeSlideName, slideActionContainer} from "../../actions/slide.js";
import type {Slide} from "../../types/slide.js";
import {dispatch} from "../../editor.js";
import * as React from "react";

const onSlideNameChange = (slide: Slide, newName: string) => {
    const newSlide = changeSlideName(slide, newName)

    dispatch(slideActionContainer, {slideId: slide.id, newSlide: newSlide})
}

const onSlideViewClick = (
    slideId: string,
    isMultipleSelectionEnabled: boolean,
    selectedSlideIds: string[],
    setSelectedSlideIds: React.Dispatch<React.SetStateAction<string[]>>,
    setSelectedObjectIds: React.Dispatch<React.SetStateAction<string[]>>
) => {
    if (isMultipleSelectionEnabled) {
        setSelectedSlideIds([...selectedSlideIds, slideId])
    }

    if (!isMultipleSelectionEnabled) {
        setSelectedSlideIds([slideId])
        setSelectedObjectIds([])
    }
}

export {
    onSlideNameChange,
    onSlideViewClick
}