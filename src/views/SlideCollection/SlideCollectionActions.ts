import {changeSlideName, slideActionContainer} from "../../actions/slide.js";
import type {Slide} from "../../types/slide.js";
import {dispatch, getAppState, setAppState} from "../../editor.js";
import {type AppState} from "../../data.js";

const onSlideNameChange = (slide: Slide, newName: string) => {
    const newSlide = changeSlideName(slide, newName)

    dispatch(slideActionContainer, {slideId: slide.id, newSlide: newSlide})
}

const onSlideViewClick = (slideId: string) => {
    const currentAppState = getAppState()!
    const newAppState: AppState = {
        ...currentAppState,
        selectedSlideIds: [...currentAppState.selectedSlideIds, slideId]
    }

    setAppState(newAppState)
}

export {
    onSlideNameChange,
    onSlideViewClick
}