// ProtectedRoute.jsx

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ canActivate, redirectPath = '/' }) => {
    // Si canActivate es falso, redirige al usuario a redirectPath
    if (!canActivate) {
        return <Navigate to={redirectPath} replace />;
    }
    // Si canActivate es verdadero, renderiza los componentes hijos (Outlet)
    return <Outlet />;
};

export default ProtectedRoute;
