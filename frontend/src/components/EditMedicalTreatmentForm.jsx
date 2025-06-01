import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import callApi from '../utils/callApi';
import {buttonStyles, formStyles} from "../utils/Theme.js";

export default function EditMedicalTreatmentForm() {
    const { id: petId, treatmentId } = useParams();
    const [form, setForm] = useState(null);
    const [medications, setMedications] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const apiBase = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [meds, treatment] = await Promise.all([
                callApi('GET', apiBase, '/medications', null, token),
                callApi('GET', apiBase, `/treatments/${treatmentId}`, null, token)
            ]);
            setMedications(meds);
            setForm(treatment);
        } catch (err) {
            setError("Napaka pri nalaganju podatkov.");
            console.error(err);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await callApi('PUT', apiBase, `/treatments/${treatmentId}`, { treatment: form }, token);
            navigate(`/pets/${petId}/treatments`);
        } catch (err) {
            setError("Napaka pri posodabljanju.");
            console.error(err);
        }
    };

    if (!form) return <p>Nalaganje ...</p>;

    return (
        <div className="container">
            <form onSubmit={handleSubmit} style={formStyles.form}>
                <h2 style={formStyles.title}>Uredi zdravljenje</h2>
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
                        <option key={m.id} value={m.id}>
                            {m.name}
                        </option>
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

                <button
                    type="submit"
                    style={{ ...buttonStyles.addButton, marginTop: "20px" }}
                >
                    Shrani spremembe
                </button>

                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            </form>
        </div>
    );
}
