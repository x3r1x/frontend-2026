import {dispatch, getAppState, setAppState} from "./editor.js";
import {type AppState, getDefaultAppState, type ToolbarOptions} from "./data.js";
import {slideActionContainer} from "./actions/slide.js";
import type {Slide} from "./types/slide.js";
import {
    addSlideObject,
    type ImageObjectProps,
    type TextObjectProps,
    updateTextObjectContent
} from "./actions/objects.js";
import type {BaseSlideObject, Coordinates} from "./types/objects.js";
import {generateId} from "./actions/presentation.js";
import {DEFAULTS} from "./AppConstants.js";

const onObjectClick = (objectId: string) => {
    const currentAppState = getAppState()!

    const newAppState: AppState = currentAppState.selectedObjectIds.includes(objectId)
        ? {
            ...currentAppState,
            selectedObjectIds: currentAppState.selectedObjectIds.filter(existingId => existingId !== objectId)
        }
        : {
            ...currentAppState,
            selectedObjectIds: [...currentAppState.selectedObjectIds, objectId]
        }


    setAppState(newAppState)
}

function onTextObjectChange(slide: Slide, objectId: string, newText: string): void {
    const newSlide = updateTextObjectContent(slide, objectId, newText)

    dispatch(slideActionContainer, {slideId: slide.id, newSlide: newSlide})
}

function onWorkspaceSlideClick(currentSlide: Slide, selectedOption: ToolbarOptions, coords: Coordinates): void {
    if (selectedOption === "change background" || selectedOption === "mouse") {
        return;
    }

    const baseSlideObject = getBaseSlideObject(coords)
    const slideObjectProps: TextObjectProps | ImageObjectProps = selectedOption === "add text"
        ? {
            type: "text",
            text: DEFAULTS.TEXT,
            fontSize: DEFAULTS.FONT_SIZE,
            fontFamily: DEFAULTS.FONT_FAMILY,
            fontColor: DEFAULTS.COLOR
        }
        : {
            type: "image",
            src: "src/assets/test_image_1.png"
        }

    const newSlide = addSlideObject(currentSlide, baseSlideObject, slideObjectProps)
    dispatch(slideActionContainer, {slideId: currentSlide.id, newSlide: newSlide})
}

function getBaseSlideObject(coords: Coordinates): BaseSlideObject {
    return {
        id: generateId(),
        position: coords,
        size: DEFAULTS.SIZE
    }
}

window.addEventListener("keydown", (key: KeyboardEvent) => {
    if (key.key === "Escape") {
        const currentAppState = getAppState()!

        if (currentAppState.selectedObjectIds.length !== 0) {
            const newAppState: AppState = {
                ...currentAppState,
                selectedObjectIds: []
            }

            setAppState(newAppState)
        } else {
            setAppState(getDefaultAppState())
        }
    }
})

export {
    onObjectClick,
    onTextObjectChange,
    onWorkspaceSlideClick
}