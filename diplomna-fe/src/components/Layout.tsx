import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../hooks/useZustand";
import { useEffect } from "react";

const Layout = () => {

    const isUserAuth = useAuthStore((state) => state.isUserAuth);

    useEffect(() => {
    
      }, [isUserAuth]);

    return (
        <div >
            { isUserAuth ? <Outlet /> : <Navigate to="/login" />}
        </div>
    )
}

export default Layout;