import { Outlet } from "react-router";

import Navbar from "../Component/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../Component/Footer";



const HomeLayout = () => {

  return (
    <div className="bg-newP relative">
        <div><Toaster/></div>
      <nav className="py-3 border-b border-newT">
        <Navbar></Navbar>
      </nav>
      <div className="h-[600px] min-h-screen flex justify-center items-center flex-col">
      <Outlet></Outlet>
      </div>
      <div className="max-h-screen"> 
        <Footer></Footer>
      </div>
    </div>
  );
};

export default HomeLayout;
