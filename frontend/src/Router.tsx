import {
    BrowserRouter,
    Route,
    Routes,
    Navigate,
    } from 'react-router-dom';

import  App from './pages/App';
import  Admin  from './pages/Admin';
import  Dashboard  from './pages/Dashboard';
import  Login  from './pages/Login';
import NotFound from './pages/NotFound';



    type Props = {
        element: JSX.Element;
    };


    function PrivateRoute({ element }: Props) {
        const isAuthenticated = localStorage.getItem('account') !== null;
        return isAuthenticated ? element : <Navigate to="/" />;
    }

export function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/app" element={
                    <PrivateRoute>
                        <App />
                    </PrivateRoute>
                } />
                <Route path="/admin" element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>
                } />
                <Route path="/dashboard" element={
                    <PrivateRoute>
                        <Dashboard />
                    </PrivateRoute>
                } />
                <Route path="/" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}