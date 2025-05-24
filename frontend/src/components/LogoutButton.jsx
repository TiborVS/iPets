import callApi from "../utils/callApi";
import { useNavigate } from "react-router";

export default function LogoutButton() {

    const navigate = useNavigate();

    async function clickHandler(e) {
        e.preventDefault();
        const response = await callApi('POST', import.meta.env.VITE_API_URL, '/auth/logout', null, localStorage.getItem("accessToken"));
        if (response.message) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/');
        }
        else {
            console.error("Error logging out: " + response.error);
        }
    }

    return (
        <button onClick={clickHandler}>Odjava</button>
    )

}