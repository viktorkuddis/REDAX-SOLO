import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
/*-----------------------------------------------------*/
/* BOOTSTRAP STYLE - BOOTSTRAP STYLE - BOOTSTRAP STYLE */
import 'bootstrap/dist/css/bootstrap.min.css';
/* BOOTSTRAP STYLE - BOOTSTRAP STYLE - BOOTSTRAP STYLE */
/*-----------------------------------------------------*/

import GlobalContext from '../context/GlobalContext';
import DarkModeBtn from './components/DarkModeBtn';

function App() {

  const { isDarkMode } = useContext(GlobalContext)
  return (

    <body
      data-bs-theme={isDarkMode ? "dark" : "light"}
      style={{ height: "100svh", width: "100vw" }}>

      <DarkModeBtn />
    </body>


  )
}

export default App
