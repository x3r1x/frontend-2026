import style from "./SlideView.module.css";
import type {Background, Slide} from "../../types/slide.js";
import * as React from "react";
import useDragAndDrop from "../../utils/useDragAndDrop.tsx";
import {type CSSProperties, useState} from "react";
import type {Vector} from "../../types/objects.ts";
import SlideObjectItem from "./SlideObjectItem.tsx";
import {useAppDispatch} from "../../utils/useAppDispatch.tsx";
import {moveObjects, updateTextObjectContent} from "../../store/slices/presentationSlice.ts";
import type {TextStylePreview} from "../../components/textStylePanel/TextStylePanel.tsx";

type SlideViewProps = {
    slide: Slide,
    scale: number,
    objectsEditable: boolean,
    selectedObjectIds: string[],
    isSelected?: boolean
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void,
    textStylePreview?: TextStylePreview
    onObjectClick?: (objectId: string) => void
}

function SlideView({onObjectClick, ...props}: SlideViewProps) {
    const [dragOffset, setDragOffset] = useState<Vector>({dx: 0, dy: 0})
    const dispatch = useAppDispatch()

    function onObjectDragAndDrop(offsetX: number, offsetY: number) {
        if (!props.slide) {
            return
        }

        dispatch(moveObjects({
            slideId: props.slide.id,
            objectIds: props.selectedObjectIds, shift: {
                dx: offsetX / props.scale,
                dy: offsetY / props.scale
            }
        }))
    }

    const onTextObjectChange = (newText: string) => {
        if (!props.slide) {
            return
        }

        dispatch(updateTextObjectContent({slideId: props.slide.id, objectId: props.selectedObjectIds[0], content: newText}))
    }

    const onObjectMouseDown = useDragAndDrop(
        (offsetX, offsetY) =>
            setDragOffset({
                dx: offsetX / props.scale,
                dy: offsetY / props.scale
            }),
        onObjectDragAndDrop
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
                textStylePreview={props.textStylePreview}
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
                onTextObjectChange={onTextObjectChange}
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

function getBackgroundStyle(background: Background): CSSProperties {
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