import './App.module.css'
import Header from "./views/header/Header.js";
import style from "./App.module.css"
import Toolbar from "./views/toolbar/Toolbar.js";
import SlideCollectionComponent from "./views/slideCollection/SlideCollectionComponent.js";
import SlideView from "./views/slideView/SlideView.js";
import type {Presentation} from "./types/presentation.js";
import PreviewOverlay from "./views/previewOverlay/PreviewOverlay.js";
import {getSlideById} from "./actions/slide.js";
import {useEffect, useState} from "react";
import useTheme from "./utils/themeContext/useTheme.tsx";
import * as React from "react";
import useSelection from "./utils/useSelection.tsx";
import TextStylePanel, {type TextStylePreview} from "./components/textStylePanel/TextStylePanel.tsx";
import useHistoryUI from "./utils/useHistoryUI.tsx";

type AppProps = {
    domainState: Presentation
}

function App(props: AppProps) {
    const domainState: Presentation = props.domainState;
    const [textStylePreview, setTextStylePreview] = useState<TextStylePreview | undefined>(undefined)
    const [previewMode, setPreviewMode] = useState<boolean>(false)

    const selectionModule = useSelection()
    const {canUndo, canRedo, onUndo, onRedo} = useHistoryUI(selectionModule.clearObjectSelection)
    const {theme} = useTheme()

    useEffect(() => {
        setTextStylePreview(undefined)
    }, [domainState])

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
                canRedo={canRedo}
                canUndo={canUndo}
                onRedo={onRedo}
                onUndo={onUndo}
            />
            <Toolbar
                domainState={domainState}
                selectedSlideIds={selectionModule.selectedSlideIds}
                selectedObjectIds={selectionModule.selectedObjectIds}
                clearObjectSelection={selectionModule.clearObjectSelection}
                clearFullSelection={selectionModule.clearFullSelection}
            />

            <div className={style.workspace}>
                <SlideCollectionComponent
                    slideCollection={domainState.slideCollection}
                    selectedSlideIds={selectionModule.selectedSlideIds}
                    onSlideViewClick={selectionModule.onSlideViewClick}
                />

                <div className={style.divider}/>

                <div className={style.slideViewContainer}>
                    {
                        selectionModule.selectedSlideIds
                            ? <SlideView
                                slide={getSlideById(domainState.slideCollection, selectionModule.selectedSlideIds[0])}
                                selectedObjectIds={selectionModule.selectedObjectIds}
                                objectsEditable={true}
                                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                                    if (event.target === event.currentTarget) {
                                        setTextStylePreview(undefined)
                                        selectionModule.clearObjectSelection()
                                    }
                                }}
                                textStylePreview={textStylePreview}
                                onObjectClick={selectionModule.onObjectClick}
                                scale={0.7}
                            />
                            : null
                    }
                </div>

                {
                    selectionModule.selectedObjectIds.length * selectionModule.selectedSlideIds.length !== 0
                        ? <TextStylePanel
                            slide={getSlideById(props.domainState.slideCollection, selectionModule.selectedSlideIds[0])}
                            objectId={selectionModule.selectedObjectIds[0]}
                            onTextPreviewChange={(newTextStylePreview) => setTextStylePreview(newTextStylePreview)}
                        />
                        : null
                }
            </div>
        </div>
    )
}

export default App
