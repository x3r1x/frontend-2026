import './App.module.css'
import Header from "./views/header/Header.js";
import style from "./App.module.css"
import Toolbar from "./views/toolbar/Toolbar.js";
import SlideCollectionComponent from "./views/slideCollection/SlideCollectionComponent.js";
import SlideView from "./views/slideView/SlideView.js";
import type {Presentation} from "./types/presentation.js";
import PreviewOverlay from "./views/previewOverlay/PreviewOverlay.js";
import {onClose, onNextSlideClick, onPreviousSlideClick} from "./views/previewOverlay/PreviewOverlayActions.js";
import {getSlideById} from "./actions/slide.js";
import type {AppState} from "./data.js";
import {onObjectClick} from "./AppActions.js";

type AppProps = {
    domainState: Presentation,
    appState: AppState
}

function App(props: AppProps) {
    console.log("Перерисовка!");
    const domainState: Presentation = props.domainState;
    const appState = props.appState;

    if (appState.previewMode) {
        return (
            <PreviewOverlay
                presentation={domainState}
                currentSelectedSlide={appState.previewSlide}
                onClose={onClose}
                onBack={onPreviousSlideClick}
                onNext={() => onNextSlideClick(props.domainState.slideCollection.length)}
            />
        )
    }

    return (
        <div className={style.container}>
            <Header
                presentationName={domainState.name}
                isDarkMode={appState.isDarkMode}
            />
            <Toolbar
                appState={appState}
                domainState={domainState}
            />

            <div className={style.workspace}>
                <SlideCollectionComponent
                    tempDomainState={domainState}
                    appState={appState}
                    slideCollection={domainState.slideCollection}
                    selectedIds={appState.selectedSlideIds}
                />

                <div className={style.divider}/>

                <div className={style.slideViewContainer}>
                    {
                        appState.selectedSlideIds
                            ? <SlideView
                                slide={getSlideById(domainState.slideCollection, appState.selectedSlideIds[0])}
                                selectedObjectIds={appState.selectedObjectIds}
                                objectsEditable={true}
                                onObjectClick={onObjectClick}
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
