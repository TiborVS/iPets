import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Outlet } from "react-router";

export default function LoginGate() {

    const { user, setUser } = useContext(UserContext);

    if (user) {
        return (
            <Outlet />
        )
    }
    else {
        return (
            <p>Za to morate biti <Link to={"/login"}>prijavljeni</Link>.</p>
        )
    }

}