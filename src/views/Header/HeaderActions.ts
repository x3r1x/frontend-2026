import {dispatch, setPreviewMode} from "../../editor.js";
import {updatePresentationName} from "../../actions/presentation.js";

const onPresentationNameChange= (newName: string) => dispatch(updatePresentationName, {name: newName})
const onPreviewClick = () => {
    setPreviewMode(true);
}
const onExportClick = () => {}

export {
    onPresentationNameChange,
    onPreviewClick,
    onExportClick
}