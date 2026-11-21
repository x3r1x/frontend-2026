import {useEffect, useState} from "react";
import {useAppDispatch} from "./useAppDispatch.tsx";
import {removeObjects, removeSlides} from "../store/slices/presentationSlice.ts";

const useSelection = () => {
    const [selectedSlideIds, setSelectedSlideIds] = useState<string[]>([]);
    const [selectedObjectIds, setSelectedObjectIds] = useState<string[]>([]);
    const [isMultipleSelection, setIsMultipleSelection] = useState<boolean>(false)
    const dispatch = useAppDispatch();

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

            if (event.key === "Delete") {
                if (selectedObjectIds.length !== 0 && selectedSlideIds.length !== 0) {
                    dispatch(removeObjects({slideId: selectedSlideIds[0], objectIds: selectedObjectIds}))
                    clearObjectSelection()
                } else if (selectedSlideIds.length !== 0) {
                    dispatch(removeSlides({slideIds: selectedSlideIds}))
                    clearFullSelection()
                }
            }
        }

        document.addEventListener("keydown", onKeyboardClick)

        return () => {
            document.removeEventListener("keydown", onKeyboardClick)
        }
    }, [dispatch, selectedObjectIds, selectedSlideIds]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Shift") {
                setIsMultipleSelection(true)
            }
        }

        const onKeyUp = (event: KeyboardEvent) => {
            if (event.key === "Shift") {
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