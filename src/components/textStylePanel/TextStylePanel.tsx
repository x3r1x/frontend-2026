import style from "./TextStylePanel.module.css"
import textInputStyle from "../general/textInput/TextInput.module.css"
import type {Slide} from "../../types/slide.ts";
import {getObjectById} from "../../actions/objects.ts";
import {useEffect, useState} from "react";
import TextInput from "../general/textInput/TextInput.tsx";
import useTheme from "../../utils/themeContext/useTheme.tsx";
import {onTextObjectParamChange} from "./TextStylePanelActions.ts";

type TextStylePanelProps = {
    slide: Slide,
    objectId: string
}

type TextObjectProps = {
    fontFamily: string,
    fontSize: number,
    fontColor: string
}

function TextStylePanel(props: TextStylePanelProps) {
    const object = getObjectById(props.slide.objects, props.objectId)
    const [textObjectProps, setTextObjectProps] = useState<TextObjectProps>({
        fontFamily: "",
        fontColor: "",
        fontSize: 0
    })
    const {theme} = useTheme();

    useEffect(() => {
        if (object.type !== "text") {
            return;
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTextObjectProps({
            fontFamily: object.fontFamily,
            fontSize: object.fontSize,
            fontColor: object.fontColor
        })
    }, [object]);

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

                            onTextObjectParamChange(
                                props.slide,
                                object,
                                textObjectProps.fontFamily,
                                textObjectProps.fontColor,
                                textObjectProps.fontSize + 1
                            )
                        }}
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

                            onTextObjectParamChange(
                                props.slide,
                                object,
                                textObjectProps.fontFamily,
                                textObjectProps.fontColor,
                                textObjectProps.fontSize - 1
                            )
                        }}
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

                        onTextObjectParamChange(
                            props.slide,
                            object,
                            textObjectProps.fontFamily,
                            event.target.value,
                            textObjectProps.fontSize
                        )
                    }}
                />
            </div>
        </div>
    )
}

export default TextStylePanel