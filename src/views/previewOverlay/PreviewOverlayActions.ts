import * as React from "react";

const onPreviousSlideClick = (currentSlide: number, setCurrentSlide:  React.Dispatch<React.SetStateAction<number>>) => {
    if (currentSlide > 0) {
        setCurrentSlide(currentSlide - 1)
    }
};

const onNextSlideClick = (slidesTotal: number, currentSlide: number, setCurrentSlide:  React.Dispatch<React.SetStateAction<number>>) => {
    if (currentSlide < slidesTotal - 1) {
        setCurrentSlide(currentSlide + 1)
    }
};

export {
    onPreviousSlideClick,
    onNextSlideClick
}