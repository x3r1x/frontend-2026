import {dispatch, getAppState, setAppState} from "../../editor.js";
import {addSlide, removeSlides, slideActionContainer} from "../../actions/slide.js";
import {generateId} from "../../actions/presentation.js";
import {removeObjects} from "../../actions/objects.js";
import type {Slide} from "../../types/slide.js";
import type {AppState, ToolbarOptions} from "../../data.js";

const onAddSlide = () => dispatch(addSlide, {slideId: generateId()})

const onRemoveSlides = (appState: AppState) => {
    dispatch(removeSlides, {slideIds: appState.selectedSlideIds})

    const currentAppState = getAppState()!;
    const newAppState: AppState = {
        ...currentAppState,
        selectedObjectIds: [],
        selectedSlideIds: []
    }

    setAppState(newAppState)
}

const onSlideActionButtonClick = (type: ToolbarOptions) => {
    const currentAppState = getAppState()!;

    const newAppState: AppState = {
        ...currentAppState,
        toolbarOption: type
    }

    setAppState(newAppState)
}

const onRemoveObjects = (slide: Slide, appState: AppState) => {
    const newSlide = removeObjects(slide, {objectIds: appState.selectedObjectIds})
    dispatch(slideActionContainer, {slideId: slide.id, newSlide: newSlide})

    const currentAppState = getAppState()!
    const newAppState: AppState = {
        ...currentAppState,
        selectedObjectIds: []
    }

    setAppState(newAppState)
}

export {
    onAddSlide,
    onRemoveSlides,
    onSlideActionButtonClick,
    onRemoveObjects
}