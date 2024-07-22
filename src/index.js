import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { GlobalProvider } from './context/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GlobalProvider>
        <HashRouter>
            <App />
        </HashRouter>
    </GlobalProvider>
);