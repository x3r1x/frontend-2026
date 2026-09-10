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
    type: "solid";
}

type ImageBackground = {
    src: string;
    type: "image";
}

type GradientBackground = {
    colors: string[];
    angle: number;
    type: "gradient";
}

export {
    type Slide,
    type Background,
    type SolidBackground,
    type ImageBackground,
    type GradientBackground
}