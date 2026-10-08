import style from "./Button.module.css"
import ButtonText from "./ButtonText.js";
import ButtonImage from "./ButtonImage.js";
import {BUTTON_CONSTANTS} from "./ButtonConstants.js";

type ButtonMode = "default" | "selected" | "disabled";

type ButtonProps = {
    mode?: ButtonMode,
    text?: string,
    imageSrc?: string,
    onClick: () => void
}

function Button(props: ButtonProps) {
    const textElement = props.text ? <ButtonText text={props.text}/> : <></>
    const imageElement = props.imageSrc ? <ButtonImage imageSrc={props.imageSrc}/> : <></>
    const onClick = props.mode !== "disabled" ? () => props.onClick() : () => {}

    const additionalStyle = {
        opacity: 1,
        backgroundColor: BUTTON_CONSTANTS.DEFAULT_BUTTON_COLOR
    };

    if (props.mode === "selected") {
        additionalStyle.backgroundColor = BUTTON_CONSTANTS.SELECTED_BUTTON_COLOR
    }

    if (props.mode === "disabled") {
        additionalStyle.opacity = BUTTON_CONSTANTS.DISABLED_OPACITY
    }

    return (
        <div className={style.container} style={additionalStyle} onClick={onClick}>
            {textElement}
            {imageElement}
        </div>
    )
}

export default Button;