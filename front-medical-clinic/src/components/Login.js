import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {loginUser} from "../services/api";

const Login = () => {
    const [document, setDocument] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser({ document, password });
            if (response.status === 200) {
                const data = await response.data;
                localStorage.setItem('token', data.token);
                setMessage('Login bem-sucedido!');
                navigate('/home');
            }
        } catch (error) {
            setMessage('Falha no login. Verifique suas credenciais.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
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
                    Login
                </button>
                <p className="mt-4 text-center">
                    Don't have an account?{' '}
                    <a href="/register" className="text-blue-500 hover:underline">Register</a>
                </p>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
