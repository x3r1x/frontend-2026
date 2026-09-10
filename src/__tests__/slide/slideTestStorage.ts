import {Slide, SolidBackground} from "../../types/slide.js";
import {generateId} from "../../actions/presentation.js";
import {
    imageObject1,
    imageObject2,
    imageObject3,
    textObject1,
    textObject2,
    textObject3
} from "../objects/objectsTestStorage.js";

const newSlideId = generateId()
const newSlideName = "Some name, idk what else to say"

const slideWithSolidBg1: Slide = {
    id: generateId(),
    name: "Are you gay?",
    background: {
        color: "#34A98F",
        type: "solid"
    },
    objects: [imageObject2, textObject3, textObject1, imageObject2, imageObject1]
}

const slideWithImageBg1: Slide = {
    id: generateId(),
    name: "You are gay!",
    background: {
        src: "She knows...",
        type: "image"
    },
    objects: [textObject1, imageObject1, imageObject3, textObject3]
}

const slideWithGradientBg1: Slide = {
    id: generateId(),
    name: "SIIIIIKE! THAT'S THE WROOOONG NUMBER!",
    background: {
        colors: ["#FFFFFF", "#ABCDEF", "#1243A1", "#8BCED1"],
        angle: 1.23,
        type: "gradient"
    },
    objects: [imageObject3, textObject3, textObject1, imageObject2, imageObject1]
}

const slideWithSolidBg2: Slide = {
    id: generateId(),
    name: "Gleb Ryzhov",
    background: {
        color: "#235ABC",
        type: "solid"
    },
    objects: [imageObject2]
}

const slideWithImageBg2: Slide = {
    id: generateId(),
    name: "And Dima Chizhov",
    background: {
        src: "some/random/url",
        type: "image"
    },
    objects: [textObject3, imageObject3, imageObject1, textObject2]
}

const slideWithGradientBg2: Slide = {
    id: generateId(),
    name: "They are the best in this!",
    background: {
        colors: ["#AD12CB", "2591A5"],
        angle: -0.05,
        type: "gradient"
    },
    objects: [imageObject1, imageObject2, textObject3, textObject1]
}

function getEmptyBackground(): SolidBackground {
    return {
        color: "#FFFFFF",
        type: "solid"
    }
}

export {
    newSlideId,
    newSlideName,
    slideWithSolidBg1,
    slideWithImageBg1,
    slideWithGradientBg1,
    slideWithSolidBg2,
    slideWithGradientBg2,
    slideWithImageBg2,
    getEmptyBackground
}