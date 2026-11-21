import style from "./BackgroundPickerWindow.module.css"
import type {Background} from "../../../../types/slide.ts";
import BackgroundPickerHeaderButton from "./BackgroundPickerHeaderButton.tsx";
import {useEffect, useState} from "react";
import SolidPickerDialog from "./dialogs/SolidPickerDialog.tsx";
import ImagePickerDialog from "./dialogs/ImagePickerDialog.tsx";
import GradientPickerDialog from "./dialogs/GradientPickerDialog.tsx";
import {useAppDispatch} from "../../../../utils/useAppDispatch.tsx";
import {clearSlideBackground} from "../../../../store/slices/presentationSlice.ts";

type BackgroundPickerWindowProps = {
    isShown: boolean
    slideId?: string
    slideBackground?: Background
}

function BackgroundPickerWindow(props: BackgroundPickerWindowProps) {
    const dispatch = useAppDispatch()
    const [selectedBackgroundType, setSelectedBackgroundType] = useState(props.slideBackground?.type)

    useEffect(() => {
        setSelectedBackgroundType(props.slideBackground?.type)
    }, [props.slideBackground?.type]);

    if (!props.isShown || !props.slideBackground || !props.slideId) {
        return null
    }

    const slideId = props.slideId

    const onBackgroundClear = () => {
        dispatch(clearSlideBackground({slideId: slideId}))
    }


    return (
        <div className={style.container}>
            <div className={style.header}>
                <BackgroundPickerHeaderButton
                    text={"Solid"}
                    isSelected={selectedBackgroundType === "solid"}
                    onClick={() => setSelectedBackgroundType("solid")}
                />

                <BackgroundPickerHeaderButton
                    text={"Image"}
                    isSelected={selectedBackgroundType === "image"}
                    onClick={() => setSelectedBackgroundType("image")}
                />

                <BackgroundPickerHeaderButton
                    text={"Grad"}
                    isSelected={selectedBackgroundType === "gradient"}
                    onClick={() => setSelectedBackgroundType("gradient")}
                />
            </div>

            {getDialog(props.slideBackground, selectedBackgroundType, props.slideId)}

            <a
                className={style.clearButton}
                onClick={onBackgroundClear}
            >
                Clear background
            </a>
        </div>
    )
}

function getDialog(background?: Background, selectedOption?: string, slideId?: string) {
    switch (selectedOption) {
        case "solid":
            return <SolidPickerDialog
                slideId={slideId}
                color={background?.type === selectedOption ? background.color : "#FFFFFF"}
            />
        case "image":
            return <ImagePickerDialog slideId={slideId} />
        case "gradient":
            return <GradientPickerDialog
                slideId={slideId}
                colors={background?.type === selectedOption ? background.colors : []}
                angle={background?.type === selectedOption ? background.angle : 0}
            />
        default:
            return null
    }
}

export default BackgroundPickerWindow