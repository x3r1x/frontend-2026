type TextInputProps = {
    text: string,
    className: string,
    onChange: (newName: string) => void,
    additionalStyle?: object,
    editable?: boolean
}

function TextInput(props: TextInputProps) {
    return (
        <div
            contentEditable={props.editable ?? props.editable}
            className={props.className}
            style={props.additionalStyle ?? props.additionalStyle}
            suppressContentEditableWarning={true}
            onBlur={event => props.onChange(event.currentTarget.textContent)}
        >
            {props.text}
        </div>
    )
}

export default TextInput;