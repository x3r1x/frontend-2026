import type {Slide} from "../../types/slide.ts";
import {moveObjects} from "../../actions/objects.ts";
import {dispatch} from "../../editor.ts";
import {slideActionContainer} from "../../actions/slide.ts";

function onObjectDragAndDrop(slide: Slide, objectIds: string[], scale: number, offsetX: number, offsetY: number) {
    const newSlide = moveObjects(slide, {
        objectIds: objectIds, shift: {
            dx: offsetX / scale,
            dy: offsetY / scale
        }
    })

    dispatch(slideActionContainer, {slideId: slide.id, newSlide: newSlide})
}

export {
    onObjectDragAndDrop
}