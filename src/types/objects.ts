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

type TextObjectProps = {
    text: string;
    fontFamily: string;
    fontSize: number;
    fontColor: string;
    type: "text";
}

type TextObject = BaseSlideObject & TextObjectProps

type ImageObjectProps = {
    src: string;
    type: "image";
}

type SlideObjectProps = TextObjectProps | ImageObjectProps

type ImageObject = BaseSlideObject & ImageObjectProps

export {
    type SlideObject,
    type Coordinates,
    type Vector,
    type ObjectSize,
    type BaseSlideObject,
    type TextObjectProps,
    type ImageObjectProps,
    type SlideObjectProps,
    type TextObject,
    type ImageObject
}