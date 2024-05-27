import { createContext, useState } from "react";

import React from 'react'


//skapar kontext och exporterar som default.
const GlobalContext = createContext()
export default GlobalContext;

//funtion som returnerar en provider av min kontext med prop destructad children:
export function GlobalContextProvider({ children }) {


    // ------------------------
    // Innehåll i context här:

    // hämtar info om darkmode från LS. om de inte finns så sätter darkmode på egen hand. 
    // fallback behöver vara false för annars kommer de sättas till true när man återbesöker sidan och får false från local storage.
    const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem("isDarkMode")) || false)


    // ------------------------
    // ------------------------
    // ------------------------

    //returnerar provider av min kontext som  omsluter children.
    //Värden skickas med i kontexten här.
    return (
        //provider av min kontext
        <GlobalContext.Provider value={{ isDarkMode, setIsDarkMode }}>

            {children}

        </GlobalContext.Provider>
    );
}