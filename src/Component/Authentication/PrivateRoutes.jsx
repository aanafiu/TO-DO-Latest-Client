import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

import Loading from "../Loading";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
    const { myDetails,loading} = useContext(AuthContext);
    const location = useLocation();
    if(loading)
    {
        return <Loading></Loading>
    }

    console.log(myDetails, "i am priv")


    if (!myDetails) {
        return <Navigate to="/user/login" state={ location.pathname} replace />;
    }
    return children;

};

export default PrivateRoutes;
