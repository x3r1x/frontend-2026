import {describe, expect, it} from "vitest";
import {Slide} from "../../types/slide.js";
import {
    addSlideObject,
    moveObjects,
    removeObjects, resizeObject, updateImageObjectUrl, updateTextObjectContent,
    updateTextObjectStyle
} from "../../actions/objects.js";
import {
    slideWithGradientBg1,
    slideWithImageBg2,
    slideWithSolidBg1,
    slideWithSolidBg2
} from "../slide/slideTestStorage.js";
import {
    getNewTextObject,
    newTextContent, newTextFontColor, newTextFontFamily, newTextFontSize,
    newObjectId,
    getNewImageObject, newImageSrc, newObjectSize, newObjectCoordinates, imageObject2, imageObject1,
    textObject1
} from "./objectsTestStorage.js";
import {
    BaseSlideObject,
    ImageObject,
    ImageObjectProps,
    SlideObject,
    TextObject,
    TextObjectProps,
    Vector
} from "../../types/objects.js";

describe("addSlideObject", () => {
    it("adds text object to slide", () => {
        const oldSlide = slideWithSolidBg1
        const oldSlideCopy = structuredClone(oldSlide)

        const expectedSlide: Slide = {
            ...oldSlide,
            objects: [...oldSlide.objects, getNewTextObject()]
        }

        const baseObject: BaseSlideObject = {
            id: newObjectId,
            position: newObjectCoordinates,
            size: newObjectSize,
        }

        const textObjectProps: TextObjectProps = {
            text: newTextContent,
            fontFamily: newTextFontFamily,
            fontSize: newTextFontSize,
            fontColor: newTextFontColor,
            type: "text"
        }

        const slideWithTextObject = addSlideObject(oldSlide, baseObject, textObjectProps)

        expect(slideWithTextObject).toEqual(expectedSlide)
        expect(oldSlide).toEqual(oldSlideCopy)
    })

    it("adds image object to slide", () => {
        const oldSlide = slideWithImageBg2
        const oldSlideCopy = structuredClone(slideWithImageBg2)

        const expectedSlide: Slide = {
            ...oldSlide,
            objects: [...oldSlide.objects, getNewImageObject()]
        }

        const baseObject: BaseSlideObject = {
            id: newObjectId,
            position: newObjectCoordinates,
            size: newObjectSize
        }

        const imageObjectProps: ImageObjectProps = {
            src: newImageSrc,
            type: "image"
        }

        const slideWithImageObject = addSlideObject(oldSlide, baseObject, imageObjectProps)

        expect(slideWithImageObject).toEqual(expectedSlide)
        expect(oldSlide).toEqual(oldSlideCopy)
    })
})

describe("removeObjects", () => {
    const oldSlide = slideWithGradientBg1
    const oldSlideCopy = structuredClone(oldSlide)

    it("deletes chosen objects", () => {
        const removingObjectIds = [oldSlide.objects[0].id, oldSlide.objects[2].id, oldSlide.objects[3].id]

        const expectedSlide: Slide = {
            ...oldSlide,
            objects: [oldSlide.objects[1], oldSlide.objects[4]]
        }
        const slideWithoutObjects = removeObjects(oldSlide, removingObjectIds)

        expect(slideWithoutObjects).toEqual(expectedSlide)
        expect(oldSlide).toEqual(oldSlideCopy)
    })

    it("does nothing when void given", () => {
        const actionedSlide = removeObjects(oldSlide, [])

        expect(actionedSlide).toEqual(oldSlide)
        expect(oldSlide).toEqual(oldSlideCopy)
    })
})

