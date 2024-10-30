const FormTextArea = ({ name, rows, cols, value, defaultValue, minLength, maxLength, required, onMutate }) => {
    return (
        <textarea
            className="textarea mb-4 form-control"
            name={name}
            id={name}
            rows={rows}
            cols={cols}
            value={value}
            defaultValue={defaultValue}
            minLength={minLength}
            maxLength={maxLength}
            required={required}
            onChange={onMutate}
        />
    )
}

export default FormTextArea