import { Link, useNavigate } from "react-router-dom";
import '../styles/PetCard.css'
import LazyImage from "./LazyImage";
import { buttonStyles } from "../utils/Theme";

export default function PetCard({ pet }) {
    const navigate = useNavigate();

    const handleAddFeeding = () => {
        navigate(`/food/feed/${pet.id}`);
    };

    return (
        <div className="pet pet-card">
            <Link to={"/pets/" + pet.id}>
                <LazyImage src={pet.image} alt={"Slika živali " + pet.name} />
            </Link>
            <div className="pet-info pet-card">
                <Link to={"/pets/" + pet.id}>
                    <p className="name">{pet.name}</p>
                </Link>
                <p className="species breed">
                    <span className="species">{pet.species}</span>
                    {pet.breed &&
                    <span className="breed"> ({pet.breed})</span>
                    }
                </p>
                

                <button
                    onClick={handleAddFeeding}
                    style={buttonStyles.addButton}
                >
                    Dodaj hranjenje
                </button>
            </div>
        </div>
    );
}
