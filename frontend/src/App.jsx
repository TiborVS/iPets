import { BrowserRouter, Routes, Route } from "react-router";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PetList from './components/PetList';
import PetForm from './components/PetForm';
import HeaderLayout from './components/HeaderLayout';
import PetDetail from "./components/PetDetail";
import { useState, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { jwtDecode } from "jwt-decode";
import LoginGate from "./components/LoginGate";

export default function App() {

    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            const decoded = jwtDecode(token);
            setUser({
                id: decoded.id,
                email: decoded.email
            });
        }
        setReady(true);
    }, [])

    if (ready) {
        return (
            <UserContext value={{user, setUser}}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<HeaderLayout title={"iPets"} />}>
                            <Route index element={<Home />} />
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                            <Route element={<LoginGate />}>
                                <Route path="pets" >
                                    <Route index element={<PetList />} />
                                    <Route path="new" element={<PetForm isEditing={false} />} />
                                    <Route path="edit/:id" element={<PetForm isEditing={true} />} />
                                    <Route path=":id" element={<PetDetail />} />
                                </Route>
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </UserContext>
        )
    }
    else {
        return null;
    }
    
}