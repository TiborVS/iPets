import {Fragment, useContext, useState} from "react";
import {UserContext} from "../context/UserContext";
import {Link, Outlet} from "react-router";
import LogoutButton from "./LogoutButton";
import VoiceControl from "./VoiceControl.jsx";
import {offWhite, primaryColor} from "../utils/Theme.js";

const navbarWrapperStyle = {
    width: '100%',
    height: '70px',
    backgroundColor: primaryColor,
    padding: '0 30px',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
    color: offWhite,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};

const navbarLeftStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '30px',
};

const navbarInnerStyle = {
    display: 'flex',
    gap: '30px',
};

const titleStyle = {
    color: offWhite,
    fontWeight: 'bold',
    fontSize: '1.4rem',
    textDecoration: 'none',
};

const linkContainerStyle = {
    display: 'flex',
    gap: '30px',
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

const userContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
};

export default function HeaderLayout({title}) {
    const {user} = useContext(UserContext);
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
            <div style={navbarWrapperStyle}>
                <div style={navbarLeftStyle}>
                    <Link to="/" style={titleStyle}>{title}</Link>
                    {user && (
                        <div style={linkContainerStyle}>
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
                    )}
                </div>

                <div style={userContainerStyle}>
                    {user ? (
                        <>
                            <span>Prijavljeni ste kot {user.email}</span>
                            <LogoutButton />
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={linkStyle}>Prijava</Link>
                            <Link to="/register" style={linkStyle}>Registracija</Link>
                        </>
                    )}
                </div>
            </div>

            {user ? (<VoiceControl/>) : null}
            <hr/>
            <Outlet/>
        </>
    );
}
