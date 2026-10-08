import './App.module.css'
import Header from "./views/Header/Header.js";
import style from "./App.module.css"
import Toolbar from "./views/Toolbar/Toolbar.js";
import SlideCollectionComponent from "./views/SlideCollection/SlideCollectionComponent.js";
import SlideView from "./views/SlideView/SlideView.js";
import {getPreviewMode, getPreviewSlide} from "./editor.js";
import type {Presentation} from "./types/presentation.js";
import type {Slide} from "./types/slide.js";
import PreviewOverlay from "./views/PreviewOverlay/PreviewOverlay.js";
import {onClose, onNextSlideClick, onPreviousSlideClick} from "./views/PreviewOverlay/PreviewOverlayActions.js";
import {getTestAppState} from "./data.js";

type AppProps = {
    domainState: Presentation
}

function App(props: AppProps) {
    console.log("Перерисовка!");
    const domainState: Presentation = props.domainState;
    const appState = getTestAppState();
    const currentSlide = getPreviewSlide();

    if (getPreviewMode()) {
        return (
            <PreviewOverlay
                presentation={domainState}
                currentSelectedSlide={currentSlide}
                onClose={onClose}
                onBack={() => onPreviousSlideClick(currentSlide)}
                onNext={() => onNextSlideClick(currentSlide, props.domainState.slideCollection.length)}
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
                                scale={0.7}
                            />
                            : null
                    }
                </div>
            </div>
        </div>
    )
}

function getSlideById(slides: Slide[], id: string): Slide {
    return slides.find(slide => slide.id === id)!;
}

export default App
