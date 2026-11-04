import type {Presentation} from "./types/presentation.js";
import {generateId} from "./actions/presentation.js";
import {
    slideWithGradientBg1,
    slideWithGradientBg2,
    slideWithImageBg1, slideWithImageBg2,
    slideWithSolidBg2
} from "./__tests__/slide/slideTestStorage.js";
import type {BaseSlideObject} from "./types/objects.ts";
import type {TextObjectProps} from "./actions/objects.ts";

type AppState = {
    isDarkMode: boolean,
}

function getDefaultBaseObject(): BaseSlideObject {
    return {
        id: generateId(),
        position: {
            x: 200,
            y: 150
        },
        size: {
            width: 300,
            height: 200
        }
    }
}

function getDefaultTextObjectProps(): TextObjectProps {
    return {
        fontColor: "#000000",
        fontFamily: "Arial",
        fontSize: 34,
        text: "New Text",
        type: "text"
    }
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
    getDefaultBaseObject,
    getDefaultTextObjectProps,
    createTestPresentation,
    getTestAppState
}