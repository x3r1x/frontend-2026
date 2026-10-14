import {dispatch, getAppState, setAppState} from "../../editor.js";
import {updatePresentationName} from "../../actions/presentation.js";
import type {AppState} from "../../data.js";

const onPresentationNameChange= (newName: string) => dispatch(updatePresentationName, {name: newName})
const onPreviewClick = () => {
    const currentAppState = getAppState()!;
    const newAppState: AppState = {
        ...currentAppState,
        previewMode: true
    }

    setAppState(newAppState)
}
const onExportClick = () => {}

export {
    onPresentationNameChange,
    onPreviewClick,
    onExportClick
}