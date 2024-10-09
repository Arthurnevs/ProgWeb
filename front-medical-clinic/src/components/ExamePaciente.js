import React, { useState, useEffect } from 'react';
import { getConsultByHash } from "../services/api";

const ExamePaciente = () => {
    const [hash, setHash] = useState('');
    const [consulta, setConsulta] = useState(null);
    const [message, setMessage] = useState('');

    const handleSearch = async () => {
        try {
            const response = await getConsultByHash(hash);
            if (response.status === 200) {
                setConsulta(response.data.consulta);
                setMessage('');
            } else {
                setMessage('Consulta não encontrada.');
            }
        } catch (error) {
            setMessage('Erro ao buscar a consulta.');
        }
    };


    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-md max-w-lg w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Resultado do Exame</h2>
                <div className="mb-4">
                    <label htmlFor="hash" className="block text-gray-700 mb-2">
                        Insira o código da consulta (hash):
                    </label>
                    <input
                        id="hash"
                        type="text"
                        className="border border-gray-300 p-2 w-full rounded"
                        value={hash}
                        onChange={(e) => setHash(e.target.value)}
                    />
                </div>
                <button
                    onClick={async () => handleSearch()}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Buscar
                </button>
                {message && <p className="text-red-500 mt-4">{message}</p>}
                {consulta && (
                    <div className="mt-6">
                        <h3 className="text-xl font-bold mb-4">Detalhes da Consulta</h3>
                        <p><strong>ID:</strong> {consulta.id}</p>
                        <p><strong>Status:</strong> {consulta.status}</p>
                        <p><strong>Data da Consulta:</strong> {new Date(consulta.dataConsulta).toLocaleString()}</p>
                        <p><strong>Médico:</strong> {consulta.medico?.name || 'Médico não disponível'}</p>
                        <p><strong>Resultado do Exame (Laudo):</strong> <span className="text-green-500">{consulta.laudo || 'Nenhum laudo disponível'}</span></p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExamePaciente;
