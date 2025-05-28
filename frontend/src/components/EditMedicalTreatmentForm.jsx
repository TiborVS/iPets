import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import callApi from '../utils/callApi';

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
            <h2>Uredi zdravljenje</h2>
            <Link to={`/pets/${petId}/treatments`}>Nazaj</Link>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Zdravilo:</label>
                    <select name="medicationId" value={form.medicationId} onChange={handleChange} required>
                        <option value="">-- izberi --</option>
                        {medications.map(m => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Tip:</label>
                    <input type="text" name="type" value={form.type} onChange={handleChange} required />
                </div>
                <div>
                    <label>Doziranje:</label>
                    <input type="text" name="dosage" value={form.dosage} onChange={handleChange} required />
                </div>
                <div>
                    <label>Opis:</label>
                    <textarea name="description" value={form.description} onChange={handleChange} required />
                </div>
                <button type="submit">Shrani spremembe</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}
