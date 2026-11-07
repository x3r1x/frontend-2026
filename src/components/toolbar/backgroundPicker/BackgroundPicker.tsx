import style from "./BackgroundPicker.module.css"
import BackgroundPickerButton from "./BackgroundPickerButton.tsx";
import BackgroundPickerWindow from "./window/BackgroundPickerWindow.tsx";
import type {Background} from "../../../types/slide.ts";

type BackgroundPickerMode = "default" | "selected" | "disabled"

type BackgroundPickerProps = {
    mode: BackgroundPickerMode
    slideId?: string
    slideBackground?: Background
    onButtonClick: () => void
}

function BackgroundPicker(props: BackgroundPickerProps) {
    return (
        <div className={style.container}>
            <BackgroundPickerButton
                mode={props.mode}
                onClick={props.onButtonClick}
            />

            <BackgroundPickerWindow
                slideId={props.slideId}
                isShown={props.mode === "selected"}
                slideBackground={props.slideBackground}
            />
        </div>
    )
}

export default BackgroundPicker