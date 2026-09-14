import {describe, expect, it} from "vitest";
import {Presentation} from "../../types/presentation.js";
import {
    addSlide, clearSlideBackground,
    duplicateSlide,
    moveSlide,
    removeSlides,
    setSlideBackgroundColor, setSlideBackgroundGradient,
    setSlideBackgroundImage
} from "../../actions/slide.js";
import {Slide} from "../../types/slide.js";
import {
    getEmptyPresentation,
    getOldPresentation,
    getPresentationWithDuplicatedSlide
} from "../presentation/presentationTestStorage.js";
import {
    getEmptyBackground,
    newSlideId,
    newSlideName,
    slideWithGradientBg1, slideWithGradientBg2,
    slideWithImageBg1, slideWithImageBg2,
    slideWithSolidBg1, slideWithSolidBg2
} from "./slideTestStorage.js";

describe("addSlide", () => {
    it("creates first slide", () => {
        const emptyPresentation = getEmptyPresentation()
        const emptyPresentationCopy = structuredClone(emptyPresentation)

        const newSlide: Slide = {
            id: newSlideId,
            name: newSlideName,
            background: getEmptyBackground(),
            objects: []
        }

        const expectedPresentation: Presentation = {
            ...emptyPresentation,
            slideCollection: [newSlide]
        }

        const presentationWithSlide = addSlide(emptyPresentation, newSlideId, newSlideName)

        expect(presentationWithSlide).toEqual(expectedPresentation)
        expect(emptyPresentation).toEqual(emptyPresentationCopy)
    })

    it("creates slide with no given name", () => {
        const oldPresentation = getOldPresentation()
        const oldPresentationCopy = structuredClone(oldPresentation)

        const newSlide: Slide = {
            id: newSlideId,
            name: "",
            background: getEmptyBackground(),
            objects: []
        }

        const expectedPresentation: Presentation = {
            ...oldPresentation,
            slideCollection: [...oldPresentation.slideCollection, newSlide]
        }

        const presentationWithSlide = addSlide(oldPresentation, newSlideId)

        expect(presentationWithSlide).toEqual(expectedPresentation)
        expect(oldPresentation).toEqual(oldPresentationCopy)
    })
})

describe("removeSlides", () => {
    const oldPresentation = getOldPresentation();
    const oldPresentationCopy = structuredClone(oldPresentation)

    it("deletes chosen slides", () => {
        const removingSlideIds = [oldPresentation.slideCollection[0].id, oldPresentation.slideCollection[2].id]
        const expectedPresentation: Presentation = {
            ...oldPresentation,
            slideCollection: [oldPresentation.slideCollection[1]]
        }

        const presentationWithoutSlides = removeSlides(oldPresentation, removingSlideIds)

        expect(presentationWithoutSlides).toEqual(expectedPresentation)
        expect(oldPresentation).toEqual(oldPresentationCopy)
    })

    it("does nothing when void given", () => {
        const actionedPresentation = removeSlides(oldPresentation, [])

        expect(actionedPresentation).toEqual(oldPresentation)
        expect(oldPresentation).toEqual(oldPresentationCopy)
    })
})

describe("moveSlide", () => {
    const slide1 = slideWithSolidBg2
    const slide2 = slideWithGradientBg1
    const slide3 = slideWithImageBg2
    const slide4 = slideWithImageBg1
    const slide5 = slideWithSolidBg1

    const oldPresentation: Presentation = {
        ...getEmptyPresentation(),
        slideCollection: [slide1, slide2, slide3, slide4, slide5]
    }
    const oldPresentationCopy = structuredClone(oldPresentation)

    it("changes slides order when moving back", () => {
        const expectedPresentation: Presentation = {
            ...getEmptyPresentation(),
            slideCollection: [slide1, slide4, slide2, slide3, slide5]
        }

        const presentationWithChangedSlideOrder = moveSlide(oldPresentation, slide4.id, 1)

        expect(presentationWithChangedSlideOrder).toEqual(expectedPresentation)
        expect(oldPresentation).toEqual(oldPresentationCopy)
    })

    it("changes slides order when moving forward", () => {
        const expectedPresentation: Presentation = {
            ...getEmptyPresentation(),
            slideCollection: [slide1, slide3, slide2, slide4, slide5]
        }

        const presentationWithChangedSlideOrder = moveSlide(oldPresentation, slide2.id, 2)

        expect(presentationWithChangedSlideOrder).toEqual(expectedPresentation)
        expect(oldPresentation).toEqual(oldPresentationCopy)
    })

    it("places the slide to the beginning correctly", () => {
        const expectedPresentation: Presentation = {
            ...getEmptyPresentation(),
            slideCollection: [slide5, slide1, slide2, slide3, slide4]
        }

        const presentationWithChangedSlideOrder = moveSlide(oldPresentation, slide5.id, 0)

        expect(presentationWithChangedSlideOrder).toEqual(expectedPresentation)
        expect(oldPresentation).toEqual(oldPresentationCopy)
    })

    it("places the slide to the end correctly", () => {
        const expectedPresentation: Presentation = {
            ...getEmptyPresentation(),
            slideCollection: [slide1, slide3, slide4, slide5, slide2]
        }

        const presentationWithChangedSlideOrder = moveSlide(oldPresentation, slide2.id, oldPresentation.slideCollection.length - 1)

        expect(presentationWithChangedSlideOrder).toEqual(expectedPresentation)
        expect(oldPresentation).toEqual(oldPresentationCopy)
    })
})

