import React, {useState} from 'react';
import callApi from "../utils/callApi.js";

const AddFood = ({ food = null }) => {
    const [category, setCategory] = useState(food?.category || '');
    const [name, setName] = useState(food?.name || '');
    const [loading, setLoading] = useState(false);
    const apiBase = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("accessToken");

    const isEditing = !!food;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category || !name) return;

        setLoading(true);

        try {
            const req = { category, name };

            if (isEditing) {
                await callApi('PUT', apiBase, `/food/${food.id}`, req, token);
            } else {
                await callApi('POST', apiBase, '/food', req, token);
            }

            setCategory('');
            setName('');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isEditing ? 'Uredi hrano' : 'Dodaj hrano'}</h2>

            <label>Kategorija</label>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            >
                <option value="">Select...</option>
                <option value="FOOD">Hrana</option>
                <option value="SNACK">Prigrizek</option>
            </select>

            <label>Ime</label>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <button type="submit" disabled={loading}>
                {loading ? (isEditing ? 'Posodabljanje...' : 'Dodajanje...') : (isEditing ? 'Posodobi hrano' : 'Dodaj hrano')}
            </button>
        </form>
    );
};

export default AddFood;
