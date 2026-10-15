import style from "./PreviewOverlay.module.css"
import type {Presentation} from "../../types/presentation.js";
import SlideView from "../slideView/SlideView.js";

type PreviewOverlayProps = {
    presentation: Presentation,
    currentSelectedSlide: number,
    onClose: () => void,
    onBack: () => void,
    onNext: () => void
}

function PreviewOverlay(props: PreviewOverlayProps) {
    return (
        <div className={style.container}>
            <div className={style.upperPanel}>
                <p className={style.presentationName}>
                    {props.presentation.name}
                </p>

                <a className={style.closeButton} onClick={props.onClose}>
                    x
                </a>
            </div>


            <SlideView
                slide={props.presentation.slideCollection[props.currentSelectedSlide]}
                selectedObjectIds={[]}
                scale={0.75}
                objectsEditable={false}
            />

            <div className={style.bottomPanel}>
                <a onClick={props.onBack}>
                    {"<"}
                </a>

                <p>
                    {(props.currentSelectedSlide + 1) + " / " + (props.presentation.slideCollection.length)}
                </p>

                <a onClick={props.onNext}>
                    {">"}
                </a>
            </div>
        </div>
    )
}

export default PreviewOverlay;