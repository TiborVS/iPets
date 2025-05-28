import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import callApi from '../utils/callApi';

export default function EditVisitForm() {
    const { id: petId, visitId } = useParams();
    const [visit, setVisit] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const apiBase = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        async function fetchVisit() {
            try {
                const data = await callApi('GET', apiBase, `/visits/${visitId}`, null, token);
                setVisit(data);
            } catch (err) {
                setError("Napaka pri pridobivanju obiska.");
                console.error(err);
            }
        }
        fetchVisit();
    }, [visitId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await callApi('PUT', apiBase, `/visits/${visitId}`, {
                visit: { ...visit }
            }, token);
            navigate(`/pets/${petId}/visits`);
        } catch (err) {
            setError("Napaka pri posodabljanju obiska.");
            console.error(err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVisit({ ...visit, [name]: value });
    };

    if (!visit) return <p>Nalaganje ...</p>;

    return (
        <div className="container">
            <h2>Uredi obisk</h2>
            <Link to={`/pets/${petId}/visits`}>Nazaj</Link>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Datum:</label>
                    <input type="date" name="visitDate" value={visit.visitDate} onChange={handleChange} required />
                </div>
                <div>
                    <label>Čas:</label>
                    <input type="time" name="visitTime" value={visit.visitTime} onChange={handleChange} required />
                </div>
                <div>
                    <label>Lokacija:</label>
                    <input type="text" name="location" value={visit.location} onChange={handleChange} required />
                </div>
                <div>
                    <label>Opis:</label>
                    <textarea name="notes" value={visit.notes} onChange={handleChange} required />
                </div>
                <button type="submit">Posodobi</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}
