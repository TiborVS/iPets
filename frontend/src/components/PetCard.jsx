import { useNavigate } from "react-router"

export default function PetCard({pet}) {

    const API_URL="http://localhost:3000"
    const navigate = useNavigate();

    return(
        <div className="pet">
            <img src={API_URL + "/images/" + pet.imageId} alt={"A picture of " + pet.name} />
            <a href={"/pets/" + pet.id}><p className="name" >{pet.name}</p></a>
            <span className="species">{pet.species}</span>
            <span> | </span>
            <span className="breed">{pet.breed}</span>
        </div>
    )
}