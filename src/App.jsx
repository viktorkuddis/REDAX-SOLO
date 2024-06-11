import { useContext, useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import GroupedFeed from './components/GroupedFeed'

import './App.css'
/*-----------------------------------------------------*/
/* BOOTSTRAP STYLE - BOOTSTRAP STYLE - BOOTSTRAP STYLE */
import 'bootstrap/dist/css/bootstrap.min.css';
/* BOOTSTRAP STYLE - BOOTSTRAP STYLE - BOOTSTRAP STYLE */
/*-----------------------------------------------------*/

import GlobalContext from '../context/GlobalContext';
import DarkModeBtn from './components/DarkModeBtn';
import TryThings from './components/TryThings';
import LoadingScreen from './components/LoadingScreen';

function App() {


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

    // Allt är i classname card för att den ska ärva stil stom kommer med bootstraps tema. Annars ärver inte en div eller container någon stil.
    // Denna div agerar body
    // Denna div agerar body
    // Denna div agerar body
    //d-block för att ta bort flexen ett cad kommer med naturligt.
    <div className='card rounded-0 border-0 d-block'
      data-bs-theme={isDarkMode ? "dark" : "light"}
      style={{
        height: "100svh", width: "100vw", overflow: "auto"
      }}>
      {/* Vanlig div som wrapper här för att bli av med flexen card kommer i */}


      {isLoading && <LoadingScreen />}

      <DarkModeBtn />


      <div className=''>
        <TryThings />
      </div>




    </div >


  )
}

export default App
