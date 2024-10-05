import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {listConsults} from "../services/api";
import Navbar from "./Navbar";

const Consults = () => {
    const [consultas, setConsultas] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchConsultas = async () => {
            try {
                // Obtenha o token do localStorage
                const token = localStorage.getItem('token');
                if (!token) {
                    setMessage('You are not authenticated!');
                    navigate('/login'); // Redireciona para o login se não tiver token
                    return;
                }

                // Chame a API de listagem de consultas
                const response = await listConsults({
                    headers: {
                        Authorization: `Bearer ${token}`, // Envie o token na requisição
                    },
                });
                if (response.status === 200) {
                    setConsultas(response.data); // Atualize o estado com as consultas recebidas
                } else {
                    setMessage('Failed to fetch consultas.');
                }
            } catch (error) {
                setMessage('Error fetching consultas.');
            }
        };

        fetchConsultas();
    }, [navigate]);

    return (
        <>
            <Navbar/>

            <div className="min-h-screen flex justify-center items-center">
                <div className="bg-white p-8 rounded shadow-md max-w-6xl w-full">
                    <h2 className="text-2xl font-bold mb-6 text-center">Consultas</h2>
                    {message && <p className="text-red-500">{message}</p>}
                    {consultas.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Hash</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2">Médico</th>
                                    <th className="px-4 py-2">Data da Consulta</th>
                                    <th className="px-4 py-2">Tipo</th>
                                </tr>
                                </thead>
                                <tbody>
                                {consultas.map((consulta) => (
                                    <tr key={consulta.id} className="border-b">
                                        <td className="px-4 py-2">{consulta.id}</td>
                                        <td className="px-4 py-2">{consulta.hash}</td>
                                        <td className="px-4 py-2">{consulta.status}</td>
                                        <td className="px-4 py-2">{consulta.medico.name}</td>
                                        <td className="px-4 py-2">
                                            {new Date(consulta.dataConsulta).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-2">
                                            {consulta.tipo || 'Não especificado'}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No consultas available.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Consults;
