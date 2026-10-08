import style from "./SlideView.module.css";
import type {Background, Slide} from "../../types/slide.js";
import SlideObjectComponent from "../../components/SlideObject/SlideObjectComponent.js";

type SlideViewProps = {
    slide: Slide,
    scale: number,
    objectsEditable: boolean,
    selectedObjectIds: string[],
    additionalStyle?: object,
}

function SlideView(props: SlideViewProps) {
    if (!props.slide) {
        return <></>
    }

    const objects = props.slide.objects.map(
        object => <SlideObjectComponent
            slideObject={object}
            isSelected={props.selectedObjectIds.includes(object.id)}
            onChange={() => {
            }}
            editable={props.objectsEditable}
            key={object.id}
            scale={props.scale}
        />
    )
    const additionalStyle = {
        height: String(1080 * props.scale) + "px"
    }

    return (
        <div className={style.container}
             style={{...props.additionalStyle, ...additionalStyle, ...getBackgroundStyle(props.slide.background)}}>
            {objects}
        </div>
    )
}

function getBackgroundStyle(background: Background) {
    switch (background.type) {
        case "image": {
            return {
                backgroundImage: "url(" + background.src + ")",
                backgroundSize: "cover"
            }
        }
        case "solid": {
            return {
                backgroundColor: background.color
            }
        }
        case "gradient": {
            return {
                background: "linear-gradient(" + background.angle + "deg, " + background.colors.join(", ") + ")"
            }
        }
        default:
            return {}
    }
}

export default SlideView;