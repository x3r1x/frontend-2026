import style from "./Button.module.css"
import ButtonText from "./ButtonText.js";
import ButtonImage from "./ButtonImage.js";

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
    const onClick = props.mode !== "disabled" ? () => props.onClick() : () => {
    }

    const additionalStyleName = props.mode === "selected"
        ? style.selected
        : props.mode === "disabled"
            ? style.disabled
            : "";

    return (
        <div className={style.container + " " + additionalStyleName} onClick={onClick}>
            {textElement}
            {imageElement}
        </div>
    )
}

export default Button;