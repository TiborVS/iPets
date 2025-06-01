import {Fragment, useContext, useState} from "react";
import { UserContext } from "../context/UserContext";
import { Link, Outlet } from "react-router";
import LogoutButton from "./LogoutButton"
import VoiceControl from "./VoiceControl.jsx";
import {offWhite, primaryColor} from "../utils/Theme.js";

const navbarStyle = {
    width: '100%',
    backgroundColor: primaryColor,
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    padding: '15px 0',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
};

const linkStyle = {
    color: offWhite,
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.1rem',
    padding: '8px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    cursor: 'pointer',
};


export default function HeaderLayout({ title }) {
    const { user, setUser } = useContext(UserContext);
    const [hoveredLink, setHoveredLink] = useState(null);

    const getLinkStyle = (linkName) => {
        if (hoveredLink === linkName) {
            return {
                ...linkStyle,
                backgroundColor: '#3498db',
                color: 'white',
            };
        }
        return linkStyle;
    };
    
    return (
        <>
            <div style={navbarStyle}>
                <Link
                    to="/pets"
                    style={getLinkStyle('pets')}
                    onMouseEnter={() => setHoveredLink('pets')}
                    onMouseLeave={() => setHoveredLink(null)}
                >
                    Živali
                </Link>

                <Link
                    to="/medications"
                    style={getLinkStyle('medications')}
                    onMouseEnter={() => setHoveredLink('medications')}
                    onMouseLeave={() => setHoveredLink(null)}
                >
                    Zdravila
                </Link>

                <Link
                    to="/food/all"
                    style={getLinkStyle('food')}
                    onMouseEnter={() => setHoveredLink('food')}
                    onMouseLeave={() => setHoveredLink(null)}
                >
                    Hrana
                </Link>
            </div>
            <div className="header">
                <h2><Link to="/">{title}</Link></h2>
                {user && <>
                    <span>Prijavljeni ste kot {user.email}</span>
                    <LogoutButton />
                    <VoiceControl />
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