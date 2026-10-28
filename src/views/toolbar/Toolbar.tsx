import style from "./Toolbar.module.css"
import {PATH_CONSTANTS, TEXT_CONSTANTS} from "../../AppConstants.js";
import {onAddSlide, onRemoveObjects, onRemoveSlides} from "./ToolbarActions.js";
import type {Presentation} from "../../types/presentation.js";
import {getSlideById} from "../../actions/slide.js";
import Button from "../../components/general/button/Button.js";
import * as React from "react";
import {useState} from "react";
import useTheme from "../../utils/ThemeContext/useTheme.tsx";

type ToolbarProps = {
    domainState: Presentation
    selectedSlideIds: string[],
    selectedObjectIds: string[],
    setSelectedSlideIds: React.Dispatch<React.SetStateAction<string[]>>
    setSelectedObjectIds: React.Dispatch<React.SetStateAction<string[]>>
}

type ToolbarOptions = "mouse" | "add text" | "add image" | "change background";

function Toolbar(props: ToolbarProps) {
    const [toolbarOption, setToolbarOption] = useState<ToolbarOptions>("mouse")
    const {theme} = useTheme()

    const containerThemeClassName = theme === "light"
        ? style.containerLight
        : style.containerDark

    return (
        <div className={style.container + " " + containerThemeClassName}>
            <Button
                text={TEXT_CONSTANTS.NEW_SLIDE_TEXT}
                imageSrc={PATH_CONSTANTS.PLUS_IMAGE_SRC}
                onClick={onAddSlide}
            />
            <Button
                imageSrc={PATH_CONSTANTS.TRASH_ICON_SRC}
                mode={
                    props.selectedSlideIds.length === 0
                        ? "disabled"
                        : "default"
                }
                onClick={() => onRemoveSlides(props.selectedSlideIds, props.setSelectedSlideIds, props.setSelectedObjectIds)}
            />

            <div className={style.spacer}/>

            <Button
                imageSrc={PATH_CONSTANTS.MOUSE_ICON_SRC}
                mode={
                    toolbarOption === "mouse"
                        ? "selected"
                        : "default"
                }
                onClick={() => setToolbarOption("mouse")}
            />
            <Button
                text={TEXT_CONSTANTS.ADD_NEW_TEXT_TEXT}
                imageSrc={PATH_CONSTANTS.PLUS_IMAGE_SRC}
                mode={
                    toolbarOption === "add text"
                        ? "selected"
                        : "default"
                }
                onClick={() => setToolbarOption("add text")}
            />
            <Button
                text={TEXT_CONSTANTS.ADD_NEW_IMAGE_TEXT}
                imageSrc={PATH_CONSTANTS.PLUS_IMAGE_SRC}
                mode={
                    toolbarOption === "add image"
                        ? "selected"
                        : "default"
                }
                onClick={() => setToolbarOption("add image")}
            />

            <Button
                text={TEXT_CONSTANTS.CHANGE_BACKGROUND_TEXT}
                imageSrc={PATH_CONSTANTS.BACKGROUND_ICON_SRC}
                mode={
                    toolbarOption === "change background"
                        ? "selected"
                        : "default"
                }
                onClick={() => setToolbarOption("change background")}
            />

            <Button
                imageSrc={PATH_CONSTANTS.TRASH_ICON_SRC}
                mode={
                    props.selectedObjectIds.length === 0
                        ? "disabled"
                        : "default"
                }
                onClick={() => onRemoveObjects(
                    getSlideById(props.domainState.slideCollection, props.selectedSlideIds[0]),
                    props.selectedObjectIds,
                    props.setSelectedObjectIds
                )}
            />
        </div>
    )
}

export default Toolbar;