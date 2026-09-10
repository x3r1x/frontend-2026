import {Coordinates, ImageObject, ObjectSize, TextObject} from "../../types/objects.js";
import {generateId} from "../../actions/presentation.js";

const newObjectId = generateId()
const newObjectCoordinates: Coordinates = {
    x: 0.23,
    y: -1.24
}
const newObjectSize: ObjectSize = {
    width: 234,
    height: 211
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
        width: 21.124,
        height: 124.231
    },
    text: "ALL MY FELLAS",
    fontFamily: "Times New Roman",
    fontSize: 17.5,
    fontColor: "#321456",
    type: "text"
}

const textObject2: TextObject = {
    id: generateId(),
    position: {
        x: 613.75,
        y: 314
    },
    size: {
        width: 0,
        height: 0
    },
    text: "The betrayal... loses the lead.",
    fontFamily: "Time",
    fontSize: 512,
    fontColor: "#ABCDE1",
    type: "text"
}

const textObject3: TextObject = {
    id: generateId(),
    position: {
        x: 254.2461,
        y: 678.23
    },
    size: {
        width: 32452,
        height: 1246.23
    },
    text: "HEART AFIRE!🎵",
    fontFamily: "Time",
    fontSize: 1.1,
    fontColor: "#123456",
    type: "text"
}

const imageObject1: ImageObject = {
    id: generateId(),
    position: {
        x: 12.453,
        y: -12.321
    },
    size: {
        width: 510,
        height: 321
    },
    src: "https://somerandomurl.su",
    type: "image"
}

const imageObject2: ImageObject = {
    id: generateId(),
    position: {
        x: 5124,
        y: 324.14
    },
    size: {
        width: 6000,
        height: 1
    },
    src: "https://vk.ru",
    type: "image"
}

const imageObject3: ImageObject = {
    id: generateId(),
    position: {
        x: 0.5,
        y: 0.25
    },
    size: {
        width: 0.25,
        height: 0.5
    },
    src: "https://yandex.ru",
    type: "image"
}

function getNewTextObject(): TextObject {
    return {
        fontColor: newTextFontColor,
        fontFamily: newTextFontFamily,
        fontSize: newTextFontSize,
        id: newObjectId,
        position: newObjectCoordinates,
        size: newObjectSize,
        text: newTextContent,
        type: "text"
    }
}

function getNewImageObject(): ImageObject {
    return {
        id: newObjectId,
        position: newObjectCoordinates,
        size: newObjectSize,
        src: newImageSrc,
        type: "image"
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