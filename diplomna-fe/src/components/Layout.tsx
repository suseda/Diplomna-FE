import { Navigate, Outlet } from "react-router-dom";
import useBearStore from "../hooks/useZustand";

const Layout = () => {

    const isUserAuth = useBearStore((state) => state.isUserAuth);
    return (
        <div >
            { isUserAuth ? <Outlet /> : <Navigate to="/login" />}
        </div>
    )
}

export default Layout;