import {useEffect, useState} from "react";
import {dispatch, getState} from "../editor.ts";
import {getSlideById, removeSlides, slideActionContainer} from "../actions/slide.ts";
import {removeObjects} from "../actions/objects.ts";

const useSelection = () => {
    const [selectedSlideIds, setSelectedSlideIds] = useState<string[]>([]);
    const [selectedObjectIds, setSelectedObjectIds] = useState<string[]>([]);
    const [isMultipleSelection, setIsMultipleSelection] = useState<boolean>(false)

    const onObjectClick = (objectId: string) => {
        if (isMultipleSelection) {
            setSelectedObjectIds([...selectedObjectIds, objectId])
        }

        if (!isMultipleSelection) {
            setSelectedObjectIds([objectId])
        }
    }

    const onSlideViewClick = (slideId: string) => {
        if (isMultipleSelection) {
            setSelectedSlideIds([...selectedSlideIds, slideId])
        }

        if (!isMultipleSelection) {
            setSelectedSlideIds([slideId])
            setSelectedObjectIds([])
        }
    }

    const clearFullSelection = () => {
        setSelectedObjectIds([])
        setSelectedSlideIds([])
    }

    const clearObjectSelection = () => {
        setSelectedObjectIds([])
    }

    useEffect(() => {
        const onKeyboardClick = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                if (selectedObjectIds.length !== 0) {
                    setSelectedObjectIds([]);
                } else {
                    setSelectedSlideIds([]);
                }
            }

            if (event.key === "Backspace" || event.key === "Delete") {
                if (selectedObjectIds.length !== 0) {
                    const state = getState()!;
                    const currentSlide = getSlideById(state.slideCollection, selectedSlideIds[0]);

                    const newSlide = removeObjects(currentSlide, {objectIds: selectedObjectIds})
                    dispatch(slideActionContainer, {slideId: currentSlide.id, newSlide: newSlide})
                    clearObjectSelection()
                } else if (selectedSlideIds.length !== 0) {
                    dispatch(removeSlides, {slideIds: selectedSlideIds})
                    clearFullSelection()
                }
            }
        }

        document.addEventListener("keydown", onKeyboardClick)

        return () => {
            document.removeEventListener("keydown", onKeyboardClick)
        }
    }, [selectedObjectIds, selectedSlideIds]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Control" || event.key === "Shift") {
                setIsMultipleSelection(true)
            }
        }

        const onKeyUp = (event: KeyboardEvent) => {
            if (event.key === "Control" || event.key === "Shift") {
                setIsMultipleSelection(false)
            }
        }

        document.addEventListener("keydown", onKeyDown)
        document.addEventListener("keyup", onKeyUp)

        return () => {
            document.removeEventListener("keydown", onKeyDown)
            document.removeEventListener("keyup", onKeyUp)
        }
    }, []);

    return {selectedSlideIds, selectedObjectIds, onObjectClick, onSlideViewClick, clearObjectSelection, clearFullSelection}
}

export default useSelection;