import style from "../BackgroundPickerWindow.module.css"
import {useRef} from "react";
import TextInput from "../../../../general/textInput/TextInput.tsx";

type GradientPickerDialogProps = {
    slideId?: string,
    colors: string[],
    angle: number
}

function GradientPickerDialog(props: GradientPickerDialogProps) {
    // const dispatch = useAppDispatch()
    const colorInputRef = useRef<HTMLInputElement>(null)

    // const onGradientAdd = (value: string, slideId: string | undefined) => {
        // if (!slideId) {
        //     return
        // }
        //
        // const newColors = slide.background.type === "gradient"
        //     ? [...slide.background.colors, value]
        //     : [value]
        //
        // const newAngle = slide.background.type === "gradient"
        //     ? slide.background.angle
        //     : 0
        //
        // const newSlide = setSlideBackgroundGradient(slide, newColors, newAngle);
        // dispatch(slideActionContainer, {slideId: slide.id, newSlide: newSlide})
    // }

    // const onGradientAngleChange = (value: number, slideId: string | undefined) => {
        // if (!slideId) {
        //     return
        // }
        //
        // const slide = getSlideById(getState()!.slideCollection, slideId)
        //
        // const newColors = slide.background.type === "gradient"
        //     ? slide.background.colors
        //     : []
        //
        // const newAngle = slide.background.type === "gradient"
        //     ? value
        //     : 0
        //
        // const newSlide = setSlideBackgroundGradient(slide, newColors, newAngle);
        // dispatch(slideActionContainer, {slideId: slide.id, newSlide: newSlide})
    // }

    if (!props.slideId) {
        return null
    }

    return (
        <div className={style.gradientDialogContainer}>
            <input
                type={"color"}
                ref={colorInputRef}
                style={{display: "none"}}
                onInput={() => {
                }
            }
            />

            <p className={style.gradientDialogText}>Colors selected: {props.colors.length}</p>
            <a className={style.gradientDialogInput} onClick={() => colorInputRef.current?.click()}>Add color</a>
            <TextInput
                text={props.angle.toString()}
                className={""}
                editable={true}
                onChange={() => {
                    // if (!isNaN(Number(newValue))) {
                    //     onGradientAngleChange(Number(newValue), props.slideId)
                    // }
                }}
            />
        </div>
    )
}

export default GradientPickerDialog