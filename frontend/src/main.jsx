import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import PetList from './components/PetList';
import PetForm from './components/PetForm';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="pets" >
          <Route index element={<PetList />} />
          <Route path="new" element={<PetForm isEditing={false} />} />
          <Route path="edit/:id" element={<PetForm isEditing={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
