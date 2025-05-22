import { useState } from "react";
import { useNavigate } from "react-router";
import Form from "./Form";
import callApi from "../utils/callApi";

export default function Login() {

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
            placeholder: "Vaše geslo",
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
        const requestBody = { 
            email: formData.email,
            password: formData.password
        };
        try {
            const response = await callApi('POST', API_URL, "/auth/token", requestBody);
            if (response.accessToken) {
                localStorage.setItem("accessToken", response.accessToken);
                localStorage.setItem("refreshToken", response.refreshToken);
                navigate('/');
            }
            else {
                setError("Napaka: " + response.error);
            }
        }
        catch (err) {
            console.error(err);
            setError("Neznana napaka pri prijavi");
        }
    }

    return(
        <>
            <Form title={"Prijava"} fields={formFields} submitCallback={formHandler} error={error} submitText={"Prijavi se"}></Form>
        </>
    )
}