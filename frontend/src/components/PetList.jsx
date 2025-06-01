import { useContext, useEffect, useState } from "react";
import callApi from "../utils/callApi";
import PetCard from "./PetCard";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../context/UserContext";
import '../styles/PetList.css';
import { buttonStyles } from "../utils/Theme";

export default function PetList() {

    const { user, setUser } = useContext(UserContext);
    const [pets, setPets] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getPetsForUser();
    }, []);

    async function getPetsForUser() {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await callApi('GET', import.meta.env.VITE_API_URL, '/pets/user/' + user.id, null, token);
            if (response.error) {
                console.error(response.error);
            }
            else {
                setPets(response);
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="pet-list">
            <button style={buttonStyles.addButton} className="new-pet">
                <Link to="/pets/new">Dodaj žival</Link>
            </button>
            {pets && pets.map((pet) =>
                <PetCard key={pet.id} pet={pet} />
            )}
            <button onClick={() => navigate("/medications")}>Dodaj zdravilo</button>
        </div>
    )

}