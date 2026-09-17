import type {Presentation} from "../types/presentation";

function generateId(): string {
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${randomPart}`;
}

function createPresentation(name: string, id: string): Presentation {
    return {
        id: id,
        name: name,
        slideCollection: []
    }
}

function updatePresentationName(presentation: Presentation, name: string): Presentation {
    return {
        ...presentation,
        name: name
    }
}

function savePresentation(presentation: Presentation): string {
    return JSON.stringify(presentation)
}

function loadPresentation(json: string): Presentation {
    return JSON.parse(json)
}

export {
    generateId,
    createPresentation,
    updatePresentationName,
    savePresentation,
    loadPresentation
}