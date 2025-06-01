import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import callApi from '../utils/callApi';
import {buttonStyles, formStyles} from "../utils/Theme.js";

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
            <form onSubmit={handleSubmit} style={formStyles.form}>
                <h2 style={formStyles.title}>Uredi obisk</h2>
                <label style={formStyles.label}>Datum:</label>
                <input
                    type="date"
                    name="visitDate"
                    value={visit.visitDate}
                    onChange={handleChange}
                    style={formStyles.input}
                    required
                />

                <label style={formStyles.label}>Čas:</label>
                <input
                    type="time"
                    name="visitTime"
                    value={visit.visitTime}
                    onChange={handleChange}
                    style={formStyles.input}
                    required
                />

                <label style={formStyles.label}>Lokacija:</label>
                <input
                    type="text"
                    name="location"
                    value={visit.location}
                    onChange={handleChange}
                    style={formStyles.input}
                    required
                />

                <label style={formStyles.label}>Opis:</label>
                <textarea
                    name="notes"
                    value={visit.notes}
                    onChange={handleChange}
                    style={formStyles.input}
                    required
                />

                <button
                    type="submit"
                    style={{ ...buttonStyles.addButton, marginTop: "20px" }}
                >
                    Posodobi
                </button>

                {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            </form>
        </div>
    );
}
