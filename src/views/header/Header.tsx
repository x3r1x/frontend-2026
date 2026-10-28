import style from "./Header.module.css";
import inputStyle from "../../components/general/textInput/TextInput.module.css";
import AppIcon from "../../components/header/appIcon/AppIcon.js";
import ThemeSwitcher from "../../components/header/themeSwitcher/ThemeSwitcher.js";
import HeaderButton from "../../components/header/headerButton/HeaderButton.js";
import {TEXT_CONSTANTS} from "../../AppConstants.js";
import {onPresentationNameChange} from "./HeaderActions.js";
import TextInput from "../../components/general/textInput/TextInput.js";
import useTheme from "../../utils/ThemeContext/useTheme.tsx";

type HeaderProps = {
    presentationName: string,
    onPreviewClick: () => void
}

function Header(props: HeaderProps) {
    const {theme} = useTheme()

    const containerThemeClassName = theme === "light"
        ? style.containerLight
        : style.containerDark

    const textInputThemeClassName = theme === "light"
        ? inputStyle.nameFieldLight
        : inputStyle.nameFieldDark

    return (
        <div className={style.container + " " + containerThemeClassName}>
            <div className={style.nameDiv}>
                <AppIcon/>
                <TextInput
                    text={props.presentationName}
                    className={inputStyle.nameField + " " + textInputThemeClassName}
                    editable={true}
                    onChange={onPresentationNameChange}
                />
            </div>

            <div className={style.actionDiv}>
                <ThemeSwitcher/>

                <HeaderButton
                    text={TEXT_CONSTANTS.PREVIEW_TEXT}
                    onClick={props.onPreviewClick}
                />

                <HeaderButton
                    text={TEXT_CONSTANTS.EXPORT_PRESENTATION_TEXT}
                    onClick={() => {
                    }}
                />
            </div>
        </div>
    )
}

export default Header;