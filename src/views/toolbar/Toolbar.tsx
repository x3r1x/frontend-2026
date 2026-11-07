import style from "./Toolbar.module.css"
import {PATH_CONSTANTS, TEXT_CONSTANTS} from "../../AppConstants.js";
import {onAddImageClick, onAddSlide, onAddTextClick, onRemoveObjects, onRemoveSlides} from "./ToolbarActions.js";
import type {Presentation} from "../../types/presentation.js";
import Button from "../../components/general/button/Button.js";
import {useState} from "react";
import useTheme from "../../utils/themeContext/useTheme.tsx";
import {getSlideById} from "../../actions/slide.ts";
import useImageLoader from "../../utils/useImageLoader.tsx";
import BackgroundPicker from "../../components/toolbar/backgroundPicker/BackgroundPicker.tsx";

type ToolbarProps = {
    domainState: Presentation
    selectedSlideIds: string[],
    selectedObjectIds: string[],
    clearObjectSelection: () => void,
    clearFullSelection: () => void
}

type ToolbarOptions = "mouse" | "change background";

function Toolbar(props: ToolbarProps) {
    const [toolbarOption, setToolbarOption] = useState<ToolbarOptions>("mouse")
    const {theme} = useTheme()
    const {inputRef, onLoaderButtonClick, onFileChange} = useImageLoader((newSrc: string) => {
        if (props.selectedSlideIds.length === 0) {
            return;
        }

        onAddImageClick(getSlideById(props.domainState.slideCollection, props.selectedSlideIds[0]), newSrc)
    })

    const containerThemeClassName = theme === "light"
        ? style.containerLight
        : style.containerDark

    return (
        <div className={style.container + " " + containerThemeClassName}>
            <input
                style={{display: "none"}}
                ref={inputRef}
                type={"file"}
                accept={"image/"}
                onChange={onFileChange}
            />
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
                onClick={() => onRemoveSlides(props.selectedSlideIds, props.clearFullSelection)}
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
                    props.selectedSlideIds.length === 0
                        ? "disabled"
                        : "default"
                }
                onClick={() => {
                    if (props.selectedSlideIds.length !== 0) {
                        onAddTextClick(getSlideById(props.domainState.slideCollection, props.selectedSlideIds[0]))
                    }
                }}
            />
            <Button
                text={TEXT_CONSTANTS.ADD_NEW_IMAGE_TEXT}
                imageSrc={PATH_CONSTANTS.PLUS_IMAGE_SRC}
                mode={
                    props.selectedSlideIds.length === 0
                        ? "disabled"
                        : "default"
                }
                onClick={onLoaderButtonClick}
            />

            <BackgroundPicker
                mode={
                    props.selectedSlideIds.length !== 0
                        ? toolbarOption === "change background"
                            ? "selected"
                            : "default"
                        : "disabled"
                }
                onButtonClick={() => {
                    if (props.selectedSlideIds.length !== 0) {
                        setToolbarOption("change background")
                    }
                }}
                slideBackground={
                    props.selectedSlideIds.length !== 0
                        ? getSlideById(props.domainState.slideCollection, props.selectedSlideIds[0]).background
                        : undefined
                }
                slideId={
                    props.selectedSlideIds.length !== 0
                        ? props.selectedSlideIds[0]
                        : undefined
                }
            />


            <Button
                imageSrc={PATH_CONSTANTS.TRASH_ICON_SRC}
                mode={
                    props.selectedObjectIds.length === 0
                        ? "disabled"
                        : "default"
                }
                onClick={() => onRemoveObjects(props.selectedSlideIds[0], props.selectedObjectIds, props.clearObjectSelection)}
            />
        </div>
    )
}

export default Toolbar;