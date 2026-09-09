import {Coordinates, ImageObject, TextObject, Vector} from "../../types/objects.js";
import {generateId} from "../../actions/presentation.js";

const newObjectId = generateId()
const newObjectCoordinates: Coordinates = {
    x: 0.23,
    y: -1.24
}
const newObjectSize: Vector = {
    dx: 234,
    dy: 211
}

const newTextContent = "My content"
const newTextFontFamily = "Roboto"
const newTextFontSize = 14
const newTextFontColor = "#000000"

const newImageSrc = "ws://localhost:8080/"

const textObject1: TextObject = {
    id: generateId(),
    position: {
        x: 23,
        y: -124.5634
    },
    size: {
        dx: 21.124,
        dy: 124.231
    },
    text: "ALL MY FELLAS",
    fontFamily: "Times New Roman",
    fontSize: 17.5,
    color: "#321456",
    type: "Text"
}

const textObject2: TextObject = {
    id: generateId(),
    position: {
        x: 613.75,
        y: 314
    },
    size: {
        dx: 0,
        dy: 0
    },
    text: "The betrayal... loses the lead.",
    fontFamily: "Time",
    fontSize: 512,
    color: "#ABCDE1",
    type: "Text"
}

const textObject3: TextObject = {
    id: generateId(),
    position: {
        x: 254.2461,
        y: 678.23
    },
    size: {
        dx: 32452,
        dy: 1246.23
    },
    text: "HEART AFIRE!🎵",
    fontFamily: "Time",
    fontSize: 1.1,
    color: "#123456",
    type: "Text"
}

const imageObject1: ImageObject = {
    id: generateId(),
    position: {
        x: 12.453,
        y: -12.321
    },
    size: {
        dx: 510,
        dy: 321
    },
    src: "https://somerandomurl.su",
    type: "Image"
}

const imageObject2: ImageObject = {
    id: generateId(),
    position: {
        x: 5124,
        y: 324.14
    },
    size: {
        dx: 6000,
        dy: 1
    },
    src: "https://vk.ru",
    type: "Image"
}

const imageObject3: ImageObject = {
    id: generateId(),
    position: {
        x: 0.5,
        y: 0.25
    },
    size: {
        dx: 0.25,
        dy: 0.5
    },
    src: "https://yandex.ru",
    type: "Image"
}

function getNewTextObject(): TextObject {
    return {
        color: newTextFontColor,
        fontFamily: newTextFontFamily,
        fontSize: newTextFontSize,
        id: newObjectId,
        position: newObjectCoordinates,
        size: newObjectSize,
        text: newTextContent,
        type: "Text"
    }
}

function getNewImageObject(): ImageObject {
    return {
        id: newObjectId,
        position: newObjectCoordinates,
        size: newObjectSize,
        src: newImageSrc,
        type: "Image"
    }
}

export {
    newObjectId,
    newTextContent,
    newObjectSize,
    newObjectCoordinates,
    newTextFontFamily,
    newTextFontSize,
    newTextFontColor,
    newImageSrc,
    textObject1,
    textObject2,
    textObject3,
    imageObject1,
    imageObject2,
    imageObject3,
    getNewTextObject,
    getNewImageObject
}