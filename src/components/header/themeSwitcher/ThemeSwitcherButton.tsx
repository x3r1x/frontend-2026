import style from "./ThemeSwitcher.module.css"
import {TEXT_CONSTANTS} from "../../../AppConstants.js";
import useTheme from "../../../utils/ThemeContext/useTheme.tsx";

function ThemeSwitcherButton() {
    const {theme, changeTheme} = useTheme()

    const buttonSpanThemeClassName = theme === "light"
        ? style.buttonSpanLight
        : style.buttonSpanDark

    return (
        <label className={style.buttonLabel}>
            <input
                className={style.buttonInput}
                type={"checkbox"}
                checked={theme === "dark"}
                onClick={changeTheme}
            />

            <span className={style.buttonSpan + " " + buttonSpanThemeClassName}>
                {theme === "light"
                    ? TEXT_CONSTANTS.THEME_LIGHT_TEXT
                    : TEXT_CONSTANTS.THEME_DARK_TEXT
                }
            </span>
        </label>
    )
}

export default ThemeSwitcherButton;