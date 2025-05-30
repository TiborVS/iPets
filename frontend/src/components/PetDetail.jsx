import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import callApi from "../utils/callApi";
import ISODateToSloveneString from "../utils/ISODateToSloveneString";
import DeletePet from "./DeletePet";

export default function PetDetail() {
    const params = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const [feedings, setFeedings] = useState([]);
    const [loadingFeedings, setLoadingFeedings] = useState(true);

    useEffect(() => {
        async function getPetData() {
            const token = localStorage.getItem("accessToken");
            try {
                const response = await callApi('GET', import.meta.env.VITE_API_URL, '/pets/' + params.id, null, token);
                if (response.error) {
                    console.error(response.error);
                } else {
                    setPet(response);
                }
            } catch (err) {
                console.error(err);
            }
        }

        async function getFeedings() {
            const token = localStorage.getItem("accessToken");
            try {
                const response = await callApi('GET', import.meta.env.VITE_API_URL, `/food/pet/${params.id}/feedings`, null, token);
                if (!response.error) {
                    setFeedings(response);
                } else {
                    console.error(response.error);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingFeedings(false);
            }
        }

        getPetData();
        getFeedings();
    }, [params.id]);

    const handleAddFeeding = () => {
        navigate(`/food/feed/${pet.id}`);
    };

    return (
        pet &&
        <div className="container">
            <img src={pet.image} alt={"Slika živali " + pet.name} />
            <h2>{pet.name}</h2>
            <span>{pet.species} | {pet.breed}</span>
            {pet.birthday && <p>Rojena {ISODateToSloveneString(pet.birthday)}</p>}
            <p>
                <Link to={"/pets/edit/" + pet.id}>Uredi</Link>
                <DeletePet pet={pet} />
            </p>

            <Link to={`/pets/${pet.id}/visits`}>
                <button>Veterinarski obiski</button>
            </Link>
            <Link to={`/pets/${pet.id}/treatments`}>
                <button>Zdravstveni zapisi</button>
            </Link>

            <button onClick={handleAddFeeding} style={{ marginTop: '10px' }}>
                Dodaj hranjenje
            </button>

            <section style={{ marginTop: '20px' }}>
                <h3>Zgodovina hranjenj</h3>
                {loadingFeedings ? (
                    <p>Nalaganje hranjenj...</p>
                ) : feedings.length === 0 ? (
                    <p>Za to žival še ni dodanih hranjenj.</p>
                ) : (
                    <ul>
                        {feedings.map((feeding) => (
                            <li key={feeding.id}>
                                {new Date(feeding.time).toLocaleString('sl-SI')} - {feeding.foodName}
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
