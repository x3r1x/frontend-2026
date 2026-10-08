import type {ImageObject} from "../../types/objects.js";
import style from "./SlideObjectComponent.module.css"

type ImageObjectComponentProps = {
    imageObject: ImageObject,
    baseObjectStyle: object,
    editable: boolean,
    onChange: () => void
}

function ImageObjectComponent(props: ImageObjectComponentProps) {
    return (
        <img
            alt={""}
            src={props.imageObject.src}
            style={props.baseObjectStyle}
            className={props.editable ? style.imageContainer : ""}
            onChange={props.onChange}
        />
    )
}

export default ImageObjectComponent;