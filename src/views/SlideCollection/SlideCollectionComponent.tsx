import style from "./SlideCollectionComponent.module.css";
import textInputStyles from "../../components/General/TextInput.module.css"
import SlideView from "../SlideView/SlideView.js";
import type {Slide} from "../../types/slide.js";
import TextInput from "../../components/General/TextInput.js";
import {SCALES_CONSTANTS} from "../../AppConstants.js";
import type {Presentation} from "../../types/presentation.js";
import type {AppState} from "../../data.js";
import {onSlideNameChange, onSlideViewClick} from "./SlideCollectionActions.js";

type SlideCollectionComponentProps = {
    slideCollection: Slide[],
    selectedIds: string[],
    tempDomainState: Presentation,
    appState: AppState
}

type SelectedSlide = "unselected" | "firstSelected" | "latterSelected"

function SlideCollectionComponent(props: SlideCollectionComponentProps) {
    const slides = props.slideCollection.map((slide, index) =>
        translateSlideToPreview(slide, index, getSelectedSlide(slide.id, props.selectedIds), props.appState))

    return (
        <div className={style.container}>
            {slides}
        </div>
    )
}

function translateSlideToPreview(slide: Slide, index: number, selected: SelectedSlide, appState: AppState) {
    const additionalStyle: object = (selected === "firstSelected" || selected === "latterSelected")
        ? {border: "3px solid #0033FF"}
        : {}

    const scale = selected === "firstSelected" ? SCALES_CONSTANTS.SELECTED_SLIDE : SCALES_CONSTANTS.UNSELECTED_SLIDE

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
                selectedObjectIds={appState.selectedObjectIds}
                scale={scale}
                additionalStyle={additionalStyle}
                onClick={() => onSlideViewClick(slide.id)}
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