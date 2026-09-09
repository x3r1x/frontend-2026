import {describe, expect, it} from "vitest";
import {
    createPresentation,
    generateId,
    loadPresentation,
    savePresentation,
    updatePresentationName
} from "../../actions/presentation.js";
import {getChangedNamePresentation, getOldPresentation, newPresentationName} from "./presentationTestStorage.js";

describe("createPresentation", () => {
    it("creates an empty presentation", () => {
        const presentationName = "Hello, world!"
        const presentationId = generateId()
        const presentation = createPresentation(presentationName, presentationId);

        expect(presentation.name).toEqual(presentationName)
        expect(presentation.id).toEqual(presentationId)
        expect(presentation.slideCollection.length).toEqual(0)
    })
})

describe("updatePresentationName", () => {
    it("changes presentation name", () => {
        const oldPresentation = getOldPresentation()
        const oldPresentationCopy = structuredClone(oldPresentation)

        const changedPresentation = updatePresentationName(oldPresentation, newPresentationName)
        const expectedPresentation = getChangedNamePresentation()

        expect(changedPresentation).toEqual(expectedPresentation)
        expect(oldPresentation).toEqual(oldPresentationCopy)
    })
})

describe("savePresentation & loadPresentation", () => {
    it("get the same input as output", () => {
        const oldPresentation = getOldPresentation()
        const oldPresentationCopy = structuredClone(oldPresentation)
        const savedPresentation = savePresentation(oldPresentation)
        const loadedPresentation = loadPresentation(savedPresentation)

        expect(loadedPresentation).toEqual(oldPresentation)
        expect(oldPresentation).toEqual(oldPresentationCopy)
    })
})