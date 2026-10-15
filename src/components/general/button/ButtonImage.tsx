import style from "./Button.module.css"

type ButtonImageProps = {
    imageSrc: string
}

function ButtonImage(props: ButtonImageProps) {
    return (
        <img alt={""} className={style.imageContainer} src={props.imageSrc}/>
    )
}

export default ButtonImage;