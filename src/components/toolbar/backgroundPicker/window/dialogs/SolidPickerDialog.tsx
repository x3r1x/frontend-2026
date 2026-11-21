import style from "../BackgroundPickerWindow.module.css"
import {useAppDispatch} from "../../../../../utils/useAppDispatch.tsx";
import {setSlideBackgroundColor} from "../../../../../store/slices/presentationSlice.ts";

type SolidPickerDialogProps = {
    color: string,
    slideId?: string
}

function SolidPickerDialog(props: SolidPickerDialogProps) {
    const dispatch = useAppDispatch()

    if (!props.slideId) {
        return null
    }

    const slideId = props.slideId

    const onSolidInput = (value: string) => {
        dispatch(setSlideBackgroundColor({slideId: slideId, color: value}))
    }

    return (
        <input
            type={"color"}
            className={style.solidDialogInput}
            value={props.color}
            onInput={event => {
                onSolidInput(event.currentTarget.value)
            }}
        />
    )
}

export default SolidPickerDialog