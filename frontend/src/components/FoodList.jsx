import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import callApi from "../utils/callApi.js";
import {buttonStyles, medicationStyles} from "../utils/Theme.js";

const styles = {
    container: {
        maxWidth: '600px',
        margin: '40px auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        fontFamily: 'sans-serif',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    foodItem: {
        backgroundColor: '#fff',
        padding: '14px',
        borderRadius: '8px',
        marginBottom: '16px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    foodTitle: {
        fontWeight: 'bold',
        color: '#222',
    },
};

const FoodList = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    const apiBase = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("accessToken");
    const navigate = useNavigate();

    useEffect(() => {
        fetchFoods();
    }, []);

    const fetchFoods = async () => {
        try {
            const data = await callApi('GET', apiBase, '/food', null, token);
            setFoods(data);
        } catch (err) {
            console.error("Failed to fetch foods", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Ste prepričani da želite odstraniti hrano?")) return;

        try {
            await callApi('DELETE', apiBase, `/food/${id}`, null, token);
            setFoods(currentFoods => currentFoods.filter(f => f.id !== id));
        } catch (err) {
            console.error("Failed to delete food", err);
        }
    };

    const handleEdit = (id) => {
        navigate(`/food/edit/${id}`);
    };

    const handleAdd = () => {
        navigate('/food/add');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Hrana in prigrizki</h2>
            <Link to={`/pets`} style={medicationStyles.backLink}>← Nazaj</Link>

            <div style={{ marginBottom: "20px" }}>
                <button
                    onClick={handleAdd}
                    style={buttonStyles.addButton}
                >
                    Dodaj hrano
                </button>
            </div>

            {loading && <p>Nalaganje...</p>}
            {!loading && foods.length === 0 && <p>Ni dodane hrane</p>}

            {!loading && foods.length > 0 && (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {foods.map((food) => (
                        <li key={food.id} style={styles.foodItem}>
                            <div style={styles.foodTitle}>
                                {food.name} ({food.category === "FOOD" ? "Hrana" : "Prigrizek"})
                            </div>
                            <div style={buttonStyles.actionButtons}>
                                <button
                                    onClick={() => handleEdit(food.id)}
                                    style={buttonStyles.addButton}
                                >
                                    Uredi
                                </button>
                                <button
                                    onClick={() => handleDelete(food.id)}
                                    style={buttonStyles.deleteButton}
                                >
                                    Izbriši
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FoodList;
