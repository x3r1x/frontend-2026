import style from "./HeaderButton.module.css"

type HeaderButtonProps = {
    text: string
    enabled: boolean
    onClick: () => void
}

function HeaderButton(props: HeaderButtonProps) {
    const additionalClassName = props.enabled
        ? ""
        : style.disabled

    return (
        <a className={style.container + " " + additionalClassName} onClick={props.onClick}>
            {props.text}
        </a>
    )
}

export default HeaderButton;