import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {listConsults} from "../services/api";
import Navbar from "./Navbar";

const Home = () => {

    return (
        <>
            <Navbar/>
        </>
    );
};

export default Home;
