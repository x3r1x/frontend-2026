import './App.module.css'
import Header from "./views/header/Header.js";
import style from "./App.module.css"
import Toolbar from "./views/toolbar/Toolbar.js";
import SlideCollectionComponent from "./views/slideCollection/SlideCollectionComponent.js";
import SlideView from "./views/slideView/SlideView.js";
import PreviewOverlay from "./views/previewOverlay/PreviewOverlay.js";
import {getSlideById} from "./actions/slide.js";
import {useEffect, useState} from "react";
import useTheme from "./utils/themeContext/useTheme.tsx";
import * as React from "react";
import useSelection from "./utils/useSelection.tsx";
import TextStylePanel, {type TextStylePreview} from "./components/textStylePanel/TextStylePanel.tsx";
import useHistoryUI from "./utils/useHistoryUI.tsx";
import {useSelector} from "react-redux";
import type {RootState} from "./store";

function App() {
    const domainState = useSelector((state: RootState) => state.presentation.presentation);

    const [textStylePreview, setTextStylePreview] = useState<TextStylePreview | undefined>(undefined)
    const [previewMode, setPreviewMode] = useState<boolean>(false)

    const selectionModule = useSelection()
    const {canUndo, canRedo, onUndo, onRedo} = useHistoryUI(selectionModule.clearObjectSelection)
    const {theme} = useTheme()

    if (!domainState) {
        return <div>Загрузка...</div>;
    }

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

    const selectedSlideId = selectionModule.selectedSlideIds.length !== 0
        ? selectionModule.selectedSlideIds[0]
        : undefined
    const selectedSlide = selectedSlideId
        ? getSlideById(domainState.slideCollection, selectedSlideId)
        : undefined

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
                        selectedSlide
                            ? <SlideView
                                slide={selectedSlide}
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
                    selectionModule.selectedObjectIds.length !== 0 && selectedSlide
                        ? <TextStylePanel
                            slide={selectedSlide}
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
