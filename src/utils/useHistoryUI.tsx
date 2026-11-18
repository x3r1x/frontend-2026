import {useCallback, useEffect} from "react";
import {useSelector} from "react-redux";
import type {RootState} from "../store";
import {redo, undo} from "../store/slices/historySlice.ts";

type HistoryUI = {
    canUndo: boolean
    canRedo: boolean
    onUndo: () => void
    onRedo: () => void
}

function useHistoryUI(): HistoryUI {
    const state = useSelector((state: RootState) => state.history)

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.code === "KeyZ") {
                undo()
            }

            if (event.ctrlKey && event.code === "KeyY") {
                redo()
            }
        }

        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown)
        }
    }, [])

    const onUndo = useCallback(() => {
        undo()
    }, [])

    const onRedo = useCallback(() => {
        redo()
    }, [])

    return { canUndo: state.canUndo, canRedo: state.canRedo, onUndo, onRedo }
}

export default useHistoryUI