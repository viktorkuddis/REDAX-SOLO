import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//Context
import { GlobalContextProvider } from '../context/GlobalContext.jsx'




ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalContextProvider>
    < React.StrictMode >
      <App />
    </React.StrictMode >
  </GlobalContextProvider>
)
