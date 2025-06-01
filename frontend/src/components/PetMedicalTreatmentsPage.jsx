import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import callApi from '../utils/callApi';
import {buttonStyles, medicationStyles} from "../utils/Theme.js";

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
        <div style={medicationStyles.container}>
            <h2 style={medicationStyles.header}>Zdravljenja</h2>

            <Link to={`/pets/${petId}`} style={medicationStyles.backLink}>
                ← Nazaj
            </Link>

            <div style={{ marginBottom: "20px" }}>
                <button
                    style={medicationStyles.button}
                    onClick={() => navigate(`/pets/${petId}/treatments/add`)}
                >
                    Dodaj zdravljenje
                </button>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {treatments.length === 0 ? (
                <p>Ni zabeleženih zdravljenj.</p>
            ) : (
                <ul style={medicationStyles.list}>
                    {treatments.map((t) => (
                        <li key={t.id} style={medicationStyles.item}>
                            <p>
                                <span style={medicationStyles.label}>Zdravilo:</span>
                                {t.medicationName}
                            </p>
                            <p>
                                <span style={medicationStyles.label}>Tip:</span>
                                {t.type}
                            </p>
                            <p>
                                <span style={medicationStyles.label}>Doziranje:</span>
                                {t.dosage}
                            </p>
                            <p>
                                <span style={medicationStyles.label}>Opis:</span>
                                {t.description}
                            </p>
                            <div style={medicationStyles.actionButtons}>
                                <button
                                    style={buttonStyles.addButton}
                                    onClick={() =>
                                        navigate(`/pets/${petId}/treatments/edit/${t.id}`)
                                    }
                                >
                                    Uredi
                                </button>
                                <button
                                    style={buttonStyles.deleteButton}
                                    onClick={() => handleDelete(t.id)}
                                >
                                    Izbriši
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
