import style from "./BackgroundPicker.module.css"

type BackgroundPickerButtonMode = "default" | "selected" | "disabled"

type BackgroundPickerButtonProps = {
    mode: BackgroundPickerButtonMode
    onClick: () => void
}

function BackgroundPickerButton(props: BackgroundPickerButtonProps) {
    const onClick = props.mode !== "disabled"
        ? () => props.onClick()
        : () => {}

    const additionalStyleName = props.mode === "selected"
        ? style.buttonSelected
        : props.mode === "disabled"
            ? style.buttonDisabled
            : style.buttonDefault;

    return (
        <div className={style.buttonContainer + " " + additionalStyleName} onClick={onClick}>
            <p className={style.buttonText}>Background</p>
            <img className={style.buttonImage} alt={""} src={"/src/assets/rectangle.png"} />
        </div>
    )
}

export default BackgroundPickerButton