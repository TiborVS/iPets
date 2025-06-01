import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import callApi from '../utils/callApi';
import {buttonStyles, formStyles} from "../utils/Theme.js";

export default function AddMedicalTreatmentForm() {
    const { id: petId } = useParams();
    const [medications, setMedications] = useState([]);
    const [form, setForm] = useState({
        medicationId: '',
        type: '',
        dosage: '',
        description: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const apiBase = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        fetchMedications();
    }, []);

    const fetchMedications = async () => {
        try {
            const data = await callApi('GET', apiBase, '/medications', null, token);
            setMedications(Array.isArray(data) ? data : []);
        } catch (err) {
            setError("Napaka pri nalaganju zdravil.");
            console.error(err);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            await callApi('POST', apiBase, '/treatments', {
                treatment: {
                    petId,
                    ...form
                }
            }, token);
            navigate(`/pets/${petId}/treatments`);
        } catch (err) {
            setError("Napaka pri shranjevanju.");
            console.error(err);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} style={formStyles.form}>
                <h2 style={formStyles.title}>Dodaj zdravljenje</h2>
                <label style={formStyles.label}>Zdravilo:</label>
                <select
                    name="medicationId"
                    value={form.medicationId}
                    onChange={handleChange}
                    style={formStyles.input}
                    required
                >
                    <option value="">-- izberi --</option>
                    {medications.map((m) => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                </select>

                <label style={formStyles.label}>Tip:</label>
                <input
                    type="text"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    style={formStyles.input}
                    required
                />

                <label style={formStyles.label}>Doziranje:</label>
                <input
                    type="text"
                    name="dosage"
                    value={form.dosage}
                    onChange={handleChange}
                    style={formStyles.input}
                    required
                />

                <label style={formStyles.label}>Opis:</label>
                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    style={formStyles.input}
                    required
                />

                <button type="submit" style={{ ...buttonStyles.addButton, marginTop: "20px" }}>
                    Shrani zdravljenje
                </button>

                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            </form>
        </div>
    );
}
