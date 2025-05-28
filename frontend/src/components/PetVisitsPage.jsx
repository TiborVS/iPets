import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import callApi from '../utils/callApi';

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
        <div className="container">
            <h2>Veterinarski obiski</h2>

            <Link to={`/pets/${petId}`}>Nazaj</Link>

            <div >
                <button onClick={() => navigate(`/pets/${petId}/visits/add`)}>Dodaj obisk</button>
            </div>

            {error && <p>{error}</p>}

            {visits.length === 0 ? (
                <p>Ni zabeleženih obiskov.</p>
            ) : (
                <ul>
                    {visits.map(visit => (
                        <li key={visit.id} >
                            <p><strong>Datum:</strong> {visit.visitDate}</p>
                            <p><strong>Čas:</strong> {visit.visitTime}</p>
                            <p><strong>Lokacija:</strong> {visit.location}</p>
                            <p><strong>Opis:</strong> {visit.notes}</p>
                            <button onClick={() => navigate(`/pets/${petId}/visits/edit/${visit.id}`)}>Uredi</button>
                            <button onClick={() => handleDelete(visit.id)} >
                                Izbriši
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
