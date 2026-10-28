import style from "./PreviewOverlay.module.css"
import type {Presentation} from "../../types/presentation.js";
import SlideView from "../slideView/SlideView.js";
import {useState} from "react";
import {onNextSlideClick, onPreviousSlideClick} from "./PreviewOverlayActions.ts";

type PreviewOverlayProps = {
    presentation: Presentation,
    onClose:  () => void
}

function PreviewOverlay(props: PreviewOverlayProps) {
    const [currentSlide, setCurrentSlide] = useState(0);

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
                slide={props.presentation.slideCollection[currentSlide]}
                selectedObjectIds={[]}
                scale={0.75}
                objectsEditable={false}
            />

            <div className={style.bottomPanel}>
                <a onClick={() => onPreviousSlideClick(currentSlide, setCurrentSlide)}>
                    {"<"}
                </a>

                <p>
                    {(currentSlide + 1) + " / " + (props.presentation.slideCollection.length)}
                </p>

                <a onClick={() => onNextSlideClick(props.presentation.slideCollection.length, currentSlide, setCurrentSlide)}>
                    {">"}
                </a>
            </div>
        </div>
    )
}

export default PreviewOverlay;