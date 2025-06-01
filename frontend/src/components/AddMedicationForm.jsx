import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import callApi from '../utils/callApi';
import {buttonStyles, formStyles} from "../utils/Theme.js";

export default function AddMedicationForm() {
    const [form, setForm] = useState({ name: '', description: '' });
    const [error, setError] = useState('');
    const token = localStorage.getItem("accessToken");
    const apiBase = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            await callApi('POST', apiBase, '/medications', { medication: form }, token);
            navigate('/medications');
        } catch (err) {
            setError("Napaka pri shranjevanju zdravila.");
            console.error(err);
        }
    };

    return (
        <div className="container">
            <h2 style={formStyles.title}>Dodaj zdravilo</h2>
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
                >Dodaj zdravilo
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
}