describe("moveObjects", () => {
    it("changes chosen objects coordinates", () => {
        const oldSlide = slideWithSolidBg1
        const oldSlideCopy = structuredClone(slideWithSolidBg1)

        const delta: Vector = {
            dx: 212.241,
            dy: -12.215
        }

        const movedObject1: SlideObject = {
            ...oldSlide.objects[1],
            position: {
                x: oldSlide.objects[1].position.x + delta.dx,
                y: oldSlide.objects[1].position.y + delta.dy
            }
        }
        const movedObject2: SlideObject = {
            ...oldSlide.objects[2],
            position: {
                x: oldSlide.objects[2].position.x + delta.dx,
                y: oldSlide.objects[2].position.y + delta.dy
            }
        }

        const expectedSlide: Slide = {
            ...oldSlide,
            objects: [imageObject2, movedObject1, movedObject2, imageObject2, imageObject1]
        }
        const slideWithMovedObjects: Slide = moveObjects(oldSlide, [oldSlide.objects[1].id, oldSlide.objects[2].id], delta)

        expect(slideWithMovedObjects).toEqual(expectedSlide)
        expect(oldSlide).toEqual(oldSlideCopy)
    })
})

describe("resizeObject", () => {
    it("changes chosen objects size", () => {
        const oldSlide = slideWithSolidBg1
        const oldSlideCopy = structuredClone(slideWithSolidBg1)

        const delta: Vector = {
            dx: -12.425,
            dy: 145
        }

        const resizedObject: SlideObject = {
            ...oldSlide.objects[1],
            size: {
                width: oldSlide.objects[1].size.width + delta.dx,
                height: oldSlide.objects[1].size.height + delta.dy
            }
        }

        const expectedSlide: Slide = {
            ...oldSlide,
            objects: [imageObject2, resizedObject, textObject1, imageObject2, imageObject1]
        }
        const slideWithResizedObjects: Slide = resizeObject(oldSlide, oldSlide.objects[1].id, delta)

        expect(slideWithResizedObjects).toEqual(expectedSlide)
        expect(oldSlide).toEqual(oldSlideCopy)
    })
})

describe("updateTextObjectStyle", () => {
    it("changes text object properties", () => {
        const oldSlide: Slide = slideWithImageBg2
        const oldSlideCopy = structuredClone(oldSlide)

        const textObject = oldSlide.objects[0] as TextObject
        const expectedTextObject: TextObject = {
            ...textObject,
            fontFamily: newTextFontFamily,
            fontSize: newTextFontSize,
            fontColor: newTextFontColor
        }
        const expectedSlide: Slide = {
            ...oldSlide,
            objects: [expectedTextObject, ...oldSlide.objects.slice(1, oldSlide.objects.length)]
        }

        const slideWithUpdatedTextObject = updateTextObjectStyle(oldSlide, oldSlide.objects[0].id, newTextFontFamily,
            newTextFontSize, newTextFontColor)

        expect(slideWithUpdatedTextObject).toEqual(expectedSlide)
        expect(oldSlide).toEqual(oldSlideCopy)
    })
})

describe("updateTextObjectContent", () => {
    it("changes text object content", () => {
        const oldSlide: Slide = slideWithImageBg2
        const oldSlideCopy = structuredClone(oldSlide)

        const textObject = oldSlide.objects[0] as TextObject
        const expectedTextObject: TextObject = {
            ...textObject,
            text: newTextContent
        }
        const expectedSlide: Slide = {
            ...oldSlide,
            objects: [expectedTextObject, ...oldSlide.objects.slice(1, oldSlide.objects.length)]
        }

        const slideWithUpdatedTextObject = updateTextObjectContent(oldSlide, oldSlide.objects[0].id, newTextContent)

        expect(slideWithUpdatedTextObject).toEqual(expectedSlide)
        expect(oldSlide).toEqual(oldSlideCopy)
    })
})

describe("updateImageObjectUrl", () => {
    it("changes image object url", () => {
        const oldSlide = slideWithSolidBg2
        const oldSlideCopy = structuredClone(oldSlide)

        const imageObject = oldSlide.objects[0] as ImageObject
        const expectedImageObject: ImageObject = {
            ...imageObject,
            src: newImageSrc
        }
        const expectedSlide: Slide = {
            ...oldSlide,
            objects: [expectedImageObject]
        }

        const slideWithUpdatedImageObject = updateImageObjectUrl(oldSlide, oldSlide.objects[0].id, newImageSrc)

        expect(slideWithUpdatedImageObject).toEqual(expectedSlide)
        expect(oldSlide).toEqual(oldSlideCopy)
    })
})