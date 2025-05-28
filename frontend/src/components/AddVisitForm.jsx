import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import callApi from '../utils/callApi';

export default function AddVisitForm() {
    const { id: petId } = useParams();
    const [visitDate, setVisitDate] = useState('');
    const [visitTime, setVisitTime] = useState('');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const apiBase = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("accessToken");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await callApi('POST', apiBase, '/visits', {
                visit: {
                    petId,
                    visitDate,
                    visitTime,
                    location,
                    notes
                }
            }, token);
            navigate(`/pets/${petId}/visits`);
        } catch (err) {
            setError("Napaka pri shranjevanju obiska.");
            console.error(err);
        }
    };

    return (
        <div className="container">
            <h2>Dodaj veterinarski obisk</h2>
            <Link to={`/pets/${petId}/visits`}>Nazaj</Link>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Datum:</label>
                    <input type="date" value={visitDate} onChange={e => setVisitDate(e.target.value)} required />
                </div>
                <div>
                    <label>Čas:</label>
                    <input type="time" value={visitTime} onChange={e => setVisitTime(e.target.value)} required />
                </div>
                <div>
                    <label>Lokacija:</label>
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} required />
                </div>
                <div>
                    <label>Opis:</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} required />
                </div>
                <button type="submit">Shrani</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}
