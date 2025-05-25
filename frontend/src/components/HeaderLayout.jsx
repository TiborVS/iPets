import { Fragment, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, Outlet } from "react-router";
import LogoutButton from "./LogoutButton"

export default function HeaderLayout({ title }) {
    const { user, setUser } = useContext(UserContext);
    
    return (
        <>
            <div className="header">
                <h2><Link to="/">{title}</Link></h2>
                {user && <>
                    <span>Prijavljeni ste kot {user.email}</span>
                    <LogoutButton />
                </>
                }
                {!user && <>
                    <Link to="/login">Prijava </Link>
                    <Link to="/register">Registracija </Link>
                </>}
            </div>
            <hr />
            <Outlet />
        </>
    )
} 