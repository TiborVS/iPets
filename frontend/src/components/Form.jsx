import { Fragment, useState, useMemo, useEffect, useRef } from "react"
import { formStyles, buttonStyles } from "../utils/Theme";

export default function Form({ title, fields, submitCallback, error, submitText }) {

    const defaultValues = useMemo(() => {
        const initial = {};
        for (let field of fields) {
            initial[field.name] = field.default || "";
        }
        return initial;
    }, [fields]);

    const [values, setValues] = useState(defaultValues);
    
    const formElem = useRef(null);

    useEffect(() => {
        setValues(defaultValues);
    }, [fields])

    function updateValue(name, value) {
        let newValues = structuredClone(values);
        newValues[name] = value;
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
                <input style={formStyles.input} type={field.type} name={field.name} id={field.name} placeholder={field.placeholder} value={values[field.name]} onChange={(e) => {updateValue(field.name, e.target.value)}}></input>
            );
        }
        else if (field.type == "date") {
            return (
                <input style={formStyles.input} type="date" name={field.name} id={field.name} value={values[field.name]} onChange={(e) => { updateValue(field.name, e.target.value) }}></input>
            )
        }
        else if (field.type == "hidden") {
            return (
                <input type="hidden" name={field.name} id={field.name} value={values[field.name]} ></input>
            )
        }
        else if (field.type == "file") {
            return(
                <input style={formStyles.input} type="file" name={field.name} id={field.name} />
            )
        }
        else {
            console.error("Form.jsx: " + field.type + " is not a valid field type!");
        }
    }

    const inputs = fields.map(field => 
        <Fragment key={field.name}>
            <label htmlFor={field.name} style={formStyles.label}>{field.displayName}</label>
            {getInputElement(field)}<br/>
        </Fragment>
    )

    async function submitHandler(e) {
        e.preventDefault();
        let formData = new FormData(formElem.current);
        let valuesToSend = structuredClone(values);
        let fileData;
        for (let field of fields) {
            if (field.type === "file") {
                let fileObject = formData.get(field.name);
                if (fileObject.size == 0) continue;
                fileData = await convertFileToBase64(formData.get(field.name));
                valuesToSend[field.name] = fileData;
            }
        }
        await submitCallback(valuesToSend);
        setValues(defaultValues);
    }

    function convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            }
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    return (
        <>
            <h3>{title}</h3>
            <form onSubmit={submitHandler} noValidate ref={formElem} style={formStyles.form}>
                {inputs}
                <button style={buttonStyles.addButton} type="submit">{submitText}</button>
                <p className="error">{error}</p>
            </form>
        </>
    )
}