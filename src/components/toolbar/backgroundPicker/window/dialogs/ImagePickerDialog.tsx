import useImageLoader from "../../../../../utils/useImageLoader.tsx";
import style from "../BackgroundPickerWindow.module.css"
import {useAppDispatch} from "../../../../../utils/useAppDispatch.tsx";
import {setSlideBackgroundImage} from "../../../../../store/slices/slideSlice.ts";

type ImagePickerDialogProps = {
    slideId?: string
}

function ImagePickerDialog(props: ImagePickerDialogProps) {
    const dispatch = useAppDispatch()

    const onImageInput = (value: string) => {
        dispatch(setSlideBackgroundImage({imageUrl: value}))
    }

    const {inputRef, onLoaderButtonClick, onFileChange} = useImageLoader((newSrc: string) => {
        onImageInput(newSrc)
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