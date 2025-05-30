import React, { useEffect, useState } from 'react';
import callApi from "../utils/callApi.js";
import { useParams } from 'react-router-dom';

const AddFood = () => {
    const { id } = useParams(); // <-- get food id from route
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [initializing, setInitializing] = useState(true);

    const apiBase = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("accessToken");

    const isEditing = !!id;
    console.log(isEditing);
    console.log(id);
    useEffect(() => {
        if (isEditing) {
            const fetchFood = async () => {
                try {
                    const food = await callApi('GET', apiBase, `/food/${id}`, null, token);
                    setCategory(food.category);
                    setName(food.name);
                } catch (err) {
                    console.error('Error fetching food:', err);
                } finally {
                    setInitializing(false);
                }
            };
            fetchFood();
        } else {
            setInitializing(false);
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category || !name) return;

        setLoading(true);

        try {
            const req = { category, name };

            if (isEditing) {
                await callApi('PUT', apiBase, `/food/${id}`, req, token);
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

    if (initializing) return <p>Nalaganje...</p>;

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
