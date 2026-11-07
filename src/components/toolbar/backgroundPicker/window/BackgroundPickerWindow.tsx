import style from "./BackgroundPickerWindow.module.css"
import type {Background} from "../../../../types/slide.ts";
import BackgroundPickerHeaderButton from "./BackgroundPickerHeaderButton.tsx";
import {useEffect, useState} from "react";
import SolidPickerDialog from "./dialogs/SolidPickerDialog.tsx";
import ImagePickerDialog from "./dialogs/ImagePickerDialog.tsx";
import GradientPickerDialog from "./dialogs/GradientPickerDialog.tsx";
import {onBackgroundClear} from "./BackgroundPickerWindowActions.ts";

type BackgroundPickerWindowProps = {
    isShown: boolean
    slideId?: string
    slideBackground?: Background
}

function BackgroundPickerWindow(props: BackgroundPickerWindowProps) {
    const [selectedBackgroundType, setSelectedBackgroundType] = useState(props.slideBackground?.type)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSelectedBackgroundType(props.slideBackground?.type)
    }, [props.slideBackground?.type]);

    if (!props.isShown || !props.slideBackground) {
        return null
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
                onClick={() => onBackgroundClear(props.slideId)}
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