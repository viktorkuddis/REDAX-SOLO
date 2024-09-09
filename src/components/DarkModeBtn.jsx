import React, { useContext } from 'react'

import GlobalContext from '../../context/GlobalContext'


const DarkModeBtn = () => {

    // hämtar context
    const { isDarkMode, setIsDarkMode } = useContext(GlobalContext)


    // sätter om tru/false beroende på vad som den var
    function handleDarkmode() {

        //Sparar inställningen lokalt:
        localStorage.setItem("isDarkMode", JSON.stringify(!isDarkMode))
        //uppdaterar kontext
        setIsDarkMode(!isDarkMode)
    }

    return (<>

        <button className='btn btn-outline-secondary btn-sm'
            onClick={handleDarkmode}>
            <i className="bi bi-circle-half"></i>
        </button>

        {/* Testtext: */}
        {/* Darkmode på?: {isDarkMode ? "Ja" : "Nej"} */}
    </>
    )
}

export default DarkModeBtn