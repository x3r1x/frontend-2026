import style from "./AppIcon.module.css"
import {PATH_CONSTANTS} from "../../../AppConstants.js";

function AppIcon() {
    return (
        <img alt={""} className={style.container} src={PATH_CONSTANTS.APP_ICON_SRC}/>
    )
}

export default AppIcon;