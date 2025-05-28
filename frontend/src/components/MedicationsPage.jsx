import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import callApi from '../utils/callApi';

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
        <div className="container">
            <h2>Seznam zdravil</h2>
            <Link to={`/pets`}>Nazaj <br/></Link>

            <button onClick={() => navigate('/medications/add')}>Dodaj zdravilo</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {medications.map(med => (
                    <li key={med.id}>
                        <strong>{med.name}</strong> – {med.description}
                        <br />
                        <button onClick={() => navigate(`/medications/edit/${med.id}`)}>Uredi</button>
                        <button onClick={() => handleDelete(med.id)} style={{ marginLeft: '8px' }}>Izbriši</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
