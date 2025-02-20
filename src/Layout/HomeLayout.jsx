import { Outlet } from "react-router";
import Home from "../Component/Home";
import Navbar from "../Component/Navbar";

const HomeLayout = () => {
  return (
    <div className="bg-newP">
      <nav className="py-3 border-b border-newT">
        <Navbar></Navbar>
      </nav>
      <Outlet></Outlet>
    </div>
  );
};

export default HomeLayout;
