import {dispatch} from "./editor.js";
import {slideActionContainer} from "./actions/slide.js";
import type {Slide} from "./types/slide.js";
import {
    updateTextObjectContent
} from "./actions/objects.js";
import * as React from "react";

const onObjectClick = (
    objectId: string,
    isMultipleSelectionEnabled: boolean,
    selectedObjectIds: string[],
    setSelectedObjectIds: React.Dispatch<React.SetStateAction<string[]>>
) => {
    if (isMultipleSelectionEnabled) {
        setSelectedObjectIds([...selectedObjectIds, objectId])
    }

    if (!isMultipleSelectionEnabled) {
        setSelectedObjectIds([objectId])
    }
}

function onTextObjectChange(slide: Slide, objectId: string, newText: string): void {
    const newSlide = updateTextObjectContent(slide, objectId, newText)

    dispatch(slideActionContainer, {slideId: slide.id, newSlide: newSlide})
}

export {
    onObjectClick,
    onTextObjectChange
}