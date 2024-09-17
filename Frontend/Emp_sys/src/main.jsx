import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom';

axios.defaults.baseURL="http://localhost:5000";
axios.defaults.withCredentials=true;

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <BrowserRouter>
        <App />
        </BrowserRouter>
    );
}
