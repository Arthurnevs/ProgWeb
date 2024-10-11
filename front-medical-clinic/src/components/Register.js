import React, { useState } from 'react';
import {registerUser} from "../services/api";

/**
 * Componente de Registro de Usuário
 *
 * Este componente é responsável por renderizar o formulário de registro de um novo usuário.
 * O formulário coleta informações como nome, documento e senha, e ao ser submetido, envia
 * uma requisição para registrar o usuário no backend. Uma mensagem de sucesso ou erro é exibida
 * com base no resultado da tentativa de registro.
 */
const Register = () => {
    const [name, setName] = useState('');
    const [document, setDocument] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser({ name, document, password });
            setMessage('Usuário registrado com sucesso!');
        } catch (error) {
            setMessage('Erro ao registrar o usuário');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Register</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2">Name</label>
                    <input
                        id="name"
                        type="text"
                        className="border border-gray-300 p-2 w-full rounded"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="document" className="block mb-2">Document</label>
                    <input
                        id="document"
                        type="text"
                        className="border border-gray-300 p-2 w-full rounded"
                        value={document}
                        onChange={(e) => setDocument(e.target.value)}
                        placeholder="Enter your document"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block mb-2">Password</label>
                    <input
                        id="password"
                        type="password"
                        className="border border-gray-300 p-2 w-full rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
                >
                    Register
                </button>
                <p className="mt-4 text-center">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">Login</a>
                </p>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Register;
