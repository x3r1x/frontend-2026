import style from "./Header.module.css";
import inputStyle from "../../components/General/TextInput.module.css";
import AppIcon from "../../components/Header/AppIcon/AppIcon.js";
import ThemeSwitcher from "../../components/Header/ThemeSwitcher/ThemeSwitcher.js";
import TextInput from "../../components/General/TextInput.js";
import HeaderButton from "../../components/Header/HeaderButton/HeaderButton.js";
import {TEXT_CONSTANTS} from "../../AppConstants.js";
import {onPresentationNameChange, onPreviewClick} from "./HeaderActions.js";

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