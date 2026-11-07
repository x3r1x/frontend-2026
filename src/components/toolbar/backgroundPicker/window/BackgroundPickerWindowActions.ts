import {
    clearSlideBackground,
    getSlideById,
    setSlideBackgroundColor, setSlideBackgroundGradient,
    setSlideBackgroundImage,
    slideActionContainer
} from "../../../../actions/slide.ts";
import {dispatch, getState} from "../../../../editor.ts";

const onSolidInput = (value: string, slideId: string) => {
    const slide = getSlideById(getState()!.slideCollection, slideId)

    const newSlide = setSlideBackgroundColor(slide, value);
    dispatch(slideActionContainer, {slideId: slide.id, newSlide: newSlide})
}

const onImageInput = (newSrc: string, slideId: string | undefined) => {
    if (!slideId) {
        return
    }

    const slide = getSlideById(getState()!.slideCollection, slideId)

    const newSlide = setSlideBackgroundImage(slide, newSrc)
    dispatch(slideActionContainer, {slideId: slide.id, newSlide: newSlide})
}

const onGradientAdd = (value: string, slideId: string | undefined) => {
    if (!slideId) {
        return
    }

    const slide = getSlideById(getState()!.slideCollection, slideId)

    const newColors = slide.background.type === "gradient"
        ? [...slide.background.colors, value]
        : [value]

    const newAngle = slide.background.type === "gradient"
        ? slide.background.angle
        : 0

    const newSlide = setSlideBackgroundGradient(slide, newColors, newAngle);
    dispatch(slideActionContainer, {slideId: slide.id, newSlide: newSlide})
}

const onGradientAngleChange = (value: number, slideId: string | undefined) => {
    if (!slideId) {
        return
    }

    const slide = getSlideById(getState()!.slideCollection, slideId)

    const newColors = slide.background.type === "gradient"
        ? slide.background.colors
        : []

    const newAngle = slide.background.type === "gradient"
        ? value
        : 0

    const newSlide = setSlideBackgroundGradient(slide, newColors, newAngle);
    dispatch(slideActionContainer, {slideId: slide.id, newSlide: newSlide})
}

const onBackgroundClear = (slideId: string | undefined) => {
    if (!slideId) {
        return
    }

    const slide = getSlideById(getState()!.slideCollection, slideId)
    const newSlide = clearSlideBackground(slide)
    dispatch(slideActionContainer, {slideId: slide.id, newSlide: newSlide})
}

export {
    onSolidInput,
    onImageInput,
    onGradientAdd,
    onGradientAngleChange,
    onBackgroundClear
}