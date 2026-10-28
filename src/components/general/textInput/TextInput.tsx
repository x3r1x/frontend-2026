type TextInputProps = {
    text: string,
    className: string,
    onChange: (newValue: string) => void,
    additionalStyle?: object,
    editable?: boolean,
    onMouseDown?: (event: React.MouseEvent) => void
    onClick?: () => void
}

function TextInput(props: TextInputProps) {
    return (
        <div
            contentEditable={props.editable ?? props.editable}
            className={props.className}
            style={props.additionalStyle ?? props.additionalStyle}
            suppressContentEditableWarning={true}
            onClick={props.onClick}
            onMouseDown={props.onMouseDown}
            onBlur={event => props.onChange(event.currentTarget.textContent)}
        >
            {props.text}
        </div>
    )
}

export default TextInput;