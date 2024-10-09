import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from "./components/Home";
import Consults from "./components/Consults";
import Doctors from "./components/Doctor";
import ConsultsMedico from "./components/ConsultsMedico";
import ExamePaciente from "./components/ExamePaciente";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/consults" element={<Consults />} />
        <Route path="/medicos" element={<Doctors />} />
        <Route path="/consultas/medico" element={<ConsultsMedico />} />
        <Route path="/resultado-exame" element={<ExamePaciente />} />
      </Routes>
    </Router>
  );
}

export default App;
