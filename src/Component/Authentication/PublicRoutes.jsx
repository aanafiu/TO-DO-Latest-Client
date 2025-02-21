import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router";


const PublicRoutes = ({ children }) => {
    const { myDetails } = useContext(AuthContext);

    if (myDetails) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoutes;
