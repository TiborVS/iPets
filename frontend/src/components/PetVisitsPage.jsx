import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import callApi from '../utils/callApi';
import {buttonStyles, formStyles, medicationStyles} from "../utils/Theme.js";

export default function PetVisitsPage() {
    const { id: petId } = useParams();
    const [visits, setVisits] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const apiBase = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        fetchVisits();
    }, [petId]);

    const fetchVisits = async () => {
        try {
            const data = await callApi('GET', apiBase, `/visits/pet/${petId}`, null, token);
            setVisits(Array.isArray(data) ? data : []);
        } catch (err) {
            setError("Napaka pri nalaganju obiskov.");
            console.error(err);
        }
    };

    const handleDelete = async (visitId) => {
        if (!window.confirm('Si prepričan, da želiš izbrisati ta obisk?')) return;
        try {
            await callApi('DELETE', apiBase, `/visits/${visitId}`, null, token);
            fetchVisits(); // osveži seznam
        } catch (err) {
            console.error(err);
            setError("Napaka pri brisanju obiska.");
        }
    };

    return (
        <div style={medicationStyles.container}>
            <h2 style={medicationStyles.header}>Veterinarski obiski</h2>

            <Link to={`/pets/${petId}`} style={medicationStyles.backLink}>← Nazaj</Link>

            <div style={{ marginBottom: "20px" }}>
                <button
                    onClick={() => navigate(`/pets/${petId}/visits/add`)}
                    style={buttonStyles.addButton}
                >
                    Dodaj obisk
                </button>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {visits.length === 0 ? (
                <p>Ni zabeleženih obiskov.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {visits.map((visit) => (
                        <li key={visit.id} style={medicationStyles.medicationItem}>
                            <p><span style={medicationStyles.label}>Datum:</span> {visit.visitDate}</p>
                            <p><span style={medicationStyles.label}>Čas:</span> {visit.visitTime}</p>
                            <p><span style={medicationStyles.label}>Lokacija:</span> {visit.location}</p>
                            <p><span style={medicationStyles.label}>Opis:</span> {visit.notes}</p>

                            <div style={buttonStyles.actionButtons}>
                                <button
                                    onClick={() => navigate(`/pets/${petId}/visits/edit/${visit.id}`)}
                                    style={buttonStyles.addButton}
                                >
                                    Uredi
                                </button>
                                <button
                                    onClick={() => handleDelete(visit.id)}
                                    style={buttonStyles.deleteButton}
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
