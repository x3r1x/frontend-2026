import style from "./HeaderButton.module.css"

type HeaderButtonProps = {
    text: string,
    onClick: () => void
}

function HeaderButton(props: HeaderButtonProps) {
    return (
        <a className={style.container} onClick={props.onClick}>
            {props.text}
        </a>
    )
}

export default HeaderButton;