import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <ul className="flex space-x-4">
          <li>
            <a
              href="/medicos"
              className="text-white hover:text-gray-300"
            >
              Listagem de Médicos
            </a>
          </li>
          <li>
            <a
              href="/consults"
              className="text-white hover:text-gray-300"
            >
              Listagem de Consultas
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
