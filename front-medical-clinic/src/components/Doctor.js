import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listDoctors, createDoctor, deleteDoctor } from "../services/api"; // Adicione deleteDoctor
import Navbar from "./Navbar";
import AddDoctorModal from './AddDoctorModal';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setMessage('You are not authenticated!');
                    navigate('/login');
                    return;
                }

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

        fetchDoctors();
    }, [navigate]);

    const handleDeleteDoctor = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setMessage('You are not authenticated!');
                navigate('/login');
                return;
            }

            const response = await deleteDoctor(id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 200) {
                setDoctors(doctors.filter(doctor => doctor.id !== id)); // Remove o médico da lista local
                setMessage('Médico deletado com sucesso.');
            } else {
                setMessage('Falha ao deletar o médico.');
            }
        } catch (error) {
            setMessage('Erro ao deletar o médico.');
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="bg-white p-8 rounded shadow-md max-w-4xl w-full">
                    <h2 className="text-2xl font-bold mb-6 text-center">Médicos</h2>
                    {message && <p className="text-red-500">{message}</p>}
                    {doctors.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">Nome</th>
                                    <th className="px-4 py-2">Especialidade</th>
                                    <th className="px-4 py-2">Ações</th>
                                </tr>
                                </thead>
                                <tbody>
                                {doctors.map((doctor) => (
                                    <tr key={doctor.id} className="border-b">
                                        <td className="px-4 py-2">{doctor.id}</td>
                                        <td className="px-4 py-2">{doctor.name}</td>
                                        <td className="px-4 py-2">{doctor.especialidade}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleDeleteDoctor(doctor.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>Nenhum médico cadastrado.</p>
                    )}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Adicionar Novo Médico
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <AddDoctorModal
                    onClose={() => setIsModalOpen(false)}
                    onDoctorAdded={(newDoctor) => setDoctors([...doctors, newDoctor])}
                />
            )}
        </>
    );
};

export default Doctors;
