import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoutes = () => {
    const token = localStorage.getItem("authentication");
    // this section is up for revue until I learn how to properly authenticate
    // token between react routes

    return token? <Outlet/> : <Navigate to="/login"/>;
};