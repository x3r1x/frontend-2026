import {useCallback, useRef} from "react";
import * as React from "react";

const useImageLoader = (onImageLoad: (dataUrl: string) => void) => {
    const inputRef = useRef<HTMLInputElement|null>(null)

    const onLoaderButtonClick = useCallback(() => {
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
                    onImageLoad(reader.result)
                }
            }

            reader.readAsDataURL(file)
        }, [onImageLoad]
    )

    return {
        inputRef,
        onLoaderButtonClick,
        onFileChange
    }
}

export default useImageLoader