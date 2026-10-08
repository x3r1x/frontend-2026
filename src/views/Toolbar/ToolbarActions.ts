import {dispatch} from "../../editor.js";
import {addSlide, removeSlides, slideActionContainer} from "../../actions/slide.js";
import {generateId} from "../../actions/presentation.js";
import {removeObjects} from "../../actions/objects.js";
import type {Slide} from "../../types/slide.js";
import type {AppState} from "../../data.js";

const onAddSlide = () => dispatch(addSlide, {id: generateId()})

const onRemoveSlides = (appState: AppState) => {
    dispatch(removeSlides, {slideIds: appState.selectedSlideIds})
    appState.selectedSlideIds = []
    appState.selectedObjectIds = [];
}

const onRemoveObjects = (slide: Slide, appState: AppState) => {
    const newSlide = removeObjects(slide, {objectIds: appState.selectedObjectIds})
    appState.selectedObjectIds = []

    dispatch(slideActionContainer, {slideId: slide.id, newSlide: newSlide})
}

export {
    onAddSlide,
    onRemoveSlides,
    onRemoveObjects
}