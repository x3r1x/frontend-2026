import style from "./BackgroundPickerWindow.module.css"

type BackgroundPickerHeaderButtonProps = {
    text: string,
    isSelected: boolean,
    onClick: () => void
}

function BackgroundPickerHeaderButton(props: BackgroundPickerHeaderButtonProps) {
    const additionalClassName = props.isSelected
        ? style.selected
        : ""

    return (
        <a className={style.headerButton + " " + additionalClassName} onClick={props.onClick}>
            {props.text}
        </a>
    )
}

export default BackgroundPickerHeaderButton