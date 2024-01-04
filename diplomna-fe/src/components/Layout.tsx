import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../hooks/useZustand";

const Layout = () => {

    const isUserAuth = useAuthStore((state) => state.isUserAuth);
    return (
        <div >
            { isUserAuth ? <Outlet /> : <Navigate to="/login" />}
        </div>
    )
}

export default Layout;