import React from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Feature from "./components/Feature";
import AddEmergencyContacts from "./pages/AddEmergencyContacts";

function App(){
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<Feature />} />
        <Route path="/add-contacts" element={<AddEmergencyContacts />} />
      </Routes>
    </BrowserRouter>
    )
}
export default App;