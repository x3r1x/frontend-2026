import style from "../BackgroundPickerWindow.module.css"
import {useRef} from "react";
import TextInput from "../../../../general/textInput/TextInput.tsx";
import {useAppDispatch} from "../../../../../utils/useAppDispatch.tsx";
import {getSlideById} from "../../../../../actions/slide.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../../../../../store";
import {setSlideBackgroundGradient} from "../../../../../store/slices/presentationSlice.ts";

type GradientPickerDialogProps = {
    slideId?: string,
    colors: string[],
    angle: number
}

function GradientPickerDialog(props: GradientPickerDialogProps) {
    const dispatch = useAppDispatch()
    const domainState = useSelector((state: RootState) => state.presentation.presentation)
    const colorInputRef = useRef<HTMLInputElement>(null)

    if (!props.slideId || !domainState) {
        return
    }

    const slide = getSlideById(domainState.slideCollection, props.slideId)

    const onGradientAdd = (value: string) => {
        const newColors = slide.background.type === "gradient"
            ? [...slide.background.colors, value]
            : [value]

        const newAngle = slide.background.type === "gradient"
            ? slide.background.angle
            : 0

        dispatch(setSlideBackgroundGradient({slideId: props.slideId!, colors: newColors, angle: newAngle}))
    }

    const onGradientAngleChange = (value: number) => {
        const newColors = slide.background.type === "gradient"
            ? slide.background.colors
            : []

        const newAngle = slide.background.type === "gradient"
            ? value
            : 0

        dispatch(setSlideBackgroundGradient({slideId: props.slideId!, colors: newColors, angle: newAngle}))
    }

    if (!props.slideId) {
        return null
    }

    return (
        <div className={style.gradientDialogContainer}>
            <input
                type={"color"}
                ref={colorInputRef}
                style={{display: "none"}}
                onInput={(event) => {
                    onGradientAdd(event.currentTarget.value)
                }
            }
            />

            <p className={style.gradientDialogText}>Colors selected: {props.colors.length}</p>
            <a className={style.gradientDialogInput} onClick={() => colorInputRef.current?.click()}>Add color</a>
            <TextInput
                text={props.angle.toString()}
                className={""}
                editable={true}
                onChange={(newValue: string) => {
                    if (!isNaN(Number(newValue))) {
                        onGradientAngleChange(Number(newValue))
                    }
                }}
            />
        </div>
    )
}

export default GradientPickerDialog