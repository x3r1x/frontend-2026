import type {TextObject} from "../../types/objects.js";
import inputStyle from "../general/textInput/TextInput.module.css";
import TextInput from "../general/textInput/TextInput.js";
import * as React from "react";
import type {TextStylePreview} from "../textStylePanel/TextStylePanel.tsx";

type TextObjectComponentProps = {
    textObject: TextObject,
    baseObjectStyle: object,
    scale: number,
    editable: boolean,
    onChange: (newText: string) => void,
    onMouseDown?: (event: React.MouseEvent) => void
    onClick?: () => void
    textStylePreview?: TextStylePreview
}

function TextObjectComponent(props: TextObjectComponentProps) {
    const textObjectStyle = {
        fontFamily: props.textStylePreview
            ? props.textStylePreview.fontFamily
            : props.textObject.fontFamily,
        fontSize: props.textStylePreview
            ? props.textStylePreview.fontSize * props.scale
            : props.textObject.fontSize * props.scale,
        color: props.textStylePreview
            ? props.textStylePreview.fontColor
            : props.textObject.fontColor
    }

    return (
        <TextInput
            text={props.textObject.text}
            className={props.editable
                ? inputStyle.slideText
                : ""
            }
            onChange={props.onChange}
            onMouseDown={props.onMouseDown}
            onClick={props.onClick}
            editable={props.editable}
            additionalStyle={{...props.baseObjectStyle, ...textObjectStyle}}
        />
    )
}

export default TextObjectComponent;