import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import { ThemeProvider } from "./components/theme-provider.tsx"
import Login from './pages/Login.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Login />
    <ToastContainer />
    </ThemeProvider>
  </React.StrictMode>,
)
