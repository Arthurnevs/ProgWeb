import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Este componente exibe uma barra de navegação que varia de acordo com o tipo de usuário logado.
 * Os tipos de usuários suportados são "user" e "medico".
 * Além disso, fornece uma opção de logout.
 */
const Navbar = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const type = localStorage.getItem('userType'); // Recuperar o tipo de usuário do localStorage
    setUserType(type);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove o token do localStorage
    localStorage.removeItem('userType'); // Remove o tipo de usuário do localStorage
    navigate('/login'); // Redireciona para a página de login
  };

  return (
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto">
          <ul className="flex space-x-4">
            {/* Exibe a listagem de médicos e consultas apenas para usuários comuns */}
            {userType === 'user' && (
                <>
                  <li>
                    <a href="/medicos" className="text-white hover:text-gray-300">
                      Listagem de Médicos
                    </a>
                  </li>
                  <li>
                    <a href="/consults" className="text-white hover:text-gray-300">
                      Listagem de Consultas
                    </a>
                  </li>
                </>
            )}

            {/* Exibe apenas a listagem de consultas para médicos */}
            {userType === 'medico' && (
                <li>
                  <a href="/consultas/medico" className="text-white hover:text-gray-300">
                    Listagem de Consultas
                  </a>
                </li>
            )}

            <li>
              <button onClick={handleLogout} className="text-white hover:text-gray-300">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
  );
};

export default Navbar;
