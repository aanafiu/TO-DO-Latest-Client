import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "./Authentication/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { logOutUser, myDetails } = useContext(AuthContext);
  // console.log(myDetails, "ffff");
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser().then((res) => {
      toast.success("LogOut", {
        style: {
          background: "#bbf451",
        },
      });
      navigate("/");
    });
  };

  
  return (
    <>
      <div className="navbar sticky outline-offset-8 bg-newP text-newT font-bold my-font">
        <div className="navbar-start">
          <Link
            className="btn btn-ghost text-xl font-bold whitespace-nowrap oregano-font"
            to={"/"}
          >
            Ki Ki Korbo !!!
          </Link>
        </div>
        <div className="navbar-center hidden md:flex">
          <div className="menu space-x-5 menu-horizontal px-1 text-lg">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"addnewtask"}>Add New Task</NavLink>
            <NavLink to={"dashboard"}>Dashboard</NavLink>
          </div>
        </div>
        <div className="navbar-end">
          <div className="dropdown w-full text-right ">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <div
              tabIndex={0}
              className="bg-green-950/50 menu menu-sm dropdown-content gap-y-5 text-center rounded-box z-[1] w-full p-2 shadow"
            >
              <NavLink>Home</NavLink>
              <NavLink>Add New Task</NavLink>
              <NavLink>Dashboard</NavLink>
              {myDetails ? (
                <button
                  onClick={handleLogout}
                  type="button"
                  className="btn btn-wide btn-success bg-newBTN flex sm:hidden sm:btn-sm md:btn-md lg:btn-lg"
                >
                  Log Out
                </button>
              ) : (
                <Link
                  className="btn btn-wide btn-success bg-newBTN flex sm:hidden sm:btn-sm md:btn-md lg:btn-lg"
                  to={"/user/login"}
                >
                  Are You New?
                </Link>
              )}
            </div>
          </div>
          {myDetails ? (
            <button
              onClick={handleLogout}
              type="button"
              className="btn px-10 mr-10 btn-success bg-newBTN hidden sm:flex sm:btn-sm md:btn-md lg:btn-lg"
            >
              Log Out
            </button>
          ) : (
            <Link
              className="btn btn-wide btn-success bg-newBTN hidden sm:flex sm:btn-sm md:btn-md lg:btn-lg"
              to={"/user/login"}
            >
              Are You New?
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
