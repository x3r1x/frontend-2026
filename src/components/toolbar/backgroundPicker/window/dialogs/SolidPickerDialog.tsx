import style from "../BackgroundPickerWindow.module.css"
import {onSolidInput} from "../BackgroundPickerWindowActions.ts";

type SolidPickerDialogProps = {
    color: string,
    slideId?: string
}

function SolidPickerDialog(props: SolidPickerDialogProps) {
    if (!props.slideId) {
        return null
    }

    return (
        <input
            type={"color"}
            className={style.solidDialogInput}
            value={props.color}
            onInput={event => {
                onSolidInput(event.currentTarget.value, props.slideId!)
            }}
        />
    )
}

export default SolidPickerDialog