import type {SlideObject, Vector} from "../../types/objects.ts";
import useDragAndDrop from "../useDragAndDrop.tsx";
import * as React from "react";
import {useAppDispatch} from "../useAppDispatch.tsx";
import {resizeObject} from "../../store/slices/slideSlice.ts";

const useResize = (
    object: SlideObject,
    scale: number,
    setResizeOffset: React.Dispatch<React.SetStateAction<Vector>>
) => {
    const dispatch = useAppDispatch()

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

        dispatch(resizeObject({objectId: object.id, newSize: {width: newWidth, height: newHeight}}))
    }

    return useDragAndDrop(onDrag, onFinish)
}

export default useResize;