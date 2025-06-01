import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import callApi from '../utils/callApi';
import {buttonStyles, medicationStyles as medicationStyles} from "../utils/Theme.js";

export default function MedicationsPage() {
    const [medications, setMedications] = useState([]);
    const [error, setError] = useState('');
    const token = localStorage.getItem("accessToken");
    const apiBase = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        fetchMedications();
    }, []);

    const fetchMedications = async () => {
        try {
            const data = await callApi('GET', apiBase, '/medications', null, token);
            setMedications(data);
        } catch (err) {
            setError("Napaka pri nalaganju zdravil.");
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Si prepričan, da želiš izbrisati to zdravilo?")) return;
        try {
            await callApi('DELETE', apiBase, `/medications/${id}`, null, token);
            fetchMedications();
        } catch (err) {
            setError("Napaka pri brisanju.");
            console.error(err);
        }
    };

    return (
        <div style={medicationStyles.container}>
            <h2 style={medicationStyles.header}>Seznam zdravil</h2>
            <Link to="/pets" style={medicationStyles.backLink}>← Nazaj</Link>

            <div style={{ marginBottom: "20px" }}>
                <button
                    onClick={() => navigate('/medications/add')}
                    style={buttonStyles.addButton}
                >
                    Dodaj zdravilo
                </button>
            </div>

            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {medications.map(med => (
                    <li key={med.id} style={medicationStyles.medicationItem}>
                        <div style={medicationStyles.medName}>{med.name}</div>
                        <div style={medicationStyles.medDescription}>{med.description}</div>
                        <div style={medicationStyles.buttonGroup}>
                            <button
                                onClick={() => navigate(`/medications/edit/${med.id}`)}
                                style={buttonStyles.addButton}
                            >
                                Uredi
                            </button>
                            <button
                                onClick={() => handleDelete(med.id)}
                                style={buttonStyles.deleteButton}
                            >
                                Izbriši
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
