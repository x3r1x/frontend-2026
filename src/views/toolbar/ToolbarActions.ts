import {dispatch, getState} from "../../editor.js";
import {addSlide, getSlideById, removeSlides, slideActionContainer} from "../../actions/slide.js";
import {generateId} from "../../actions/presentation.js";
import {removeObjects} from "../../actions/objects.js";
const onAddSlide = () => dispatch(addSlide, {slideId: generateId()})

const onRemoveSlides = (slideIds: string[], clearFullSelection: () => void) => {
    dispatch(removeSlides, {
        slideIds: slideIds
    })
    clearFullSelection()
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
    onRemoveSlides,
    onRemoveObjects
}