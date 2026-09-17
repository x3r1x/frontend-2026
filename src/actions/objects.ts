import type {Slide} from "../types/slide.js";
import type {
    BaseSlideObject, ObjectSize,
    SlideObject,
    Vector
} from "../types/objects.js";

type TextObjectProps = {
    text: string;
    fontFamily: string;
    fontSize: number;
    fontColor: string;
    type: "text";
}

type ImageObjectProps = {
    src: string;
    type: "image";
}

function addSlideObject(slide: Slide, baseObject: BaseSlideObject, props: TextObjectProps | ImageObjectProps): Slide {
    const object = {
        ...baseObject,
        ...props
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

function resizeObject(slide: Slide, objectId: string, newSize: ObjectSize): Slide {
    return modifyObject(slide, objectId, { size: newSize })
}

function updateTextObjectStyle(slide: Slide, objectId: string, props: TextObjectProps): Slide {
    return modifyObject(slide, objectId, props)
}

//make abstract
function updateTextObjectContent(slide: Slide, objectId: string, content: string): Slide {
    return modifyObject(slide, objectId, { text: content })
}

function updateImageObjectUrl(slide: Slide, objectId: string, imageUrl: string): Slide {
    return modifyObject(slide, objectId, { src: imageUrl })
}

function modifyObject(slide: Slide, objectId: string, payload: Partial<SlideObject>): Slide {
    const newObjects: SlideObject[] = slide.objects.map(object => {
        if (object.id !== objectId) {
            return object
        }

        return {
            ...object,
            ...payload
        } as SlideObject
    })

    return {
        ...slide,
        objects: newObjects
    }
}

export {
    type TextObjectProps,
    type ImageObjectProps,
    addSlideObject,
    removeObjects,
    moveObjects,
    resizeObject,
    updateTextObjectStyle,
    updateTextObjectContent,
    updateImageObjectUrl
}