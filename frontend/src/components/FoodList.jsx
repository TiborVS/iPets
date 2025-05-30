import React, { useEffect, useState } from 'react';
import callApi from "../utils/callApi.js";
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h2>Hrana in prigrizki</h2>

            <button onClick={handleAdd} style={{ marginBottom: '15px' }}>
                Dodaj hrano
            </button>

            {loading && <p>Nalaganje...</p>}

            {!loading && foods.length === 0 && <p>Ni dodane hrane</p>}

            {!loading && foods.length > 0 && (
                <ul>
                    {foods.map((food) => (
                        <li key={food.id}>
                            {food.name} ({food.category === "FOOD" ? "Hrana" : "Prigrizek"})
                            <button onClick={() => handleEdit(food.id)} style={{ marginLeft: '10px' }}>
                                Uredi
                            </button>
                            <button
                                onClick={() => handleDelete(food.id)}
                                style={{ marginLeft: '5px' }}
                            >
                                Izbriši
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FoodList;
