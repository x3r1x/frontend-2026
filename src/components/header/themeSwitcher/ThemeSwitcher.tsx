import style from "./ThemeSwitcher.module.css"
import ThemeSwitcherButton from "./ThemeSwitcherButton.js";
import {TEXT_CONSTANTS} from "../../../AppConstants.js";
import useTheme from "../../../utils/ThemeContext/useTheme.tsx";

function ThemeSwitcher() {
    const {theme} = useTheme()

    const headerTextThemeClassName = theme === "light"
        ? style.headerTextLight
        : style.headerTextDark

    const footerTextThemeClassName = theme === "light"
        ? style.footerTextLight
        : style.footerTextDark

    return (
        <div className={style.container}>
            <p className={style.headerText + " " + headerTextThemeClassName}>
                {TEXT_CONSTANTS.THEME_HEADER_TEXT}
            </p>

            <ThemeSwitcherButton/>

            <p className={style.footerText + " " + footerTextThemeClassName}>
                {TEXT_CONSTANTS.THEME_FOOTER_TEXT}
            </p>
        </div>
    )
}

export default ThemeSwitcher;