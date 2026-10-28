import {dispatch} from "./editor.js";
import {slideActionContainer} from "./actions/slide.js";
import type {Slide} from "./types/slide.js";
import {
    updateTextObjectContent
} from "./actions/objects.js";

const onObjectClick = () => {

}

function onTextObjectChange(slide: Slide, objectId: string, newText: string): void {
    const newSlide = updateTextObjectContent(slide, objectId, newText)

    dispatch(slideActionContainer, {slideId: slide.id, newSlide: newSlide})
}

function onWorkspaceSlideClick(): void {

}


export {
    onObjectClick,
    onTextObjectChange,
    onWorkspaceSlideClick
}