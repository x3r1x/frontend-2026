import style from "./SlideCollectionComponent.module.css";
import textInputStyles from "../../components/general/textInput/TextInput.module.css";
import SlideView from "../slideView/SlideView.js";
import type {Slide} from "../../types/slide.js";
import {SCALES_CONSTANTS} from "../../AppConstants.js";
import {onSlideNameChange} from "./SlideCollectionActions.js";
import TextInput from "../../components/general/textInput/TextInput.js";
import * as React from "react";

type SlideCollectionComponentProps = {
    slideCollection: Slide[],
    selectedSlideIds: string[],
    setSelectedSlideIds: React.Dispatch<React.SetStateAction<string[]>>
}

type SelectedSlide = "unselected" | "firstSelected" | "latterSelected"

function SlideCollectionComponent(props: SlideCollectionComponentProps) {
    const slides = props.slideCollection.map((slide, index) =>
        translateSlideToPreview(slide, index, getSelectedSlide(slide.id, props.selectedSlideIds), props.selectedSlideIds, props.setSelectedSlideIds))

    return (
        <div className={style.container}>
            {slides}
        </div>
    )
}

function translateSlideToPreview(slide: Slide, index: number, selectedSlide: SelectedSlide, selectedSlideIds: string[], setSelectedSlideIds: React.Dispatch<React.SetStateAction<string[]>>) {
    const scale = selectedSlide === "firstSelected"
        ? SCALES_CONSTANTS.SELECTED_SLIDE
        : SCALES_CONSTANTS.UNSELECTED_SLIDE

    return (
        <div className={style.itemContainer} key={slide.id}>
            <TextInput
                text={
                    slide.name
                        ? slide.name
                        : (index + 1).toString()
                }
                editable={true}
                className={textInputStyles.slideName}
                onChange={(value: string) => onSlideNameChange(slide, value)}
            />

            <SlideView
                slide={slide}
                objectsEditable={false}
                selectedObjectIds={[]}
                scale={scale}
                isSelected={selectedSlide === "firstSelected" || selectedSlide === "latterSelected"}
                onClick={() => setSelectedSlideIds([...selectedSlideIds, slide.id])}
            />
        </div>
    )
}

function getSelectedSlide(slideId: string, selectedSlideIds: string[]): SelectedSlide {
    if (!selectedSlideIds.includes(slideId)) {
        return "unselected"
    }

    if (selectedSlideIds[0] === slideId) {
        return "firstSelected"
    }

    return "latterSelected"
}

export default SlideCollectionComponent;