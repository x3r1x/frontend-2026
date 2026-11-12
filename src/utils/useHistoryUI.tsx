import {useCallback, useEffect, useState} from "react";
import {addEditorChangeHandler, getCanRedo, getCanUndo, redo, undo} from "../editor.ts";

type HistoryUI = {
    canUndo: boolean
    canRedo: boolean
    onUndo: () => void
    onRedo: () => void
}

function useHistoryUI(): HistoryUI {
    const [canUndo, setCanUndo] = useState(getCanUndo());
    const [canRedo, setCanRedo] = useState(getCanRedo());

    useEffect(() => {
        const sync = () => {
            setCanUndo(getCanUndo())
            setCanRedo(getCanRedo())
        };

        return addEditorChangeHandler(sync)
    }, []);

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
    return { canUndo, canRedo, onUndo, onRedo }
}

export default useHistoryUI