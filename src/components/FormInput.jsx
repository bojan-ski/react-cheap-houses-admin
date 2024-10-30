const FormInput = ({ label, name, type, placeholder, value, defaultValue, required, onMutate, disabled, maxLength, minLength }) => {
    return (
        <div className="mb-3">
            <label htmlFor={name} className="col-form-label fw-bolder mb-1">
                {label}
            </label>
            <input
                className="form-control"
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={value}
                defaultValue={defaultValue}
                required={required}
                onChange={onMutate}
                disabled={disabled}
                maxLength={maxLength}
                minLength={minLength} />
        </div>
    )
}

export default FormInput