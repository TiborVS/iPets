import { useState } from "react";
import { useNavigate } from "react-router";
import Form from "./Form";
import callApi from "../utils/callApi";

export default function Register() {

    const API_URL = "http://localhost:3000";
    const navigate = useNavigate();

    const formFields = [
        {
            name: "email",
            type: "email",
            displayName: "E-naslov",
            placeholder: "Vaš e-naslov",
            default: ""
        },
        {
            name: "password",
            type: "password",
            displayName: "Geslo",
            placeholder: "Varno geslo",
            default: ""
        }
    ];

    const [error, setError] = useState("");

    async function formHandler(formData) {
        setError("");
        if (!formData.email) {
            setError("E-naslov ne sme biti prazen");
            return;
        }
        if (!formData.password) {
            setError("Geslo ne sme biti prazno");
            return;
        }
        if (formData.password.length < 5) {
            setError("Geslo mora imeti vsaj 5 znakov");
            return;
        }
        const requestBody = { user: {
            email: formData.email,
            password: formData.password
        }};
        try {
            const response = await callApi('POST', API_URL, "/users", requestBody);
            if (response.id) {
                navigate('/');
            }
            else {
                setError("Napaka: " + response.error);
            }
        }
        catch (err) {
            console.error(err);
            setError("Neznana napaka pri registraciji");
        }
    }

    return(
        <>
            <Form title={"Registracija"} fields={formFields} submitCallback={formHandler} error={error} submitText={"Registriraj"}></Form>
        </>
    )
}