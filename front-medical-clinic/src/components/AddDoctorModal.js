import React, { useState } from 'react';
import { createDoctor } from '../services/api';

const AddDoctorModal = ({ onClose, onDoctorAdded }) => {
    const [name, setName] = useState('');
    const [especialidade, setEspecialidade] = useState('');
    const [message, setMessage] = useState('');

    const handleAddDoctor = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await createDoctor(
                { name, especialidade },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 201) {
                onDoctorAdded(response.data);
                onClose(); // Fecha o modal após adicionar
            } else {
                setMessage('Falha ao adicionar médico.');
            }
        } catch (error) {
            setMessage('Erro ao adicionar médico.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">Adicionar Novo Médico</h2>
                {message && <p className="text-red-500 mb-4">{message}</p>}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Nome</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 px-3 py-2 rounded w-full"
                        placeholder="Nome do médico"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Especialidade</label>
                    <input
                        type="text"
                        value={especialidade}
                        onChange={(e) => setEspecialidade(e.target.value)}
                        className="border border-gray-300 px-3 py-2 rounded w-full"
                        placeholder="Especialidade do médico"
                    />
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleAddDoctor}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddDoctorModal;
