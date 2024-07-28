import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import App from "./pages/App";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

type Props = {
  element: JSX.Element;
};

function PrivateRoute({ element }: Props) {
  const isAuthenticated = localStorage.getItem("account") !== null;
  return isAuthenticated ? element : <Navigate to="/" />;
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<PrivateRoute element={<App />} />} />
        <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
