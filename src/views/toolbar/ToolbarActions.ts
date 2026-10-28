import {dispatch} from "../../editor.js";
import {addSlide, removeSlides, slideActionContainer} from "../../actions/slide.js";
import {generateId} from "../../actions/presentation.js";
import {removeObjects} from "../../actions/objects.js";
import type {Slide} from "../../types/slide.js";
import * as React from "react";

const onAddSlide = () => dispatch(addSlide, {slideId: generateId()})

const onRemoveSlides = (selectedIds: string[], setSelectedSlideIds: React.Dispatch<React.SetStateAction<string[]>>, setSelectedObjectIds: React.Dispatch<React.SetStateAction<string[]>>) => {
    dispatch(removeSlides, {slideIds: selectedIds})

    setSelectedSlideIds([]);
    setSelectedObjectIds([]);
}

const onRemoveObjects = (slide: Slide, selectedIds: string[], setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>) => {
    const newSlide = removeObjects(slide, {objectIds: selectedIds})
    dispatch(slideActionContainer, {slideId: slide.id, newSlide: newSlide})
    setSelectedIds([])
}

export {
    onAddSlide,
    onRemoveSlides,
    onRemoveObjects
}