import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ThemeProvider from "./utils/themeContext/ThemeProvider.tsx";
import {store} from "./store";
import {setPresentation} from "./store/slices/presentationSlice.ts";
import {getEmptyPresentation} from "./__tests__/presentation/presentationTestStorage.ts";
import {Provider} from "react-redux";

store.dispatch(setPresentation(getEmptyPresentation()));

const root = createRoot(document.getElementById('root')!)

root.render(
    <Provider store={store}>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </Provider>
)