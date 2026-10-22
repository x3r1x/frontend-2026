import style from "./ThemeSwitcher.module.css"
import {TEXT_CONSTANTS} from "../../../AppConstants.js";

type ThemeSwitcherButtonProps = {
    isDarkMode: boolean
}

function ThemeSwitcherButton(props: ThemeSwitcherButtonProps) {
    return (
        <label className={style.buttonLabel}>
            <input
                className={style.buttonInput}
                type={"checkbox"}
                checked={props.isDarkMode}
            />

            <span className={style.buttonSpan}>
                {props.isDarkMode ? TEXT_CONSTANTS.THEME_DARK_TEXT : TEXT_CONSTANTS.THEME_LIGHT_TEXT}
            </span>
        </label>
    )
}

export default ThemeSwitcherButton;