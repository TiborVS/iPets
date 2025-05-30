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

import PetVisitsPage from './components/PetVisitsPage';
import AddVisitForm from './components/AddVisitForm';
import EditVisitForm from './components/EditVisitForm';
import PetMedicalTreatmentsPage from './components/PetMedicalTreatmentsPage';
import AddMedicalTreatmentForm from './components/AddMedicalTreatmentForm';
import EditMedicalTreatmentForm from './components/EditMedicalTreatmentForm';
import MedicationsPage from './components/MedicationsPage';
import AddMedicationForm from './components/AddMedicationForm';
import EditMedicationForm from './components/EditMedicationForm';

import { requestNotificationPermission } from "./utils/notifications";
import AddFood from "./components/AddFood.jsx";


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
        setTimeout(() => {
            requestNotificationPermission();
        }, 1000);
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
                                <Route path="medications" element={<MedicationsPage />} />
                                    <Route path="medications/add" element={<AddMedicationForm />} />
                                    <Route path="medications/edit/:id" element={<EditMedicationForm />} />
                                <Route path="pets" >
                                    <Route index element={<PetList />} />
                                    <Route path="new" element={<PetForm isEditing={false} />} />
                                    <Route path="edit/:id" element={<PetForm isEditing={true} />} />
                                    <Route path=":id" element={<PetDetail />} />
                                    <Route path="/pets/:id/visits" element={<PetVisitsPage />} />
                                    <Route path="/pets/:id/visits/add" element={<AddVisitForm />} />
                                    <Route path="/pets/:id/visits/edit/:visitId" element={<EditVisitForm />} />
                                    <Route path="/pets/:id/treatments" element={<PetMedicalTreatmentsPage />} />
                                    <Route path="/pets/:id/treatments/add" element={<AddMedicalTreatmentForm />} />
                                    <Route path="/pets/:id/treatments/edit/:treatmentId" element={<EditMedicalTreatmentForm />} />
                                </Route>
                                <Route path="food">
                                    <Route index element={<AddFood />} />
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