import type {SlideObject, Vector} from "../../types/objects.ts";
import {resizeObject} from "../../actions/objects.ts";
import useDragAndDrop from "../useDragAndDrop.tsx";
import type {Slide} from "../../types/slide.ts";
import {dispatch} from "../../editor.ts";
import {slideActionContainer} from "../../actions/slide.ts";
import * as React from "react";

const useResize = (
    slide: Slide,
    object: SlideObject,
    scale: number,
    setResizeOffset: React.Dispatch<React.SetStateAction<Vector>>
) => {
    const onDrag = (offsetX: number, offsetY: number) => {
        document.documentElement.style.setProperty("cursor", "nwse-resize")

        const newWidth = (object.size.width + offsetX / scale) > 30
            ? offsetX / scale
            : -(object.size.width - 30)

        const newHeight = (object.size.height + offsetY / scale) > 30
            ? offsetY / scale
            : -(object.size.height - 30)

        setResizeOffset({
            dx: newWidth,
            dy: newHeight
        })
    }

    const onFinish = (offsetX: number, offsetY: number) => {
        document.documentElement.style.removeProperty("cursor")

        const newWidth = (object.size.width + offsetX / scale) > 30
            ? object.size.width + offsetX / scale
            : 30

        const newHeight = (object.size.height + offsetY / scale) > 30
            ? object.size.height + offsetY / scale
            : 30

        const newSlide = resizeObject(slide, {
            objectId: object.id,
            newSize: {
                width: newWidth,
                height: newHeight
            }
        })
        dispatch(slideActionContainer, {slideId: slide.id, newSlide: newSlide})
    }

    return useDragAndDrop(onDrag, onFinish)
}

export default useResize;