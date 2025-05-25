import { useContext } from "react";
import PetList from "./PetList";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router";

export default function Home() {

    const { user, setUser } = useContext(UserContext);

    if (user) {
        return (<PetList />)
    }
    else {
        //return (<Navigate to='/login' />)
        return (<h1>Placeholder</h1>)
    }
}
