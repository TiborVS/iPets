import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import Form from "./Form";
import callApi from "../utils/callApi";
import { UserContext } from "../context/UserContext";
import { jwtDecode } from "jwt-decode";

export default function Login() {

    const { user, setUser } = useContext(UserContext);

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
            const response = await callApi('POST', import.meta.env.VITE_API_URL, "/auth/token", requestBody);
            if (response.accessToken) {
                const decoded = jwtDecode(response.accessToken);
                setUser({
                    id:  decoded.id,
                    email: decoded.email
                })
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