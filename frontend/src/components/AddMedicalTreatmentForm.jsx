import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import callApi from '../utils/callApi';

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
            <h2>Dodaj zdravljenje</h2>
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
                <button type="submit">Shrani</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}
