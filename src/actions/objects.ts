import type {Slide} from "../types/slide.js";
import type {Coordinates, ImageObject, SlideObject, TextObject, Vector} from "../types/objects.js";

function addTextObject(slide: Slide, textId: string, content: string, position: Coordinates, size: Vector,
                       fontFamily: string, fontSize: number, fontColor: string): Slide {
    const newTextObject: TextObject = {
        id: textId,
        position: position,
        size: size,
        type: "Text",
        text: content,
        fontFamily: fontFamily,
        fontSize: fontSize,
        color: fontColor
    }

    return {
        ...slide,
        objects: [...slide.objects, newTextObject]
    }
}

function addImageObject(slide: Slide, imageId: string, imageUrl: string, position: Coordinates, size: Vector): Slide {
    const newImageObject: ImageObject = {
        id: imageId,
        position: position,
        size: size,
        type: "Image",
        src: imageUrl
    }

    return {
        ...slide,
        objects: [...slide.objects, newImageObject]
    }
}

function removeObjects(slide: Slide, objectIds: string[]): Slide {
    const newObjectsArray: SlideObject[] = slide.objects.filter(
        (object: SlideObject) => !objectIds.includes(object.id)
    )

    return {
        ...slide,
        objects: newObjectsArray
    }
}

function moveObjects(slide: Slide, objectIds: string[], shift: Vector): Slide {
    const newObjectsArray: SlideObject[] = slide.objects.map(function (object: SlideObject): SlideObject {
        if (objectIds.includes(object.id)) {
            return {
                ...object,
                position: {
                    x: object.position.x + shift.dx,
                    y: object.position.y + shift.dy
                }
            }
        }

        return object
    })

    return {
        ...slide,
        objects: newObjectsArray
    }
}

function resizeObject(slide: Slide, objectId: string, change: Vector): Slide {
    const newObjectsArray: SlideObject[] = slide.objects.map(function (object: SlideObject): SlideObject {
        if (objectId === object.id) {
            return {
                ...object,
                size: {
                    dx: object.size.dx + change.dx,
                    dy: object.size.dy + change.dy
                }
            }
        }

        return object
    })

    return {
        ...slide,
        objects: newObjectsArray
    }
}

function updateTextObjectStyle(slide: Slide, objectId: string, fontFamily: string, fontSize: number, fontColor: string): Slide {
    const newObjectsArray: SlideObject[] = slide.objects.map(function (object: SlideObject): SlideObject {
        if (object.id === objectId && object.type === "Text") {
            return {
                ...object,
                fontSize: fontSize,
                fontFamily: fontFamily,
                color: fontColor
            }
        }

        return object
    })

    return {
        ...slide,
        objects: newObjectsArray
    }
}

function updateTextObjectContent(slide: Slide, objectId: string, content: string): Slide {
    const newObjectsArray: SlideObject[] = slide.objects.map(function (object: SlideObject): SlideObject {
        if (object.id === objectId && object.type === "Text") {
            return {
                ...object,
                text: content
            }
        }

        return object
    })

    return {
        ...slide,
        objects: newObjectsArray
    }
}

function updateImageObjectUrl(slide: Slide, objectId: string, imageUrl: string): Slide {
    const newObjectsArray: SlideObject[] = slide.objects.map(function (object: SlideObject): SlideObject {
        if (object.id === objectId && object.type === "Image") {
            return {
                ...object,
                src: imageUrl
            }
        }

        return object
    })

    return {
        ...slide,
        objects: newObjectsArray
    }
}

export {
    addTextObject,
    addImageObject,
    removeObjects,
    moveObjects,
    resizeObject,
    updateTextObjectStyle,
    updateTextObjectContent,
    updateImageObjectUrl
}