import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createTestPresentation, getTestAppState} from "./data.js";
import {addEditorChangeHandler, getAppState, getState, setInitialAppState, setInitialState} from "./editor.js";
import ThemeProvider from "./utils/ThemeContext/ThemeProvider.tsx";

const initialPresentation = createTestPresentation();
setInitialState(initialPresentation)

const initialAppState = getTestAppState();
setInitialAppState(initialAppState)

const root = createRoot(document.getElementById('root')!)

function renderApp(): void {
    root.render(
        <ThemeProvider>
            <App domainState={getState()!} appState={getAppState()!} />
        </ThemeProvider>
    )
}

addEditorChangeHandler(renderApp);
renderApp();