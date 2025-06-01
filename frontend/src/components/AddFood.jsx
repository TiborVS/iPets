import React, { useEffect, useState } from 'react';
import callApi from "../utils/callApi.js";
import { useParams } from 'react-router-dom';
import {primaryColor, offWhite, buttonStyles} from "../utils/Theme.js"; // assumed location of color vars

const styles = {
    form: {
        maxWidth: '500px',
        margin: '40px auto',
        padding: '24px',
        borderRadius: '12px',
        backgroundColor: offWhite,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
    },
    title: {
        textAlign: 'center',
        color: primaryColor,
        marginBottom: '24px',
    },
    label: {
        marginTop: '12px',
        marginBottom: '6px',
        fontWeight: 'bold',
        color: primaryColor,
    },
    input: {
        padding: '10px',
        borderRadius: '6px',
        border: `1px solid ${primaryColor}`,
        fontSize: '14px',
        backgroundColor: '#fff',
    },
    loadingText: {
        textAlign: 'center',
        fontSize: '16px',
        color: primaryColor,
        marginTop: '40px',
    },
};

const AddFood = () => {
    const { id } = useParams();
    const [category, setCategory] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [initializing, setInitializing] = useState(true);

    const apiBase = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("accessToken");

    const isEditing = !!id;

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

    if (initializing) return <p style={styles.loadingText}>Nalaganje...</p>;

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.title}>{isEditing ? 'Uredi hrano' : 'Dodaj hrano'}</h2>

            <label style={styles.label}>Ime</label>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={styles.input}
            />

            <label style={styles.label}>Kategorija</label>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                style={styles.input}
            >
                <option value="">Izberi...</option>
                <option value="FOOD">Hrana</option>
                <option value="SNACK">Prigrizek</option>
            </select>

            <button type="submit" disabled={loading} style={{...buttonStyles.addButton, marginTop: '20px'}}>
                {loading
                    ? isEditing ? 'Posodabljanje...' : 'Dodajanje...'
                    : isEditing ? 'Posodobi hrano' : 'Dodaj hrano'}
            </button>
        </form>
    );
};

export default AddFood;