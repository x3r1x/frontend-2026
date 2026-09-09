import type {Presentation} from "../types/presentation.js";
import type {GradientBackground, ImageBackground, Slide, SolidBackground} from "../types/slide.js";

function addSlide(presentation: Presentation, slideId: string, slideName?: string): Presentation {
    const newSlideBackground: SolidBackground = {
        color: "#FFFFFF",
        type: "Solid"
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

function removeSlides(presentation: Presentation, slideIds: string[]): Presentation {
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
    if (!currentSlide) return presentation

    return {
        ...presentation,
        slideCollection: [...presentation.slideCollection, currentSlide]
    }
}

function setSlideBackgroundColor(slide: Slide, color: string): Slide {
    const newBackground: SolidBackground = {
        color: color,
        type: "Solid"
    }

    return {
        ...slide,
        background: newBackground
    }
}

function setSlideBackgroundImage(slide: Slide, imageUrl: string): Slide {
    const newBackground: ImageBackground = {
        src: imageUrl,
        type: "Image"
    }

    return {
        ...slide,
        background: newBackground
    }
}

function setSlideBackgroundGradient(slide: Slide, colors: string[], angle?: number): Slide {
    const newBackground: GradientBackground = {
        colors: colors,
        angle: angle ? angle : 0,
        type: "Gradient"
    }

    return {
        ...slide,
        background: newBackground
    }
}

function clearSlideBackground(slide: Slide): Slide {
    const newBackground: SolidBackground = {
        color: "#FFFFFF",
        type: "Solid"
    }

    return {
        ...slide,
        background: newBackground
    }
}

export {
    addSlide,
    removeSlides,
    moveSlide,
    duplicateSlide,
    setSlideBackgroundColor,
    setSlideBackgroundImage,
    setSlideBackgroundGradient,
    clearSlideBackground
}