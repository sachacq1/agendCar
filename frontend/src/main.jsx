import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDom from 'react-dom';
import AppRouter from './routes/Routes.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext.jsx';
import './index.css';


createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
