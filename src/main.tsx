import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createTestPresentation} from "./data.js";
import {addEditorChangeHandler, getState, setInitialState} from "./editor.js";

const initialPresentation = createTestPresentation();
setInitialState(initialPresentation)

const root = createRoot(document.getElementById('root')!)

function renderApp(): void {
    root.render(<App domainState={getState()!} />)
}

addEditorChangeHandler(renderApp);
renderApp();