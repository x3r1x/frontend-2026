import type {SlideObject, Vector} from "../../types/objects.ts";
import style from "./ResizeMarker.module.css"
import  {type CSSProperties} from "react";
import * as React from "react";

type ResizeMarkerProps = {
    slideObject: SlideObject,
    scale: number,
    dragOffset?: Vector,
    resizeOffset?: Vector
    onMouseDown: (event: React.MouseEvent) => void
}

function ResizeMarker({slideObject, scale, dragOffset, resizeOffset, onMouseDown}: ResizeMarkerProps) {
    const markerStyle: CSSProperties = {
        position: "absolute",
        top: (slideObject.position.y + slideObject.size.height + (dragOffset ? dragOffset.dy : 0) + (resizeOffset ? resizeOffset.dy : 0)) * scale,
        left: (slideObject.position.x + slideObject.size.width + (dragOffset ? dragOffset.dx : 0) + (resizeOffset ? resizeOffset.dx : 0)) * scale
    }

    return (
        <div className={style.container} style={markerStyle} onMouseDown={onMouseDown}/>
    )
}

export default ResizeMarker