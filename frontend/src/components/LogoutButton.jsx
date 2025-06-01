import { useContext } from "react";
import callApi from "../utils/callApi";
import { useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import '../styles/LogoutButton.css';

export default function LogoutButton() {

    const { user, setUser } = useContext(UserContext); 
    const navigate = useNavigate();

    async function clickHandler(e) {
        e.preventDefault();
        const response = await callApi('POST', import.meta.env.VITE_API_URL, '/auth/logout', null, localStorage.getItem("accessToken"));
        if (response.message) {
            setUser(null);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            navigate('/');
        }
        else {
            console.error("Error logging out: " + response.error);
        }
    }

    return (
        <button className="logout-button" onClick={clickHandler}>Odjava</button>
    )

}