import {createContext, type ReactNode, useState} from "react";

type Theme = "light" | "dark"

type ThemeContextProvider = {
    theme: Theme
    changeTheme: () => void
}

const ThemeContext = createContext<ThemeContextProvider | null>(null)

type ThemeProviderProps = {
    children: ReactNode
}

function ThemeProvider(props: ThemeProviderProps) {
    const initialTheme: Theme = !window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "light"
        : "dark"

    const [theme, setTheme] = useState<Theme>(initialTheme)

    const changeTheme = () => {
        setTheme(theme === "light"
            ? "dark"
            : "light"
        )
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
        changeTheme()
    })

    return <ThemeContext.Provider value={{theme, changeTheme}}>
        {props.children}
    </ThemeContext.Provider>
}

export default ThemeProvider;

export {
    // eslint-disable-next-line react-refresh/only-export-components
    ThemeContext,
    type ThemeContextProvider
}