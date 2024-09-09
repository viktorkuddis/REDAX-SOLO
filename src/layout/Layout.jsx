import React from 'react'

import Header from './Header';
import Footer from './Footer';


import { useContext, useState, useEffect } from 'react'
import GlobalContext from '../../context/GlobalContext';

import DarkModeBtn from '../components/DarkModeBtn';
import CardSizeBtn from '../components/CardSizeBtn'
import TryThings from '../components/TryThings';
import LoadingScreen from '../components/LoadingScreen';


import { Link, Outlet } from "react-router-dom";

const Layout = () => {

    const { isDarkMode } = useContext(GlobalContext)
    //loadingScreen:
    const [isLoading, setIsLoading] = useState(true);

    //loadingScreen timeout:
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        // Rensa timern när komponenten avmonteras
        return () => clearTimeout(timer);
    }, []); // Använder en tom beroendelista för att bara köra effekten vid montering



    return (
        <>


            {isLoading && <LoadingScreen />}


            {/*
            DENNA DIV AGERAR BODY
            Allt är i className card för att den ska ärva stil stom kommer med bootstraps tema. 
            Annars ärver inte en div eller container någon stil.
            D-block för att ta bort flexen ett cad kommer med naturligt. 
            */}
            <div className='card rounded-0 border-0 d-block'
                data-bs-theme={isDarkMode ? "dark" : "light"}
                style={{
                    height: "100svh", width: "100vw", overflow: "auto"
                }}>
                {/* Vanlig div som wrapper här för att bli av med flexen card kommer i */}

                <div className='d-flex flex-column' style={{ minHeight: "100svh" }}>
                    <Header isDarkMode={isDarkMode} />

                    {/* height sätts här bara för att få in en bestämd storlek */}
                    <div className='flex-grow-1 ' style={{ height: "80vh" }} >
                        <Outlet />
                    </div>

                    <Footer />
                </div>









            </div >
        </>

    )
}

export default Layout