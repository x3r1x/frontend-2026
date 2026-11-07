import {dispatch, getState} from "../../editor.js";
import {addSlide, getSlideById, removeSlides, slideActionContainer} from "../../actions/slide.js";
import {generateId} from "../../actions/presentation.js";
import {addSlideObject, type ImageObjectProps, removeObjects} from "../../actions/objects.js";
import {getDefaultBaseObject, getDefaultTextObjectProps} from "../../data.ts";
import type {Slide} from "../../types/slide.ts";
import type {BaseSlideObject} from "../../types/objects.ts";
const onAddSlide = () => dispatch(addSlide, {slideId: generateId()})

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

const onAddImageClick = (slide: Slide, src: string) => {
    const newBaseObject: BaseSlideObject = getDefaultBaseObject();
    const imageObjectProps: ImageObjectProps = {
        type: "image",
        src: src
    }

    const newSlide = addSlideObject(slide, {baseObject: newBaseObject, props: imageObjectProps})
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
    onAddSlide,
    onAddTextClick,
    onAddImageClick,
    onRemoveSlides,
    onRemoveObjects
}