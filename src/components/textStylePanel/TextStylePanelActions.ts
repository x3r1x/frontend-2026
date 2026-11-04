import type {Slide} from "../../types/slide.ts";
import {type TextObjectProps, updateTextObjectStyle} from "../../actions/objects.ts";
import type {TextObject} from "../../types/objects.ts";
import {dispatch} from "../../editor.ts";
import {slideActionContainer} from "../../actions/slide.ts";

function onTextObjectParamChange(slide: Slide, object: TextObject, fontFamily: string, fontColor: string, fontSize: number) {
    const props: TextObjectProps = {
        text: object.text,
        fontColor: fontColor,
        fontFamily: fontFamily,
        fontSize: fontSize,
        type: "text"
    }

    const newSlide = updateTextObjectStyle(slide, object.id, props);
    dispatch(slideActionContainer, {slideId: slide.id, newSlide: newSlide})
}

export {
    onTextObjectParamChange
}