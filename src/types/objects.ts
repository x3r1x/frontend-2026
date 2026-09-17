type SlideObject = TextObject | ImageObject;

type Coordinates = {
    x: number;
    y: number;
}

type Vector = {
    dx: number,
    dy: number
}

type ObjectSize = {
    width: number
    height: number
}

type BaseSlideObject = {
    id: string;
    position: Coordinates;
    size: ObjectSize;
}

type TextObject = BaseSlideObject & {
    text: string;
    fontFamily: string;
    fontSize: number;
    fontColor: string;
    type: "text";
}

type ImageObject = BaseSlideObject & {
    src: string;
    type: "image";
}

export {
    type SlideObject,
    type Coordinates,
    type Vector,
    type ObjectSize,
    type BaseSlideObject,
    type TextObject,
    type ImageObject
}