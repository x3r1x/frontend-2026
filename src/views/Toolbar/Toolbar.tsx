import style from "./Toolbar.module.css"
import Button from "../../components/Toolbar/Button/Button.js";
import {PATH_CONSTANTS, TEXT_CONSTANTS} from "../../AppConstants.js";
import type {AppState} from "../../data.js";
import {onAddSlide, onRemoveObjects, onRemoveSlides, onSlideActionButtonClick} from "./ToolbarActions.js";
import type {Presentation} from "../../types/presentation.js";
import {getSlideById} from "../../actions/slide.js";

type ToolbarProps = {
    domainState: Presentation
    appState: AppState
}

function Toolbar(props: ToolbarProps) {
    return (
        <div className={style.container}>
            <Button
                text={TEXT_CONSTANTS.NEW_SLIDE_TEXT}
                imageSrc={PATH_CONSTANTS.PLUS_IMAGE_SRC}
                onClick={onAddSlide}
            />
            <Button
                imageSrc={PATH_CONSTANTS.TRASH_ICON_SRC}
                mode={
                    props.appState.selectedSlideIds.length === 0
                        ? "disabled"
                        : "default"
                }
                onClick={() => onRemoveSlides(props.appState)}
            />

            <div className={style.spacer}/>

            <Button
                imageSrc={PATH_CONSTANTS.MOUSE_ICON_SRC}
                mode={
                    props.appState.toolbarOption === "mouse"
                        ? "selected"
                        : "default"
                }
                onClick={() => onSlideActionButtonClick("mouse")}
            />
            <Button
                text={TEXT_CONSTANTS.ADD_NEW_TEXT_TEXT}
                imageSrc={PATH_CONSTANTS.PLUS_IMAGE_SRC}
                mode={
                    props.appState.toolbarOption === "add text"
                        ? "selected"
                        : "default"
                }
                onClick={() => onSlideActionButtonClick("add text")}
            />
            <Button
                text={TEXT_CONSTANTS.ADD_NEW_IMAGE_TEXT}
                imageSrc={PATH_CONSTANTS.PLUS_IMAGE_SRC}
                mode={
                    props.appState.toolbarOption === "add image"
                        ? "selected"
                        : "default"
                }
                onClick={() => onSlideActionButtonClick("add image")}
            />

            <Button
                text={TEXT_CONSTANTS.CHANGE_BACKGROUND_TEXT}
                imageSrc={PATH_CONSTANTS.BACKGROUND_ICON_SRC}
                mode={
                    props.appState.toolbarOption === "change background"
                        ? "selected"
                        : "default"
                }
                onClick={() => onSlideActionButtonClick("change background")}
            />

            <Button
                imageSrc={PATH_CONSTANTS.TRASH_ICON_SRC}
                mode={
                    props.appState.selectedObjectIds.length === 0
                        ? "disabled"
                        : "default"
                }
                onClick={() => onRemoveObjects(
                    getSlideById(props.domainState.slideCollection, props.appState.selectedSlideIds[0]),
                    props.appState
                )}
            />
        </div>
    )
}

export default Toolbar;