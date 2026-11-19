import style from "./TextStylePanel.module.css"
import textInputStyle from "../general/textInput/TextInput.module.css"
import type {Slide} from "../../types/slide.ts";
import {getObjectById} from "../../actions/objects.ts";
import {useState} from "react";
import TextInput from "../general/textInput/TextInput.tsx";
import useTheme from "../../utils/themeContext/useTheme.tsx";
import {onTextObjectParamChange} from "./TextStylePanelActions.ts";

export type TextStylePreview = {
    objectId: string;
    fontFamily: string;
    fontSize: number;
    fontColor: string;
};

type TextObjectProps = {
    fontFamily: string,
    fontSize: number,
    fontColor: string
}

type TextStylePanelProps = {
    slide: Slide,
    objectId: string
    onTextPreviewChange: (newTextStylePreview: TextStylePreview) => void
}

function TextStylePanel(props: TextStylePanelProps) {
    const object = getObjectById(props.slide.objects, props.objectId)
    const [textObjectProps, setTextObjectProps] = useState<TextObjectProps>({
        fontFamily: object.type === "text" ? object.fontFamily : "",
        fontColor: object.type === "text" ? object.fontColor : "",
        fontSize: object.type === "text" ? object.fontSize : 0
    })
    const {theme} = useTheme();

    if (object.type !== "text") {
        return;
    }

    const containerThemeClassName = theme === "light"
        ? style.lightContainer
        : style.darkContainer

    const textThemeClassName = theme === "light"
        ? style.textLight
        : style.textDark

    return (
        <div className={style.container + " " + containerThemeClassName}>
            <p className={style.headerText + " " + textThemeClassName}>Text params:</p>

            <div className={style.field}>
                <p className={style.fieldText + " " + textThemeClassName}>Font</p>

                <select
                    value={textObjectProps.fontFamily}
                    onChange={event => {
                        setTextObjectProps({
                            ...textObjectProps,
                            fontFamily: event.target.value
                        })
                        props.onTextPreviewChange({
                            objectId: props.objectId,
                            ...textObjectProps,
                            fontFamily: event.target.value
                        })

                        onTextObjectParamChange(
                            props.slide,
                            object,
                            event.target.value,
                            textObjectProps.fontColor,
                            textObjectProps.fontSize
                        )
                    }}
                >
                    <option value={"Arial"}>Arial</option>
                    <option value={"Times New Roman"}>Times New Roman</option>
                    <option value={"Verdana"}>Verdana</option>
                    <option value={"Courier New"}>Courier New</option>
                </select>
            </div>

            <div className={style.field}>
                <p className={style.fieldText + " " + textThemeClassName}>Size</p>

                <div className={style.fontSizeContainer}>
                    <a
                        onClick={() => {
                            setTextObjectProps({
                                ...textObjectProps,
                                fontSize: textObjectProps.fontSize + 1
                            })

                            props.onTextPreviewChange({
                                objectId: props.objectId,
                                ...textObjectProps,
                                fontSize: textObjectProps.fontSize + 1
                            })
                        }}
                        onMouseLeave={() => onTextObjectParamChange(
                            props.slide,
                            object,
                            textObjectProps.fontFamily,
                            textObjectProps.fontColor,
                            textObjectProps.fontSize + 1
                        )}
                        className={style.fontSizeText + " " + textThemeClassName}
                    >+</a>

                    <TextInput
                        text={textObjectProps.fontSize.toString()}
                        className={textInputStyle.textSizeParam + " " + textThemeClassName}
                        editable={true}
                        onChange={(newValue: string) => {
                            if (!isNaN(Number(newValue))) {
                                setTextObjectProps({
                                    ...textObjectProps,
                                    fontSize: Number(newValue)
                                })

                                onTextObjectParamChange(
                                    props.slide,
                                    object,
                                    textObjectProps.fontFamily,
                                    textObjectProps.fontColor,
                                    Number(newValue)
                                )
                            }
                        }}
                    />

                    <a
                        onClick={() => {
                            setTextObjectProps({
                                ...textObjectProps,
                                fontSize: textObjectProps.fontSize - 1
                            })

                            props.onTextPreviewChange({
                                objectId: props.objectId,
                                ...textObjectProps,
                                fontSize: textObjectProps.fontSize - 1
                            })
                        }}
                        onMouseLeave={() => onTextObjectParamChange(
                            props.slide,
                            object,
                            textObjectProps.fontFamily,
                            textObjectProps.fontColor,
                            textObjectProps.fontSize - 1
                        )}
                        className={style.fontSizeText + " " + textThemeClassName}
                    >---</a>
                </div>
            </div>

            <div className={style.field}>
                <p className={style.fieldText + " " + textThemeClassName}>Color</p>

                <input
                    type={"color"}
                    value={textObjectProps.fontColor}
                    onChange={event => {
                        setTextObjectProps({
                            ...textObjectProps,
                            fontColor: event.target.value
                        })

                        props.onTextPreviewChange({
                            objectId: props.objectId,
                            ...textObjectProps,
                            fontColor: event.target.value
                        })
                    }}
                    onBlur={event => onTextObjectParamChange(
                        props.slide,
                        object,
                        textObjectProps.fontFamily,
                        event.target.value,
                        textObjectProps.fontSize
                    )}
                />
            </div>
        </div>
    )
}

export default TextStylePanel