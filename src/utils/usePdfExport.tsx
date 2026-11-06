import {useCallback} from 'react';
import {jsPDF} from 'jspdf';
import html2canvas from "html2canvas";
import type {Presentation} from "../types/presentation.ts";
import SlideView from "../views/slideView/SlideView.tsx";
import {createRoot} from "react-dom/client";

const PDF_WIDTH = 297;
const PDF_HEIGHT = 210;

const usePdfExport = () => {
    const exportToPdf = useCallback(async (presentation: Presentation) => {
        const pdf = new jsPDF("l", "mm", "a4");

        const newSlidesArray = presentation.slideCollection.map(slide =>
            <div className={"slide-canvas"} key={slide.id}>
                <SlideView
                    slide={slide}
                    scale={1}
                    objectsEditable={false}
                    selectedObjectIds={[]}
                />
            </div>
        )

        const tempRoot = createRoot(document.getElementById("exportToPdfRoot")!)
        await tempRoot.render(newSlidesArray)

        const slideElements = document.querySelectorAll(".slide-canvas");

        for (let i = 0; i < slideElements.length; i++) {
            const canvas = await html2canvas(slideElements[i] as HTMLElement, {
                scale: 1,
                useCORS: true,
                logging: false
            });
            const imgData = canvas.toDataURL("image/png");

            if (i > 0) {
                pdf.addPage();
            }

            pdf.addImage(imgData, "PNG", 0, 0, PDF_WIDTH, PDF_HEIGHT);
        }

        pdf.save(`${presentation.name}.pdf`);
    }, []);

    return {exportToPdf};
};

export default usePdfExport