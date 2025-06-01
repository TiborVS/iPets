import { useContext } from "react";
import PetList from "./PetList";
import { UserContext } from "../context/UserContext";
import Welcome from "./Welcome";

export default function Home() {

    const { user, setUser } = useContext(UserContext);

    if (user) {
        return (<PetList />)
    }
    else {
        return (<Welcome />)
    }
}
