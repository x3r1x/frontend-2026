import type {SlideObject} from "./objects.js";

type Slide = {
    id: string;
    name: string;
    background: Background;
    objects: SlideObject[];
}

type Background = SolidBackground | ImageBackground | GradientBackground;

type SolidBackground = {
    color: string;
    type: "Solid";
}

type ImageBackground = {
    src: string;
    type: "Image";
}

type GradientBackground = {
    colors: string[];
    angle: number;
    type: "Gradient";
}

export {
    type Slide,
    type Background,
    type SolidBackground,
    type ImageBackground,
    type GradientBackground
}