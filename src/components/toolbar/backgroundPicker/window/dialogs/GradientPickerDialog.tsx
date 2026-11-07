import style from "../BackgroundPickerWindow.module.css"
import {useRef} from "react";
import {onGradientAdd, onGradientAngleChange} from "../BackgroundPickerWindowActions.ts";
import TextInput from "../../../../general/textInput/TextInput.tsx";

type GradientPickerDialogProps = {
    slideId?: string,
    colors: string[],
    angle: number
}

function GradientPickerDialog(props: GradientPickerDialogProps) {
    const colorInputRef = useRef<HTMLInputElement>(null)

    if (!props.slideId) {
        return null
    }

    return (
        <div className={style.gradientDialogContainer}>
            <input
                type={"color"}
                ref={colorInputRef}
                style={{display: "none"}}
                onInput={event => onGradientAdd(event.currentTarget.value, props.slideId)}
            />

            <p className={style.gradientDialogText}>Colors selected: {props.colors.length}</p>
            <a className={style.gradientDialogInput} onClick={() => colorInputRef.current?.click()}>Add color</a>
            <TextInput
                text={props.angle.toString()}
                className={""}
                editable={true}
                onChange={newValue => {
                    if (!isNaN(Number(newValue))) {
                        onGradientAngleChange(Number(newValue), props.slideId)
                    }
                }}
            />
        </div>
    )
}

export default GradientPickerDialog