import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import callApi from "../utils/callApi";
import ISODateToSloveneString from "../utils/ISODateToSloveneString";

export default function PetDetail() {

    const params = useParams();
    const [pet, setPet] = useState(null);

    useEffect(() => {
        async function getPetData() {
            const token = localStorage.getItem("accessToken");
            try {
                const response = await callApi('GET', import.meta.env.VITE_API_URL, '/pets/' + params.id, null, token);
                if (response.error) {
                    console.error(response.error);
                }
                else {
                    setPet(response);
                }
            }
            catch (err) {
                console.error(err);
            }
        }
        getPetData();
    }, [])

    return (pet && 
            <div className="container">
                <img src={import.meta.env.VITE_API_URL + "/images/" + pet.imageId} alt={"Slika živali " + pet.name} />
                <h2>{pet.name}</h2>
                <span>{pet.species} | {pet.breed}</span>
                {pet.birthday && <p>Rojena {ISODateToSloveneString(pet.birthday)}</p>}
                <p><Link to={"/pets/edit/" + pet.id}>Uredi</Link></p>
            </div>
    )
}