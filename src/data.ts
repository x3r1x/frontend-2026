import type {Presentation} from "./types/presentation.js";
import {generateId} from "./actions/presentation.js";
import {
    slideWithGradientBg1,
    slideWithGradientBg2,
    slideWithImageBg1, slideWithImageBg2,
    slideWithSolidBg2
} from "./__tests__/slide/slideTestStorage.js";

type AppState = {
    isDarkMode: boolean,
}

function getDefaultAppState(): AppState {
    return {
        isDarkMode: false,
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
    }
}

export {
    type AppState,
    getDefaultAppState,
    createTestPresentation,
    getTestAppState
}