import { Link } from "react-router";

export default function PetCard({pet}) {

    return(
        <div className="pet">
            <img src={pet.image} alt={"Slika živali " + pet.name} />
            <Link to={"/pets/" + pet.id}><p className="name">{pet.name}</p></Link>
            <span className="species">{pet.species}</span>
            <span> | </span>
            <span className="breed">{pet.breed}</span>
        </div>
    )
}