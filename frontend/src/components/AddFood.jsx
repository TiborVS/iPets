import React, { useState } from 'react';
import callApi from "../utils/callApi.js";

const AddFood = () => {
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const apiBase = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("accessToken");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!category) {
            return;
        }

        setLoading(true);

        try {
            const req = {
                category: category,
                name: name,
            }
            await callApi('POST', apiBase, '/food', req, token);
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
            <h2>Add Food</h2>

            <label>Category</label>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            >
                <option value="">Select...</option>
                <option value="FOOD">FOOD</option>
                <option value="SNACK">SNACK</option>
            </select>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
            >

            </input>

            <button
                type="submit"
                disabled={loading}
            >
                {loading ? 'Adding...' : 'Add Food'}
            </button>
        </form>
    );
};

export default AddFood;
