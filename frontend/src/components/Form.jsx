import { Fragment, useState, useMemo, useEffect } from "react"

export default function Form({ title, fields, submitCallback, error, submitText }) {

    const defaultValues = useMemo(() => {
        const initial = {};
        for (let field of fields) {
            initial[field.name] = field.default || "";
        }
        return initial;
    }, [fields]);

    const [values, setValues] = useState(defaultValues);

    useEffect(() => {
        setValues(defaultValues);
    }, [fields])

    function updateValue(name, value) {
        let newValues = structuredClone(values);
        newValues[name] = value;
        console.log(JSON.stringify(newValues));
        setValues(newValues);
    }

    function getInputElement(field) {
        const textTypes = ["text", "email", "password"];
        if (field.type == "textarea") {
            return (
                <textarea name={field.name} id={field.name} placeholder={field.placeholder} value={values[field.name]} onChange={(e) => {updateValue(field.name, e.target.value)}}></textarea>
            )
        }
        else if (textTypes.includes(field.type)) {
            return (
                <input type={field.type} name={field.name} id={field.name} placeholder={field.placeholder} value={values[field.name]} onChange={(e) => {updateValue(field.name, e.target.value)}}></input>
            );
        }
        else if (field.type == "date") {
            return (
                <input type="date" name={field.name} id={field.name} value={values[field.name]} onChange={(e) => { updateValue(field.name, e.target.value) }}></input>
            )
        }
        else if (field.type == "hidden") {
            return (
                <input type="hidden" name={field.name} id={field.name} value={values[field.name]} ></input>
            )
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

    async function submitHandler(e) {
        console.log("SubmitHandler called with: " + values);
        e.preventDefault();
        await submitCallback(values);
        setValues(defaultValues);
    }

    return (
        <>
            <h3>{title}</h3>
            <form onSubmit={submitHandler} noValidate>
                {inputs}
                <button type="submit">{submitText}</button>
                <p className="error">{error}</p>
            </form>
        </>
    )
}