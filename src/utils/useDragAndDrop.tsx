import {useEffect, useRef, useState} from "react";
import * as React from "react";

const useDragAndDrop = (
    onDrag: (offsetX: number, offsetY: number) => void,
    onFinish: (offsetX: number, offsetY: number) => void
) => {
    const [isDragging, setIsDragging] = useState(false)
    const startX = useRef(0)
    const startY = useRef(0)
    const offsetX = useRef(0)
    const offsetY = useRef(0)

    const onMouseDown = (event: React.MouseEvent) => {
        setIsDragging(true)
        event.preventDefault()
        startX.current = event.clientX
        startY.current = event.clientY
    }

    useEffect(() => {
        const onMouseMove = (event: MouseEvent) => {
            if (isDragging) {
                onDrag(offsetX.current, offsetY.current)
                offsetX.current = event.clientX - startX.current
                offsetY.current = event.clientY - startY.current
            }
        }

        const onMouseUp = () => {
            if (isDragging) {
                setIsDragging(false)

                if (offsetX.current !== 0 || offsetY.current !== 0) {
                    onDrag(0, 0)
                    onFinish(offsetX.current, offsetY.current)
                }

                startX.current = 0
                startY.current = 0
                offsetX.current = 0
                offsetY.current = 0
            }
        }

        document.addEventListener("mousemove", onMouseMove)
        document.addEventListener("mouseup", onMouseUp)

        return () => {
            document.removeEventListener("mousemove", onMouseMove)
            document.removeEventListener("mouseup", onMouseUp)
        }
    });

    return onMouseDown
}

export default useDragAndDrop