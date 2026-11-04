import {useCallback, useRef} from "react";
import * as React from "react";

const useImageLoader = (onImageLoad: (dataUrl: string, file: File) => void) => {
    const inputRef = useRef<HTMLInputElement|null>(null)

    const onButtonClick = useCallback(() => {
        inputRef.current?.click()
    }, [])

    const onFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0]

            if (!file) {
                return;
            }

            const reader = new FileReader()

            reader.onload = () => {
                if (typeof reader.result === "string") {
                    onImageLoad(reader.result, file)
                }
            }

            reader.readAsDataURL(file)
        }, [onImageLoad]
    )

    return {
        inputRef,
        onButtonClick: onButtonClick,
        onFileChange
    }
}

export default useImageLoader