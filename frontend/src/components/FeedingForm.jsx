import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import callApi from "../utils/callApi.js";
import { formStyles, buttonStyles } from "../utils/Theme.js";

const FeedingForm = () => {
    const { petId } = useParams();
    const navigate = useNavigate();

    const [feedingTime, setFeedingTime] = useState(
        new Date().toISOString().slice(0, 16) // YYYY-MM-DDTHH:mm for input type="datetime-local"
    );
    const [foodId, setFoodId] = useState("");
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingFoods, setLoadingFoods] = useState(true);

    const apiBase = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("accessToken");

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const data = await callApi("GET", apiBase, "/food", null, token);
                setFoods(data);
                if (data.length > 0) {
                    setFoodId(data[0].id); // Select first food by default
                }
            } catch (error) {
                console.error("Failed to fetch foods", error);
            } finally {
                setLoadingFoods(false);
            }
        };

        fetchFoods();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!foodId) {
            alert("Prosimo, izberite hrano.");
            return;
        }

        setLoading(true);

        try {
            const reqBody = {
                petId,
                feedingTime,
                foodId,
            };

            await callApi("POST", apiBase, "/food/feeding", reqBody, token);

            alert("Hranjenje uspešno dodano!");
            navigate(-1);
        } catch (error) {
            console.error("Napaka pri dodajanju hranjenja:", error);
            alert("Prišlo je do napake.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={formStyles.form}>
            <h2 style={formStyles.title}>Dodaj hranjenje za žival</h2>

            <label style={formStyles.label}>Čas hranjenja</label>
            <input
                type="datetime-local"
                value={feedingTime}
                onChange={(e) => setFeedingTime(e.target.value)}
                required
                style={formStyles.input}
            />

            <label style={formStyles.label}>Hrana</label>
            {loadingFoods ? (
                <p style={formStyles.loadingText}>Nalaganje hrane...</p>
            ) : (
                <select
                    value={foodId}
                    onChange={(e) => setFoodId(e.target.value)}
                    required
                    style={formStyles.input}
                >
                    {foods.map((food) => (
                        <option key={food.id} value={food.id}>
                            {food.name} ({food.category === "FOOD" ? "Hrana" : "Prigrizek"})
                        </option>
                    ))}
                </select>
            )}

            <button
                type="submit"
                disabled={loading || loadingFoods}
                style={{
                    ...buttonStyles.addButton,
                    ...(loading || loadingFoods ? buttonStyles.disabledButton : {}),
                    marginTop: '20px',
                }}
            >
                {loading ? "Dodajanje..." : "Dodaj hranjenje"}
            </button>
        </form>
    );
};

export default FeedingForm;
