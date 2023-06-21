import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ProSidebarProvider>
          <App />
        </ProSidebarProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
