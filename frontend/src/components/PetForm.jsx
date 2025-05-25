import { useParams, useNavigate } from 'react-router';
import { useState, useEffect, useContext } from 'react';
import Form from './Form';
import callApi from '../utils/callApi';
import { UserContext } from '../context/UserContext';

export default function PetForm({isEditing}) {

    const params = useParams();
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [error, setError] = useState("");
    const [formParams, setFormParams] = useState([
        {
            name: "name",
            type: "text",
            displayName: "Ime",
            placeholder: "Ime vaše živali",
            default: ""
        },
        {
            name: "species",
            type: "text",
            displayName: "Vrsta",
            placeholder: "Vrsta živali (mačka, pes, ...)",
            default: ""
        },
        {
            name: "breed",
            type: "text",
            displayName: "Pasma",
            placeholder: "Pasma živali (zlati prinašalec ...)",
            default: ""
        },
        {
            name: "birthday",
            type: "date",
            displayName: "Datum rojstva",
            default: ""
        }
    ]);

    useEffect(() => {
        async function fetchData() {
            if (isEditing) {
                const petId = params.id;
                try {
                    const pet = await callApi('GET', import.meta.env.VITE_API_URL, '/pets/' + petId, null, localStorage.getItem("accessToken"));
                    let newFormParams = structuredClone(formParams);
                    for (let param of newFormParams) {
                        param.default = pet[param.name];
                    }
                    setFormParams(newFormParams);
                }
                catch (err) {
                    console.error(err);
                    navigate('/pets');
                }
            }
        }
        fetchData();
    }, []);

    async function formHandler(formData) {
        setError("");
        if (!formData.name) {
            setError("Ime živali ne sme biti prazno");
            return;
        }
        if (!formData.species) {
            setError("Vrsta živali ne sme biti prazna");
        }
        const requestBody = {
            pet: {
                name: formData.name,
                species: formData.species,
                breed: formData.breed,
                birthday: formData.birthday,
                userId: user.id, 
                imageId: null // TEMP
            }
        };
        try {
            const response = await callApi(isEditing ? 'PUT' : 'POST', import.meta.env.VITE_API_URL, '/pets/' + (isEditing ? params.id : ""), requestBody, localStorage.getItem("accessToken"));
            if (response.id) navigate('/pets/' + (isEditing ? params.id : "")); 
            else setError("Napaka pri " + (isEditing ? "urejanju" : "dodajanju") + " živali: " + response.error);
        }
        catch (err) {
            console.error(err);
            setError("Neznana napaka pri " + (isEditing ? "urejanju" : "dodajanju") + " živali");
        }
    }

    return(
        <Form 
        title={isEditing ? "Uredi žival" : "Dodaj žival"}
        fields={formParams}
        submitCallback={formHandler}
        error={error}
        submitText={isEditing ? "Uredi" : "Dodaj"}
        ></Form>
    )
}