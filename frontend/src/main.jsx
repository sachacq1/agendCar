import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDom from 'react-dom';
import { AppRouter } from './routes/Routes.jsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/authContext.jsx';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';


createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
