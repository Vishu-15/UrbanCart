import axios from 'axios';
axios.defaults.withCredentials = true; // Enable cookies with requests

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/user.jsx';

createRoot(document.getElementById('root')).render(
    <UserProvider>
      <App />
    </UserProvider>
)
