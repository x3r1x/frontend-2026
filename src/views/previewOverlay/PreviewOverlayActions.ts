import {getAppState, setAppState} from "../../editor.js";
import type {AppState} from "../../data.js";

const onClose = () => {
    const currentAppState = getAppState()!
    const newAppState: AppState = {
        ...currentAppState,
        previewMode: false
    }

    setAppState(newAppState)
};

const onPreviousSlideClick = () => {
    const currentAppState = getAppState()!

    if (currentAppState.previewSlide > 0) {
        const newAppState: AppState = {
            ...currentAppState,
            previewSlide: currentAppState.previewSlide - 1
        }

        setAppState(newAppState)
    }
};

const onNextSlideClick = (slidesTotal: number) => {
    const currentAppState = getAppState()!

    if (currentAppState.previewSlide < slidesTotal - 1) {
        const newAppState: AppState = {
            ...currentAppState,
            previewSlide: currentAppState.previewSlide + 1
        }

        setAppState(newAppState)
    }
};

export {
    onClose,
    onPreviousSlideClick,
    onNextSlideClick
}