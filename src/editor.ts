import type {Presentation} from "./types/presentation.js"

type Modifier<P = any> = (model: Presentation, params: P) => Presentation;

let editorChangeHandler: (() => void) | null = null;
let currentPresentation: Presentation | null = null;

function setInitialState(presentation: Presentation) {
    currentPresentation = presentation
}

function getState(): Presentation | null {
    return currentPresentation
}

function addEditorChangeHandler(handler: () => void) {
    editorChangeHandler = handler
}

function dispatch(modifier: Modifier, params: any = null): void {
    if (!currentPresentation) {
        console.error("State is not initialized!")
        return
    }

    currentPresentation = modifier(currentPresentation, params)

    if (editorChangeHandler) {
        editorChangeHandler()
    }
}

let isPreviewMode = false;
let currentPreviewSlide = 0;

function setPreviewMode(mode: boolean): void {
    isPreviewMode = mode;
    if (!mode) {
        currentPreviewSlide = 0;
    }
    if (editorChangeHandler) {
        editorChangeHandler();
    }
}

function getPreviewMode(): boolean {
    return isPreviewMode;
}

function setPreviewSlide(slideIndex: number): void {
    currentPreviewSlide = slideIndex;
    if (editorChangeHandler) {
        editorChangeHandler();
    }
}

function getPreviewSlide(): number {
    return currentPreviewSlide;
}
export {
    setInitialState,
    getState,
    addEditorChangeHandler,
    dispatch,
    setPreviewMode,
    getPreviewMode,
    setPreviewSlide,
    getPreviewSlide
}
