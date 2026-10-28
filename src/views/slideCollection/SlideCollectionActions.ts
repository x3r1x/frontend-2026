import {changeSlideName, slideActionContainer} from "../../actions/slide.js";
import type {Slide} from "../../types/slide.js";
import {dispatch} from "../../editor.js";

const onSlideNameChange = (slide: Slide, newName: string) => {
    const newSlide = changeSlideName(slide, newName)

    dispatch(slideActionContainer, {slideId: slide.id, newSlide: newSlide})
}

export {
    onSlideNameChange
}