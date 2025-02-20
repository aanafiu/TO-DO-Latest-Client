import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./Component/Home";
import HomeLayout from "./Layout/HomeLayout";
import Login from "./Component/Authentication/Login";
import Dashboard from "./Component/Pages/Dashboard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      {/* Home Route */}
      <Route path="/" element={<HomeLayout></HomeLayout>}>
      {/* Outlets */}
        <Route index element={<Home></Home>}></Route>
        <Route path="/user/login" element={<Login/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/addnewtask" element={<Login/>}></Route>
      </Route>

      {/* Login */}

      <Route
        path="/test"
        element={<div className="text-2xl center bg-red-300">i am testing</div>}
      />
    </Routes>
  </BrowserRouter>
);
