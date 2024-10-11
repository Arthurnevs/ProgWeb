import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listConsultsByDoctor, getConsultById, addLaudo } from '../services/api';
import Navbar from './Navbar';

/**
 *
 * É responsável por gerenciar e exibir a lista de consultas de um médico. Ele permite que
 * os médicos visualizem suas consultas, acessem detalhes específicos de cada consulta e adicionem laudos (relatórios)
 * relacionados a essas consultas.
 */
const ConsultsMedico = () => {
    const [consultas, setConsultas] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedConsult, setSelectedConsult] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [laudo, setLaudo] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchConsultas = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setMessage('You are not authenticated!');
                    navigate('/login');
                    return;
                }

                const medicoId = localStorage.getItem('userId');
                const response = await listConsultsByDoctor(medicoId, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    setConsultas(response.data);
                } else {
                    setMessage('Failed to fetch consultas.');
                }
            } catch (error) {
                setMessage('Error fetching consultas.');
            }
        };

        fetchConsultas();
    }, [navigate]);

    const handleConsultClick = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await getConsultById(id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setSelectedConsult(response.data);
                setLaudo(response.data.laudo || ''); // Carrega o laudo existente, se houver
                setShowModal(true);
            } else {
                setMessage('Failed to fetch consult details.');
            }
        } catch (error) {
            setMessage('Error fetching consult details.');
        }
    };

    const handleAddLaudo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await addLaudo(selectedConsult.id, { laudo }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setMessage('Laudo adicionado com sucesso!');
                setShowModal(false);
                setLaudo(''); // Limpa o campo de laudo após a adição
            } else {
                setMessage('Falha ao adicionar laudo.');
            }
        } catch (error) {
            setMessage('Erro ao adicionar laudo.');
        }
    };

    return (
        <>
            <Navbar />
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
                                    <th className="px-4 py-2">Ação</th>
                                </tr>
                                </thead>
                                <tbody>
                                {consultas.map((consulta) => (
                                    <tr
                                        key={consulta.id}
                                        className="border-b cursor-pointer"
                                        onClick={() => handleConsultClick(consulta.id)}
                                    >
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
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleConsultClick(consulta.id)}
                                                className="bg-blue-500 text-white px-2 py-1 rounded"
                                            >
                                                 Adicionar Laudo
                                            </button>
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

            {/* Modal para exibir os detalhes da consulta e adicionar laudo */}
            {showModal && selectedConsult && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h3 className="text-xl font-bold mb-4">Detalhes da Consulta</h3>
                        <p><strong>ID:</strong> {selectedConsult.id}</p>
                        <p><strong>Hash:</strong> {selectedConsult.hash}</p>
                        <p><strong>Status:</strong> {selectedConsult.status}</p>
                        <p><strong>Data da Consulta:</strong> {new Date(selectedConsult.dataConsulta).toLocaleString()}</p>
                        <p><strong>Tipo:</strong> {selectedConsult.tipo || 'Não especificado'}</p>
                        <p><strong>Médico ID:</strong> {selectedConsult.medicoId}</p>
                        <p><strong>Laudo:</strong> <span className="text-red-500">{selectedConsult.laudo || 'Nenhum laudo disponível'}</span></p>

                        <div className="mb-4">
                            <label htmlFor="laudo" className="block mb-2">Adicionar Laudo</label>
                            <textarea
                                id="laudo"
                                className="border border-gray-300 p-2 w-full rounded"
                                value={laudo}
                                onChange={(e) => setLaudo(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={handleAddLaudo}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Adicionar
                        </button>
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => setShowModal(false)}
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConsultsMedico;
