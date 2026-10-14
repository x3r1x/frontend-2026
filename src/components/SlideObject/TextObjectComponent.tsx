import type {TextObject} from "../../types/objects.js";
import TextInput from "../General/TextInput.js";
import inputStyle from "../General/TextInput.module.css";

type TextObjectComponentProps = {
    textObject: TextObject,
    baseObjectStyle: object,
    scale: number,
    editable: boolean,
    onChange: (newText: string) => void,
    onClick?: () => void
}

function TextObjectComponent(props: TextObjectComponentProps) {
    const textObjectStyle = {
        fontFamily: props.textObject.fontFamily,
        fontSize: props.textObject.fontSize * props.scale,
        color: props.textObject.fontColor
    }

    return (
        <TextInput
            text={props.textObject.text}
            className={props.editable ? inputStyle.slideText : ""}
            onChange={props.onChange}
            onClick={props.onClick}
            editable={props.editable}
            additionalStyle={{...props.baseObjectStyle, ...textObjectStyle}}
        />
    )
}

export default TextObjectComponent;