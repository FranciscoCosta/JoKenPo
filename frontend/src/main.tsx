import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import { ThemeProvider } from "./components/theme-provider.tsx"
import { Router } from './Router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Router />
    <ToastContainer />
    </ThemeProvider>
  </React.StrictMode>,
)
