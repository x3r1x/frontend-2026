import {useEffect, useState} from "react";
import {dispatch, getState} from "../editor.ts";
import {getSlideById, removeSlides, slideActionContainer} from "../actions/slide.ts";
import {removeObjects} from "../actions/objects.ts";

const useSelection = () => {
    const [selectedSlideIds, setSelectedSlideIds] = useState<string[]>([]);
    const [selectedObjectIds, setSelectedObjectIds] = useState<string[]>([]);
    const [isMultipleSelection, setIsMultipleSelection] = useState<boolean>(false)

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
                    setSelectedObjectIds([])
                } else if (selectedSlideIds.length !== 0) {
                    dispatch(removeSlides, {slideIds: selectedSlideIds})
                    setSelectedSlideIds([])
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

    return {selectedSlideIds, setSelectedSlideIds, selectedObjectIds, setSelectedObjectIds, isMultipleSelection}
}

export default useSelection;