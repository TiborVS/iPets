import { useEffect, useState } from "react";
import callApi from "../utils/callApi";
import { jwtDecode } from "jwt-decode";
import PetCard from "./PetCard";
import { useNavigate } from "react-router";

export default function PetList() {

    const navigate = useNavigate();

    const [pets, setPets] = useState([]);

    useEffect(() => {
        getPetsForUser();
    }, []);

    async function getPetsForUser() {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            navigate('/login')
        }
        try {
            const response = await callApi('GET', import.meta.env.VITE_API_URL, '/pets/user/' + jwtDecode(token).id, null, token);
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
        <>
        {pets && pets.map((pet) => 
            <PetCard key={pet.id} pet={pet} />
        )}
        </>
    )

}