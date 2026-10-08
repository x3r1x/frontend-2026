import type {Presentation} from "../types/presentation.js";
import type {Background, GradientBackground, ImageBackground, Slide, SolidBackground} from "../types/slide.js";

function getSlideById(slides: Slide[], id: string): Slide {
    return slides.find(slide => slide.id === id)!;
}

type SlideActionContainerParams = {
    slideId: string,
    newSlide: Slide
}

function slideActionContainer(presentation: Presentation, {slideId, newSlide}: SlideActionContainerParams): Presentation {
    const newSlideCollection = presentation.slideCollection.map(slide => slide.id === slideId ? newSlide : slide)

    return {
        ...presentation,
        slideCollection: newSlideCollection
    }
}

type AddSlideParams = {
    slideId: string,
    slideName?: string
}

function addSlide(presentation: Presentation, {slideId, slideName = ""}: AddSlideParams): Presentation {
    const newSlideBackground: SolidBackground = {
        color: "#FFFFFF",
        type: "solid"
    }

    const newSlide: Slide = {
        id: slideId,
        name: slideName ? slideName : "",
        background: newSlideBackground,
        objects: []
    }

    return {
        ...presentation,
        slideCollection: [...presentation.slideCollection, newSlide]
    }
}

type RemoveSlidesParams = {
    slideIds: string[]
}

function removeSlides(presentation: Presentation, {slideIds}: RemoveSlidesParams): Presentation {
    const newSlideCollection: Slide[] = presentation.slideCollection.filter(
        (slide: Slide) => !slideIds.includes(slide.id)
    )

    return {
        ...presentation,
        slideCollection: newSlideCollection
    }
}

function moveSlide(presentation: Presentation, slideId: string, newIndex: number): Presentation {
    const movingSlideIndex = presentation.slideCollection.findIndex(slide => slide.id === slideId)
    if (movingSlideIndex === -1) return presentation

    const newSlideCollection = presentation.slideCollection.filter(slide => slide.id !== slideId)
    newSlideCollection.splice(newIndex, 0, presentation.slideCollection[movingSlideIndex])

    return {
        ...presentation,
        slideCollection: newSlideCollection
    }
}

function duplicateSlide(presentation: Presentation, slideId: string): Presentation {
    const currentSlide = presentation.slideCollection.find(slide => slide.id === slideId)
    if (!currentSlide) {
        return presentation
    }

    return {
        ...presentation,
        slideCollection: [...presentation.slideCollection, structuredClone(currentSlide)]
    }
}

//abstraction
function setSlideBackgroundColor(slide: Slide, color: string): Slide {
    const newBackground: SolidBackground = {
        color: color,
        type: "solid"
    }

    return modifySlideBackground(slide, newBackground)
}

function setSlideBackgroundImage(slide: Slide, imageUrl: string): Slide {
    const newBackground: ImageBackground = {
        src: imageUrl,
        type: "image"
    }

    return modifySlideBackground(slide, newBackground)
}

function setSlideBackgroundGradient(slide: Slide, colors: string[], angle?: number): Slide {
    const newBackground: GradientBackground = {
        colors: colors,
        angle: angle ? angle : 0,
        type: "gradient"
    }

    return modifySlideBackground(slide, newBackground)
}

function clearSlideBackground(slide: Slide): Slide {
    const newBackground: SolidBackground = {
        color: "#FFFFFF",
        type: "solid"
    }

    return modifySlideBackground(slide, newBackground)
}

function modifySlideBackground(slide: Slide, newBackground: Background): Slide {
    return {
        ...slide,
        background: newBackground
    }
}

export {
    getSlideById,
    slideActionContainer,
    addSlide,
    removeSlides,
    moveSlide,
    duplicateSlide,
    setSlideBackgroundColor,
    setSlideBackgroundImage,
    setSlideBackgroundGradient,
    clearSlideBackground
}