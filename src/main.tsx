import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createTestPresentation} from "./data.js";
import {addEditorChangeHandler, getState, setInitialState} from "./editor.js";
import ThemeProvider from "./utils/themeContext/ThemeProvider.tsx";

const initialPresentation = createTestPresentation();
setInitialState(initialPresentation)


const root = createRoot(document.getElementById('root')!)

function renderApp(): void {
    root.render(
        <ThemeProvider>
            <App domainState={getState()!}/>
        </ThemeProvider>
    )
}

addEditorChangeHandler(renderApp);
renderApp();