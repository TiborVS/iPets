import { Link, useNavigate } from "react-router-dom";
import React from "react";

export default function PetCard({ pet }) {
    const navigate = useNavigate();

    const handleAddFeeding = () => {
        navigate(`/food/feed/${pet.id}`);
    };

    return (
        <div className="pet">
            <img src={pet.image} alt={"Slika živali " + pet.name} />
            <Link to={"/pets/" + pet.id}>
                <p className="name">{pet.name}</p>
            </Link>
            <span className="species">{pet.species}</span>
            <span> | </span>
            <span className="breed">{pet.breed}</span>

            <button
                onClick={handleAddFeeding}
                style={{ display: "block", marginTop: "10px" }}
            >
                Dodaj hranjenje
            </button>
        </div>
    );
}
