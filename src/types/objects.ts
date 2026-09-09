type SlideObject = TextObject | ImageObject;

type Coordinates = {
    x: number;
    y: number;
}

type Vector = {
    dx: number,
    dy: number
}

type BaseSlideObject = {
    id: string;
    position: Coordinates;
    size: Vector;
    type: "Text" | "Image"
}

type TextObject = BaseSlideObject & {
    text: string;
    fontFamily: string;
    fontSize: number;
    color: string;
    type: "Text";
};

type ImageObject = BaseSlideObject & {
    src: string;
    type: "Image";
};

export {
    type SlideObject,
    type Coordinates,
    type Vector,
    type TextObject,
    type ImageObject
}