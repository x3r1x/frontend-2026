import type {SlideObject} from "../../types/objects.js";
import TextObjectComponent from "./TextObjectComponent.js";
import ImageObjectComponent from "./ImageObjectComponent.js";

type SlideObjectProps = {
    slideObject: SlideObject
    scale: number,
    editable: boolean,
    onChange: () => void,
    isSelected: boolean
}

function SlideObjectComponent(props: SlideObjectProps) {
    const baseObjectStyle = {
        position: "absolute",
        left: props.slideObject.position.x * props.scale,
        top: props.slideObject.position.y * props.scale,
        width: props.slideObject.size.width * props.scale,
        height: props.slideObject.size.height * props.scale,
        border: props.isSelected && props.editable ? "3px solid #0033FF" : "none"
    }


    switch (props.slideObject.type) {
        case "text":
            return <TextObjectComponent
                textObject={props.slideObject}
                editable={props.editable}
                baseObjectStyle={baseObjectStyle}
                scale={props.scale}
                onChange={props.onChange}
            />
        case "image":
            return <ImageObjectComponent
                imageObject={props.slideObject}
                editable={props.editable}
                baseObjectStyle={baseObjectStyle}
                onChange={props.onChange}
            />
        default:
            return <></>
    }
}

export default SlideObjectComponent;