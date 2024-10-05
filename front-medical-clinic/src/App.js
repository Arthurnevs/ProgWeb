import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from "./components/Home";
import Consults from "./components/Consults";
import Doctors from "./components/Doctor";

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
      </Routes>
    </Router>
  );
}

export default App;
