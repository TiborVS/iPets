import React, { useEffect, useState } from 'react';
import callApi from "../utils/callApi.js";

const FoodList = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiBase = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
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

        fetchFoods();
    }, []);

    if (loading) return <p>Loading...</p>;

    if (foods.length === 0) return <p>No food items found.</p>;

    return (
        <div>
            <h2>Hrana in prigirzki</h2>
            <ul>
                {foods.map((food) => (
                    <li key={food.id}>
                        {food.name} ({food.category === "FOOD"?"Hrana":"Prigrizek"})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FoodList;
