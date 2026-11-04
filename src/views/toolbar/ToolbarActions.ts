import {dispatch, getState} from "../../editor.js";
import {addSlide, getSlideById, removeSlides, slideActionContainer} from "../../actions/slide.js";
import {generateId} from "../../actions/presentation.js";
import {addSlideObject, getObjectById, removeObjects} from "../../actions/objects.js";
import {getDefaultBaseObject, getDefaultTextObjectProps} from "../../data.ts";
import type {Slide} from "../../types/slide.ts";
const onAddSlide = () => dispatch(addSlide, {slideId: generateId()})

function getToolbarOption(slideCollection: Slide[], selectedSlideIds: string[], selectedObjectIds: string[]) {
    if (selectedSlideIds.length !== 0 && selectedObjectIds.length !== 0) {
        const slide = getSlideById(slideCollection,selectedSlideIds[0])
        const object = getObjectById(slide.objects, selectedObjectIds[0])

        if (object.type === "text") {
            return "text style"
        }
    }

    return "mouse"
}

const onRemoveSlides = (slideIds: string[], clearFullSelection: () => void) => {
    dispatch(removeSlides, {
        slideIds: slideIds
    })
    clearFullSelection()
}

const onAddTextClick = (slide: Slide) => {
    const baseObject = getDefaultBaseObject()
    const textObjectProps = getDefaultTextObjectProps()

    const newSlide = addSlideObject(slide, {baseObject: baseObject, props: textObjectProps})
    dispatch(slideActionContainer, {slideId: slide.id, newSlide: newSlide})
}

const onRemoveObjects = (selectedSlideId: string, objectIds: string[], clearObjectSelection: () => void) => {
    const state = getState()!;
    const currentSlide = getSlideById(state.slideCollection, selectedSlideId);

    const newSlide = removeObjects(currentSlide, {objectIds: objectIds})
    dispatch(slideActionContainer, {slideId: currentSlide.id, newSlide: newSlide})
    clearObjectSelection()
}

export {
    getToolbarOption,
    onAddSlide,
    onAddTextClick,
    onRemoveSlides,
    onRemoveObjects
}