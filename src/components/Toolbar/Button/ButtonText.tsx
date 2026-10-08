import style from "./Button.module.css"

type ButtonTextProps = {
    text: string
}

function ButtonText(props: ButtonTextProps) {
    return (
        <p className={style.textContainer}>
            {props.text}
        </p>
    )
}

export default ButtonText;