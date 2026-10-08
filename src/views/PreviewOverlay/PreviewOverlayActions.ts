import {setPreviewMode, setPreviewSlide} from "../../editor.js";

const onClose = () => setPreviewMode(false);

const onPreviousSlideClick = (currentSlideIndex: number) => {
    if (currentSlideIndex > 0) {
        setPreviewSlide(currentSlideIndex - 1);
    }
};

const onNextSlideClick = (currentSlideIndex: number, slidesTotal: number) => {
    if (currentSlideIndex < slidesTotal - 1) {
        setPreviewSlide(currentSlideIndex + 1);
    }
};

export {
    onClose,
    onPreviousSlideClick,
    onNextSlideClick
}