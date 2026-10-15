import type {Presentation} from "./types/presentation.js"
import type {AppState} from "./data.js";

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

let currentAppState: AppState | null = null

function setInitialAppState(state: AppState): void {
    currentAppState = state
}

function getAppState(): AppState | null {
    return currentAppState
}

function setAppState(newAppState: AppState): void {
    if (!currentAppState) {
        console.error("App state not initialised!")
        return
    }

    currentAppState = newAppState

    if (editorChangeHandler) {
        editorChangeHandler()
    }
}

export {
    setInitialState,
    getState,
    addEditorChangeHandler,
    dispatch,
    setInitialAppState,
    setAppState,
    getAppState,
}
