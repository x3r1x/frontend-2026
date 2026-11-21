import style from "./Toolbar.module.css"
import {PATH_CONSTANTS, TEXT_CONSTANTS} from "../../AppConstants.js";
import type {Presentation} from "../../types/presentation.js";
import Button from "../../components/general/button/Button.js";
import {useState} from "react";
import useTheme from "../../utils/themeContext/useTheme.tsx";
import {getSlideById} from "../../actions/slide.ts";
import useImageLoader from "../../utils/useImageLoader.tsx";
import BackgroundPicker from "../../components/toolbar/backgroundPicker/BackgroundPicker.tsx";
import {useAppDispatch} from "../../utils/useAppDispatch.tsx";
import {addSlide, removeSlides, addSlideObject, removeObjects} from "../../store/slices/presentationSlice.ts";
import {generateId} from "../../actions/presentation.ts";
import {getDefaultBaseObject, getDefaultTextObjectProps} from "../../data.ts";
import {type ImageObjectProps} from "../../actions/objects.ts";

type ToolbarProps = {
    domainState: Presentation
    selectedSlideIds: string[],
    selectedObjectIds: string[],
    clearObjectSelection: () => void,
    clearFullSelection: () => void
}

type ToolbarOptions = "mouse" | "change background";

function Toolbar(props: ToolbarProps) {
    const dispatch = useAppDispatch()
    const [toolbarOption, setToolbarOption] = useState<ToolbarOptions>("mouse")
    const {theme} = useTheme()

    const onAddImageClick = (src: string) => {
        if (props.selectedSlideIds.length === 0) {
            return;
        }

        const imageProps: ImageObjectProps = {
            type: "image",
            src: src
        }

        dispatch(addSlideObject({
            slideId: props.selectedSlideIds[0],
            baseObject: getDefaultBaseObject(),
            props: imageProps
        }))
    }

    const {inputRef, onLoaderButtonClick, onFileChange} = useImageLoader((newSrc: string) => {
        if (props.selectedSlideIds.length === 0) {
            return;
        }

        onAddImageClick(newSrc)
    })

    const onAddSlide = () => dispatch(addSlide({slideId: generateId()}))

    const onRemoveSlides = () => {
        dispatch(removeSlides({slideIds: props.selectedSlideIds}))
        props.clearFullSelection()
    }

    const onAddTextClick = () => {
        if (props.selectedSlideIds.length === 0) {
            return;
        }

        dispatch(addSlideObject({
            slideId: props.selectedSlideIds[0],
            baseObject: getDefaultBaseObject(),
            props: getDefaultTextObjectProps()
        }))
    }

    const onRemoveObjects = () => {
        if (props.selectedSlideIds.length === 0) {
            return;
        }

        dispatch(removeObjects({slideId: props.selectedSlideIds[0], objectIds: props.selectedObjectIds}))
        props.clearFullSelection()
    }


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
                onClick={onRemoveSlides}
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
                        onAddTextClick()
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
                onClick={onRemoveObjects}
            />
        </div>
    )
}

export default Toolbar;