import SlideObjectComponent from "../../components/slideObject/SlideObjectComponent.tsx";
import type {SlideObject, Vector} from "../../types/objects.ts";
import * as React from "react";
import useResize from "../../utils/useResize/useResize.tsx";
import type {Slide} from "../../types/slide.ts";
import {useState} from "react";
import ResizeMarker from "../../utils/useResize/ResizeMarker.tsx";

type SlideObjectItemSelection = "primary" | "defaultSelected" | "unselected"

type SlideObjectItemProps = {
    slide: Slide,
    object: SlideObject,
    scale: number,
    editable: boolean,
    selection: SlideObjectItemSelection,
    onMouseDown: (event: React.MouseEvent) => void,
    onClick: () => void,
    onTextObjectChange: (newText: string) => void,
    dragOffset: Vector
}

function SlideObjectItem(props: SlideObjectItemProps) {
    const [resizeOffset, setResizeOffset] = useState<Vector>({dx: 0, dy: 0})
    const onResizeMarkerDown = useResize(
        props.slide,
        props.object,
        props.scale,
        setResizeOffset
    )

    return <>
        <SlideObjectComponent
            slideObject={props.object}
            scale={props.scale}
            editable={props.editable}
            isSelected={props.selection !== "unselected"}
            onMouseDown={props.editable
                ? props.onMouseDown
                : undefined
            }
            onResizeMarkerDown={props.editable
                ? onResizeMarkerDown
                : undefined
            }
            onClick={props.editable
                ? props.onClick
                : () => {
                }
            }
            onTextObjectChange={props.onTextObjectChange}
            offset={props.selection !== "unselected"
                ? props.dragOffset
                : undefined
            }
            resizeOffset={resizeOffset}
        />

        {props.selection === "primary"
            ? <ResizeMarker
                slideObject={props.object}
                scale={props.scale}
                onMouseDown={onResizeMarkerDown}
                resizeOffset={resizeOffset}
                dragOffset={props.dragOffset}
            />
            : <></>
        }
    </>

}

export default SlideObjectItem