import { useNavigate } from "react-router"

export default function PetCard({pet}) {

    return(
        <div className="pet">
            <img src={import.meta.env.VITE_API_URL + "/images/" + pet.imageId} alt={"A picture of " + pet.name} />
            <a href={"/pets/" + pet.id}><p className="name" >{pet.name}</p></a>
            <span className="species">{pet.species}</span>
            <span> | </span>
            <span className="breed">{pet.breed}</span>
        </div>
    )
}