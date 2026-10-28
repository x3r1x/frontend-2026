import './App.module.css'
import Header from "./views/header/Header.js";
import style from "./App.module.css"
import Toolbar from "./views/toolbar/Toolbar.js";
import SlideCollectionComponent from "./views/slideCollection/SlideCollectionComponent.js";
import SlideView from "./views/slideView/SlideView.js";
import type {Presentation} from "./types/presentation.js";
import PreviewOverlay from "./views/previewOverlay/PreviewOverlay.js";
import {getSlideById} from "./actions/slide.js";
import type {AppState} from "./data.js";
import {useState} from "react";
import useTheme from "./utils/ThemeContext/useTheme.tsx";
import * as React from "react";
import useSelection from "./utils/useSelection.tsx";

type AppProps = {
    domainState: Presentation,
    appState: AppState
}

function App(props: AppProps) {
    console.log("Перерисовка!");
    const domainState: Presentation = props.domainState;
    const [previewMode, setPreviewMode] = useState<boolean>(false)

    const {selectedSlideIds, setSelectedSlideIds, selectedObjectIds, setSelectedObjectIds} = useSelection()
    const {theme} = useTheme()


    if (previewMode) {
        return (
            <PreviewOverlay
                presentation={domainState}
                onClose={() => setPreviewMode(false)}
            />
        )
    }

    const containerThemeClassName = theme === "light"
        ? style.containerLight
        : style.containerDark

    return (
        <div className={style.container + " " + containerThemeClassName}>
            <Header
                presentationName={domainState.name}
                onPreviewClick={() => setPreviewMode(true)}
            />
            <Toolbar
                domainState={domainState}
                selectedSlideIds={selectedSlideIds}
                selectedObjectIds={selectedObjectIds}
                setSelectedObjectIds={setSelectedObjectIds}
                setSelectedSlideIds={setSelectedSlideIds}
            />

            <div className={style.workspace}>
                <SlideCollectionComponent
                    slideCollection={domainState.slideCollection}
                    selectedSlideIds={selectedSlideIds}
                    setSelectedSlideIds={setSelectedSlideIds}
                />

                <div className={style.divider}/>

                <div className={style.slideViewContainer}>
                    {
                        selectedSlideIds
                            ? <SlideView
                                slide={getSlideById(domainState.slideCollection, selectedSlideIds[0])}
                                selectedObjectIds={selectedObjectIds}
                                objectsEditable={true}
                                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                                    if (event.target === event.currentTarget) {
                                        setSelectedObjectIds([])
                                    }
                                }}
                                onObjectClick={(objectId: string) => setSelectedObjectIds([...selectedObjectIds, objectId])}
                                scale={0.7}
                            />
                            : null
                    }
                </div>
            </div>
        </div>
    )
}

export default App
