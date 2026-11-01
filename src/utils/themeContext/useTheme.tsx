import {useContext} from "react";
import {ThemeContext} from "./ThemeProvider.tsx";

const useTheme = () => {
    const context = useContext(ThemeContext);

    if (context === null) {
        console.error("Theme context found null!");
        throw Error
    }

    const theme = context.theme
    const changeTheme = context.changeTheme

    return {theme, changeTheme}
}

export default useTheme;