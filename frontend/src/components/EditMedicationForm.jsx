import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import callApi from '../utils/callApi';
import {buttonStyles, formStyles} from "../utils/Theme.js";

export default function EditMedicationForm() {
    const { id } = useParams();
    const [form, setForm] = useState({ name: '', description: '' });
    const [error, setError] = useState('');
    const token = localStorage.getItem("accessToken");
    const apiBase = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await callApi('GET', apiBase, `/medications/${id}`, null, token);
                setForm(data);
            } catch (err) {
                setError("Napaka pri nalaganju podatkov.");
                console.error(err);
            }
        }
        fetchData();
    }, [id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await callApi('PUT', apiBase, `/medications/${id}`, { medication: form }, token);
            navigate('/medications');
        } catch (err) {
            setError("Napaka pri posodabljanju.");
            console.error(err);
        }
    };

    return (
        <div className="container">
            <h2 style={formStyles.title}>Uredi zdravilo</h2>
            <form onSubmit={handleSubmit} style={formStyles.form}>
                <label style={formStyles.label}>Naziv:</label>
                <input style={formStyles.input} name="name" value={form.name} onChange={handleChange} required />
                <label style={formStyles.label}>Opis:</label>
                <textarea style={formStyles.input} name="description" value={form.description} onChange={handleChange} />
                <button
                    type="submit"
                    style={{
                        ...buttonStyles.addButton,
                        marginTop: '20px',
                    }}
                >Shrani zdravilo
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}
