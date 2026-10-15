import style from "./Header.module.css";
import inputStyle from "../../components/general/textInput/TextInput.module.css";
import AppIcon from "../../components/header/appIcon/AppIcon.js";
import ThemeSwitcher from "../../components/header/themeSwitcher/ThemeSwitcher.js";
import HeaderButton from "../../components/header/headerButton/HeaderButton.js";
import {TEXT_CONSTANTS} from "../../AppConstants.js";
import {onPresentationNameChange, onPreviewClick} from "./HeaderActions.js";
import TextInput from "../../components/general/textInput/TextInput.js";

type HeaderProps = {
    presentationName: string,
    isDarkMode: boolean,
}

function Header(props: HeaderProps) {
    return (
        <div className={style.container}>
            <div className={style.nameDiv}>
                <AppIcon/>
                <TextInput
                    text={props.presentationName}
                    className={inputStyle.nameField}
                    editable={true}
                    onChange={onPresentationNameChange}
                />
            </div>

            <div className={style.actionDiv}>
                <ThemeSwitcher
                    isDarkMode={props.isDarkMode}
                />

                <HeaderButton
                    text={TEXT_CONSTANTS.PREVIEW_TEXT}
                    onClick={onPreviewClick}
                />

                <HeaderButton
                    text={TEXT_CONSTANTS.EXPORT_PRESENTATION_TEXT}
                    onClick={() => {}}
                />
            </div>
        </div>
    )
}

export default Header;