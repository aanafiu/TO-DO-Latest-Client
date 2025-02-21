import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Component/Home";
import HomeLayout from "./Layout/HomeLayout";
import Login from "./Component/Authentication/Login";
import Dashboard from "./Component/Pages/Dashboard";
import AuthProvider from "./Component/Authentication/AuthProvider";
import Register from "./Component/Authentication/Register";
import PrivateRoutes from "./Component/Authentication/PrivateRoutes";
import Error from "./Component/Pages/Error";
import PublicRoutes from "./Component/Authentication/PublicRoutes";


ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<HomeLayout />} >
          <Route index element={<Home />} />
          <Route path="/user/login" element={<PublicRoutes><Login /></PublicRoutes>} />      
          <Route path="/user/register" element={<PublicRoutes><Register /></PublicRoutes>} />  {/* ✅ Make it public */}
          <Route path="/dashboard" element={<PrivateRoutes><Dashboard /></PrivateRoutes>} /> {/* ✅ Make Dashboard Private */}
          <Route path="/addnewtask" element={<PrivateRoutes><Login /></PrivateRoutes>} /> {/* Example Private Route */}
        </Route>

        <Route path="*" element={<Error />} />
        {/* Test Route */}
        <Route path="/test" element={<div className="text-2xl center bg-red-300">i am testing</div>} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
