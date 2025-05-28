import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import callApi from '../utils/callApi';

export default function PetMedicalTreatmentsPage() {
    const { id: petId } = useParams();
    const [treatments, setTreatments] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const apiBase = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        fetchTreatments();
    }, [petId]);

    const fetchTreatments = async () => {
        try {
            const data = await callApi('GET', apiBase, `/treatments/pet/${petId}`, null, token);
            setTreatments(Array.isArray(data) ? data : []);
        } catch (err) {
            setError("Napaka pri nalaganju zdravljenj.");
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Si prepričan, da želiš izbrisati?")) return;
        try {
            await callApi('DELETE', apiBase, `/treatments/${id}`, null, token);
            fetchTreatments();
        } catch (err) {
            setError("Napaka pri brisanju.");
            console.error(err);
        }
    };

    return (
        <div className="container">
            <h2>Zdravljenja</h2>
            <Link to={`/pets/${petId}`}>Nazaj</Link>
            <div>
                <button onClick={() => navigate(`/pets/${petId}/treatments/add`)}>Dodaj zdravljenje</button>
            </div>
            {error && <p>{error}</p>}
            {treatments.length === 0 ? (
                <p>Ni zabeleženih zdravljenj.</p>
            ) : (
                <ul>
                    {treatments.map(t => (
                        <li key={t.id}>
                            <p><strong>Zdravilo:</strong> {t.medicationName}</p>
                            <p><strong>Tip:</strong> {t.type}</p>
                            <p><strong>Doziranje:</strong> {t.dosage}</p>
                            <p><strong>Opis:</strong> {t.description}</p>
                            <button onClick={() => navigate(`/pets/${petId}/treatments/edit/${t.id}`)}>Uredi</button>
                            <button onClick={() => handleDelete(t.id)} >Izbriši</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
