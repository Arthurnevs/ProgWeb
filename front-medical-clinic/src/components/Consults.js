import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listConsults, getConsultById, listDoctors, createConsult } from '../services/api'; // Adicionar createConsult e listDoctors
import Navbar from './Navbar';

/**
 * Este componente é responsável por listar, criar e visualizar detalhes de consultas médicas. Ele faz as seguintes ações principais:
 *
 * Listagem de consultas: Carrega uma lista de consultas disponíveis ao usuário após verificar o token de autenticação.
 * Visualização de detalhes: Permite ao usuário clicar em uma consulta para ver mais detalhes, exibidos em um modal.
 * Criação de consultas: Fornece uma opção para criar uma nova consulta, abrindo um modal onde o usuário seleciona o médico e a data da consulta.
 *
 */
const Consults = () => {
    const [consultas, setConsultas] = useState([]);
    const [doctors, setDoctors] = useState([]); // Adicionar médicos ao estado
    const [message, setMessage] = useState('');
    const [selectedConsult, setSelectedConsult] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false); // Estado para exibir o modal de criação
    const [medicoId, setMedicoId] = useState(''); // Estado para o ID do médico selecionado
    const [date, setDate] = useState(''); // Estado para a data da consulta
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

                const response = await listConsults({
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

    // Buscar a lista de médicos quando o modal de criação é aberto
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await listDoctors({
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.status === 200) {
                    setDoctors(response.data);
                } else {
                    setMessage('Failed to fetch doctors.');
                }
            } catch (error) {
                setMessage('Error fetching doctors.');
            }
        };

        if (showCreateModal) {
            fetchDoctors();
        }
    }, [showCreateModal]);

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
                setShowModal(true);
            } else {
                setMessage('Failed to fetch consult details.');
            }
        } catch (error) {
            setMessage('Error fetching consult details.');
        }
    };

    const handleCreateConsult = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await createConsult({ medicoId, date }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 201) {
                setMessage('Consulta criada com sucesso!');
                setShowCreateModal(false);
            } else {
                setMessage('Falha ao criar consulta.');
            }
        } catch (error) {
            setMessage('Erro ao criar consulta.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex justify-center items-center">
                <div className="bg-white p-8 rounded shadow-md max-w-6xl w-full">
                    <h2 className="text-2xl font-bold mb-6 text-center">Consultas</h2>
                    {message && <p className="text-red-500">{message}</p>}
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
                    >
                        Criar Consulta
                    </button>
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

            {/* Modal de criação de consulta */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h3 className="text-xl font-bold mb-4">Criar Nova Consulta</h3>
                        <div className="mb-4">
                            <label htmlFor="medicoId" className="block mb-2">Selecione o Médico</label>
                            <select
                                id="medicoId"
                                className="border border-gray-300 p-2 w-full rounded"
                                value={medicoId}
                                onChange={(e) => setMedicoId(e.target.value)}
                            >
                                <option value="">Selecione</option>
                                {doctors.map((doctor) => (
                                    <option key={doctor.id} value={doctor.id}>
                                        {doctor.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="date" className="block mb-2">Data da Consulta</label>
                            <input
                                id="date"
                                type="datetime-local"
                                className="border border-gray-300 p-2 w-full rounded"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={handleCreateConsult}
                            className="bg-green-500 text-white px-4 py-2 rounded"
                        >
                            Criar
                        </button>
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                            onClick={() => setShowCreateModal(false)}
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal para exibir os detalhes da consulta */}
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

export default Consults;
