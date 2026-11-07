import useImageLoader from "../../../../../utils/useImageLoader.tsx";
import {onImageInput} from "../BackgroundPickerWindowActions.ts";
import style from "../BackgroundPickerWindow.module.css"

type ImagePickerDialogProps = {
    slideId?: string
}

function ImagePickerDialog(props: ImagePickerDialogProps) {
    const {inputRef, onLoaderButtonClick, onFileChange} = useImageLoader((newSrc: string) => {
        onImageInput(newSrc, props.slideId)
    })

    if (!props.slideId) {
        return null
    }

    return (
        <>
            <input
                ref={inputRef}
                style={{display: "none"}}
                type={"file"}
                accept={"image/"}
                onChange={onFileChange}
            />

            <a className={style.imageDialogButton} onClick={onLoaderButtonClick}>New image</a>
        </>

    )
}

export default ImagePickerDialog