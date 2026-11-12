import type {Presentation} from "./types/presentation.js"

type Modifier<P = any> = (model: Presentation, params: P) => Presentation;

let past: Presentation[] = [];
let future: Presentation[] = [];

const editorChangeHandlers: (() => void)[] = [];
let currentPresentation: Presentation | null = null;

function setInitialState(presentation: Presentation) {
    currentPresentation = presentation
    past = []
    future = []
}

function getState(): Presentation | null {
    return currentPresentation
}

function addEditorChangeHandler(handler: () => void) {
    editorChangeHandlers.push(handler)

    return () => {
        editorChangeHandlers.filter(arrayHandler => arrayHandler !== handler)
    }
}

function callChangeHandlers() {
    editorChangeHandlers.forEach(handler => handler());
}

function dispatch(modifier: Modifier, params: any = null): void {
    if (!currentPresentation) {
        console.error("State is not initialized!")
        return
    }

    past = [...past, currentPresentation]
    future = [];

    currentPresentation = modifier(currentPresentation, params)

    callChangeHandlers()
}

function undo(): void {
    if (past.length === 0 || !currentPresentation) {
        return
    }
    future = [currentPresentation, ...future]
    const previous = past[past.length - 1]
    past = past.slice(0, -1)
    currentPresentation = previous
    callChangeHandlers()
}

function redo(): void {
    if (future.length === 0 || !currentPresentation) {
        return
    }
    past = [...past, currentPresentation]
    const next = future[0]
    future = future.slice(1)
    currentPresentation = next
    callChangeHandlers()
}

function getCanUndo(): boolean { return past.length > 0; }

function getCanRedo(): boolean { return future.length > 0; }

export {
    setInitialState,
    getState,
    addEditorChangeHandler,
    dispatch,
    undo,
    redo,
    getCanUndo,
    getCanRedo,
}
