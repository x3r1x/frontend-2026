import type {Slide} from "../types/slide.js";
import type {
    BaseSlideObject,
    SlideObject, SlideObjectProps, TextObjectProps,
    Vector
} from "../types/objects.js";

function addSlideObject(slide: Slide, baseObject: BaseSlideObject, objectProps: SlideObjectProps): Slide {
    const object: SlideObject = {
        ...baseObject,
        ...objectProps
    }
    return {
        ...slide,
        objects: [...slide.objects, object]
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
    const newObjectsArray: SlideObject[] = slide.objects.map(object => {
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
    const newObjectsArray: SlideObject[] = slide.objects.map(object => {
        if (objectId === object.id) {
            return {
                ...object,
                size: {
                    width: object.size.width + change.dx,
                    height: object.size.height + change.dy
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

function updateTextObjectStyle(slide: Slide, objectId: string, textProps: TextObjectProps): Slide {
    const newObjectsArray: SlideObject[] = slide.objects.map(object => {
        if (object.id === objectId && object.type === "text") {
            return {
                ...object,
                fontSize: textProps.fontSize,
                fontFamily: textProps.fontFamily,
                fontColor: textProps.fontColor
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
    const newObjectsArray: SlideObject[] = slide.objects.map(object => {
        if (object.id === objectId && object.type === "text") {
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
    const newObjectsArray: SlideObject[] = slide.objects.map(object => {
        if (object.id === objectId && object.type === "image") {
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
    addSlideObject,
    removeObjects,
    moveObjects,
    resizeObject,
    updateTextObjectStyle,
    updateTextObjectContent,
    updateImageObjectUrl
}