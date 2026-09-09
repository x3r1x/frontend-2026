import {Presentation} from "../../types/presentation.js";
import {generateId} from "../../actions/presentation.js";
import {slideWithGradientBg1, slideWithImageBg1, slideWithSolidBg1} from "../slide/slideTestStorage.js";

const presentationId = generateId()
const newPresentationName = "We are all under the circumstances"

function getOldPresentation(): Presentation {
    return {
        id: presentationId,
        name: "I am my own's story director",
        slideCollection: [slideWithGradientBg1, slideWithImageBg1, slideWithSolidBg1]
    }
}

function getEmptyPresentation(): Presentation {
    return {
        id: "",
        name: "",
        slideCollection: []
    }
}

function getChangedNamePresentation(): Presentation {
    return {
        id: presentationId,
        name: newPresentationName,
        slideCollection: [slideWithGradientBg1, slideWithImageBg1, slideWithSolidBg1]
    }
}

export {
    newPresentationName,
    getOldPresentation,
    getEmptyPresentation,
    getChangedNamePresentation
}
