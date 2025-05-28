import { useEffect, useState } from 'react';
import VeterinaryVisitCard from './VeterinaryVisitCard';
import callApi from '../utils/callApi';

export default function VeterinaryVisits({ petId }) {
    const [visits, setVisits] = useState([]);
    const [visitDate, setVisitDate] = useState('');
    const [visitTime, setVisitTime] = useState('');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const apiBase = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        fetchVisits();
    }, [petId]);

    const fetchVisits = async () => {
        try {
            const response = await callApi(
                'GET',
                apiBase,
                `/visits/pet/${petId}`,
                null,
                token
            );
            console.log('Veterinary visits response:', response);
            setVisits(Array.isArray(response) ? response : []);
        } catch (err) {
            console.error(err);
            setError('Napaka pri nalaganju obiskov.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await callApi(
                'POST',
                apiBase,
                '/visits',
                {
                    visit: {
                        petId,
                        visitDate,
                        visitTime,
                        location,
                        notes
                    }
                },
                token
            );
            setVisitDate('');
            setVisitTime('');
            setLocation('');
            setNotes('');
            setSuccess('Obisk uspešno dodan!');
            fetchVisits();
        } catch (err) {
            console.error(err);
            setError('Napaka pri dodajanju obiska.');
        }
    };

    return (
        <div>
            <h3>Dodaj veterinarski obisk</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Datum: </label>
                    <input
                        type="date"
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Čas: </label>
                    <input
                        type="time"
                        value={visitTime}
                        onChange={(e) => setVisitTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Lokacija: </label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Opis: </label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Shrani obisk</button>
            </form>

            {error && <p>{error}</p>}
            {success && <p>{success}</p>}

            <h4>Pretekli obiski</h4>
            {Array.isArray(visits) && visits.length > 0 ? (
                visits.map((visit) => (
                    <VeterinaryVisitCard key={visit.id} visit={visit} />
                ))
            ) : (
                <p>Ni zabeleženih obiskov.</p>
            )}
        </div>
    );
}
