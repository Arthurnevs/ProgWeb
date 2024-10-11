import React    from 'react';
import Navbar from "./Navbar";

/**
 *
 * Este componente exibe a barra de navegação e serve como a tela inicial da aplicação. Ele não possui lógica complexa no momento,
 * apenas carrega o componente de navegação (Navbar) para garantir que o usuário tenha acesso aos menus principais
 * da aplicação.
 *
 */
const Home = () => {

    return (
        <>
            <Navbar/>
        </>
    );
};

export default Home;
