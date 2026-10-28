import {dispatch} from "../../editor.js";
import {updatePresentationName} from "../../actions/presentation.js";

const onPresentationNameChange= (newName: string) => dispatch(updatePresentationName, {name: newName})
const onExportClick = () => {}

export {
    onPresentationNameChange,
    onExportClick
}