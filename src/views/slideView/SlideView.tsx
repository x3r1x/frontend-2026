import style from "./SlideView.module.css";
import type {Background, Slide} from "../../types/slide.js";
import SlideObjectComponent from "../../components/slideObject/SlideObjectComponent.js";
import {onTextObjectChange} from "../../AppActions.js";
import * as React from "react";
import useDragAndDrop from "../../utils/useDragAndDrop.tsx";
import {onObjectDragAndDrop} from "./SlideViewActions.ts";

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
    const onObjectMouseDown = useDragAndDrop((offsetX, offsetY) => {
        onObjectDragAndDrop(props.slide, props.selectedObjectIds, props.scale, offsetX, offsetY)
    })

    if (!props.slide) {
        return null
    }

    const objects = props.slide.objects.map(
        object => <SlideObjectComponent
            slideObject={object}
            isSelected={props.selectedObjectIds.includes(object.id)}
            onMouseDown={props.objectsEditable ? onObjectMouseDown : undefined}
            onClick={onObjectClick
                ? () => onObjectClick(object.id)
                : () => {
                }
            }
            onTextObjectChange={(newText: string) => onTextObjectChange(props.slide, object.id, newText)}
            editable={props.objectsEditable}
            key={object.id}
            scale={props.scale}
        />
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