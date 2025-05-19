import { Fragment, useState } from "react"

export default function Form({ title, fields, submitCallback, error, submitText }) {

    let defaultValues = {};
    for (let field of fields) {
        defaultValues[field.name] = field.default || "";
    } 

    const [values, setValues] = useState(defaultValues);

    function updateValue(name, value) {
        let newValues = structuredClone(values);
        newValues[name] = value;
        setValues(newValues);
    }

    function getInputElement(field) {
        const textTypes = ["text", "email", "password"];
        if (field.type == "textarea") {
            return (
                <textarea name={field.name} id={field.name} placeholder={field.placeholder} onChange={(e) => {updateValue(field.name, e.target.value)}}>{values[field.name]}</textarea>
            )
        }
        else if (textTypes.includes(field.type)) {
            return (
                <input type={field.type} name={field.name} id={field.name} placeholder={field.placeholder} value={values[field.name]} onChange={(e) => {updateValue(field.name, e.target.value)}}></input>
            );
        }
        else {
            console.error("Form.jsx: " + field.type + " is not a valid field type!");
        }
    }

    const inputs = fields.map(field => 
        <Fragment key={field.name}>
            <label htmlFor={field.name}>{field.displayName}</label>
            {getInputElement(field)}<br/>
        </Fragment>
    )

    function submitHandler(e) {
        e.preventDefault();
        submitCallback(values);
        setValues(defaultValues);
    }

    return (
        <>
            <h3>{title}</h3>
            <form onSubmit={submitHandler}>
                {inputs}
                <button type="submit">{submitText}</button>
                <p className="error">{error}</p>
            </form>
        </>
    )
}