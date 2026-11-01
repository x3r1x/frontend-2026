import style from "./SlideView.module.css";
import type {Background, Slide} from "../../types/slide.js";
import {onTextObjectChange} from "../../AppActions.js";
import * as React from "react";
import useDragAndDrop from "../../utils/useDragAndDrop.tsx";
import {onObjectDragAndDrop} from "./SlideViewActions.ts";
import {useState} from "react";
import type {Vector} from "../../types/objects.ts";
import SlideObjectItem from "./SlideObjectItem.tsx";

type SlideViewProps = {
    slide: Slide,
    scale: number,
    objectsEditable: boolean,
    selectedObjectIds: string[],
    isSelected?: boolean
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void,
    onObjectClick?: (objectId: string) => void
}

function SlideView({onObjectClick, ...props}: SlideViewProps) {
    const [dragOffset, setDragOffset] = useState<Vector>({dx: 0, dy: 0})

    const onObjectMouseDown = useDragAndDrop(
        (offsetX, offsetY) =>
            setDragOffset({
                dx: offsetX / props.scale,
                dy: offsetY / props.scale
            }),
        (offsetX, offsetY) => onObjectDragAndDrop(props.slide, props.selectedObjectIds, props.scale, offsetX, offsetY)
    )

    if (!props.slide) {
        return null
    }

    const objects = props.slide.objects.map(
        object => {
            return <SlideObjectItem
                key={object.id}
                slide={props.slide}
                object={object}
                scale={props.scale}
                editable={props.objectsEditable}
                selection={
                    props.selectedObjectIds.includes(object.id)
                        ? props.selectedObjectIds[0] === object.id
                            ? "primary"
                            : "defaultSelected"
                        : "unselected"}
                onMouseDown={onObjectMouseDown}
                onClick={onObjectClick
                    ? () => onObjectClick(object.id)
                    : () => {
                    }
                }
                onTextObjectChange={(newText: string) => onTextObjectChange(props.slide, object.id, newText)}
                dragOffset={dragOffset}
            />
        }
    )
    const additionalStyle = {
        height: String(1080 * props.scale) + "px"
    }

    const selectedClassName = props.isSelected
        ? style.selected
        : "";

    return (
        <div className={style.container + " " + selectedClassName}
             style={{...additionalStyle, ...getBackgroundStyle(props.slide.background)}}
             onClick={props.onClick}
        >
            {objects}
        </div>
    )
}

function getBackgroundStyle(background: Background) {
    switch (background.type) {
        case "image": {
            return {
                backgroundImage: "url(" + background.src + ")",
                backgroundSize: "cover"
            }
        }
        case "solid": {
            return {
                backgroundColor: background.color
            }
        }
        case "gradient": {
            return {
                background: "linear-gradient(" + background.angle + "deg, " + background.colors.join(", ") + ")"
            }
        }
        default:
            return {}
    }
}

export default SlideView;