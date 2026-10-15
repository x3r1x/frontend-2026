import style from "./ThemeSwitcher.module.css"
import ThemeSwitcherButton from "./ThemeSwitcherButton.js";
import {TEXT_CONSTANTS} from "../../../AppConstants.js";

type ThemeSwitcherProps = {
    isDarkMode: boolean
}

function ThemeSwitcher(props: ThemeSwitcherProps) {
    return (
        <div className={style.container}>
            <p className={style.headerText}>
                {TEXT_CONSTANTS.THEME_HEADER_TEXT}
            </p>

            <ThemeSwitcherButton isDarkMode={props.isDarkMode}/>

            <p className={style.footerText}>
                {TEXT_CONSTANTS.THEME_FOOTER_TEXT}
            </p>
        </div>
    )
}

export default ThemeSwitcher;