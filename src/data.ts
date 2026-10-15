import type {Presentation} from "./types/presentation.js";
import {generateId} from "./actions/presentation.js";
import {
    slideWithGradientBg1,
    slideWithGradientBg2,
    slideWithImageBg1, slideWithImageBg2,
    slideWithSolidBg2
} from "./__tests__/slide/slideTestStorage.js";
import {imageObject3, textObject1} from "./__tests__/objects/objectsTestStorage.js";

type ToolbarOptions = "mouse" | "add text" | "add image" | "change background";

type AppState = {
    selectedSlideIds: string[],
    selectedObjectIds: string[],
    toolbarOption: ToolbarOptions,
    isDarkMode: boolean,
    previewMode: boolean,
    previewSlide: number
}

function getDefaultAppState(): AppState {
    return {
        selectedObjectIds: [],
        selectedSlideIds: [],
        toolbarOption: "mouse",
        isDarkMode: false,
        previewMode: false,
        previewSlide: 0
    }
}

function createTestPresentation(): Presentation {
    return {
        id: generateId(),
        name: "My first presentation",
        slideCollection: [slideWithImageBg1, slideWithGradientBg2, slideWithSolidBg2, slideWithGradientBg1, slideWithImageBg2]
    }
}

function getTestAppState(): AppState {
    return {
        isDarkMode: false,
        toolbarOption: "mouse",
        selectedObjectIds: [textObject1.id, imageObject3.id],
        selectedSlideIds: [slideWithImageBg1.id, slideWithSolidBg2.id, slideWithGradientBg1.id],
        previewMode: false,
        previewSlide: 0
    }
}

export {
    type ToolbarOptions,
    type AppState,
    getDefaultAppState,
    createTestPresentation,
    getTestAppState
}