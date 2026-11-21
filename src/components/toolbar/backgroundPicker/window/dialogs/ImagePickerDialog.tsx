import useImageLoader from "../../../../../utils/useImageLoader.tsx";
import style from "../BackgroundPickerWindow.module.css"
import {useAppDispatch} from "../../../../../utils/useAppDispatch.tsx";
import {setSlideBackgroundImage} from "../../../../../store/slices/presentationSlice.ts";

type ImagePickerDialogProps = {
    slideId?: string
}

function ImagePickerDialog(props: ImagePickerDialogProps) {
    const dispatch = useAppDispatch()

    if (!props.slideId) {
        return null
    }

    const slideId = props.slideId

    const onImageInput = (value: string) => {
        dispatch(setSlideBackgroundImage({slideId: slideId, imageUrl: value}))
    }

    const {inputRef, onLoaderButtonClick, onFileChange} = useImageLoader((newSrc: string) => {
        onImageInput(newSrc)
    })

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