describe("duplicateSlide", () => {
    it("clones a slide", () => {
        const oldPresentation = getOldPresentation()
        const oldPresentationCopy = structuredClone(oldPresentation)

        const expectedPresentation: Presentation = getPresentationWithDuplicatedSlide()
        const presentationWithClonedSlide = duplicateSlide(oldPresentation, oldPresentation.slideCollection[1].id)

        expect(presentationWithClonedSlide).toEqual(expectedPresentation)
        expect(oldPresentation).toEqual(oldPresentationCopy)
    })
})

describe("setSlideBackgroundColor", () => {
    it("changes slide background to solid", () => {
        const oldSlide = slideWithImageBg2
        const oldSlideCopy = structuredClone(oldSlide)

        const backgroundColor = "#41ABC1"
        const expectedSlide: Slide = {
            ...oldSlide,
            background: {
                color: backgroundColor,
                type: "solid"
            }
        }

        const slideWithSolidBg = setSlideBackgroundColor(oldSlide, backgroundColor)

        expect(slideWithSolidBg).toEqual(expectedSlide)
        expect(oldSlide).toEqual(oldSlideCopy)
    })
})

describe("setSlideBackgroundImage", () => {
    it("changes slide background to image", () => {
        const oldSlide = slideWithGradientBg2
        const oldSlideCopy = structuredClone(oldSlide)

        const backgroundSrc = "https://www.google.com/url?sa=t&source=web&rct=j&url=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Frandom&ved=0CBYQjRxqFwoTCLj-8fSl4ZYDFQAAAAAdAAAAABAI&opi=89978449"
        const expectedSlide: Slide = {
            ...oldSlide,
            background: {
                src: backgroundSrc,
                type: "image"
            }
        }

        const slideWithImageBg = setSlideBackgroundImage(oldSlide, backgroundSrc)

        expect(slideWithImageBg).toEqual(expectedSlide)
        expect(oldSlide).toEqual(oldSlideCopy)
    })
})

describe("setSlideBackgroundGradient", () => {
    const oldSlide = slideWithSolidBg1
    const oldSlideCopy = structuredClone(oldSlide)
    const gradientColors = ["#241ABE", "#1243FF", "#578255"]

    it("changes slide background to gradient", () => {
        const gradientAngle = -2.5
        const expectedSlide: Slide = {
            ...oldSlide,
            background: {
                colors: gradientColors,
                angle: gradientAngle,
                type: "gradient"
            }
        }

        const slideWithGradientBg = setSlideBackgroundGradient(oldSlide, gradientColors, gradientAngle)

        expect(slideWithGradientBg).toEqual(expectedSlide)
        expect(oldSlide).toEqual(oldSlideCopy)
    })

    it("changes slide background to gradient without given angle", () => {
        const expectedSlide: Slide = {
            ...oldSlide,
            background: {
                colors: gradientColors,
                angle: 0,
                type: "gradient"
            }
        }

        const slideWithGradientBg = setSlideBackgroundGradient(oldSlide, gradientColors)

        expect(slideWithGradientBg).toEqual(expectedSlide)
        expect(oldSlide).toEqual(oldSlideCopy)
    })
})

describe("clearSlideBackground", () => {
    it("resets slide background to default", () => {
        const oldSlide = slideWithGradientBg2
        const oldSlideCopy = structuredClone(oldSlide)

        const expectedSlide: Slide = {
            ...oldSlide,
            background: getEmptyBackground()
        }
        const slideWithDefaultBackground = clearSlideBackground(oldSlide)

        expect(slideWithDefaultBackground).toEqual(expectedSlide)
        expect(oldSlide).toEqual(oldSlideCopy)
    })
})