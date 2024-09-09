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
import CardSizeBtn from './components/CardSizeBtn'
import TryThings from './components/TryThings';
import LoadingScreen from './components/LoadingScreen';


import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstPage from './pages/FirstPage'
import NewsFeedPage from './pages/NewsFeedPage'
import MyStoriesPage from './pages/MyStoriesPage'
import PlanningPage from './pages/PlanningPage'
import MissingPage from './pages/MissingPage'
import Layout from './layout/Layout'

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

    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<FirstPage />} />
          <Route path="/feed" element={<NewsFeedPage />} />
          <Route path="/storys/" element={<MyStoriesPage />} />
          <Route path="/planering" element={<PlanningPage />} />
          <Route path="*" element={<MissingPage />} />
        </Route>

      </Routes>
    </BrowserRouter>

    // Allt är i classname card för att den ska ärva stil stom kommer med bootstraps tema. Annars ärver inte en div eller container någon stil.
    // Denna div agerar body
    // Denna div agerar body
    // Denna div agerar body
    // d-block för att ta bort flexen ett cad kommer med naturligt.
    // <div className='card rounded-0 border-0 d-block'
    //   data-bs-theme={isDarkMode ? "dark" : "light"}
    //   style={{
    //     height: "100svh", width: "100vw", overflow: "auto"
    //   }}>
    //   {/* Vanlig div som wrapper här för att bli av med flexen card kommer i */}


    //   {isLoading && <LoadingScreen />}

    //   <DarkModeBtn /> <CardSizeBtn />


    //   <div className=''>
    //     <TryThings />
    //   </div>




    // </div >


  )
}

export default App
