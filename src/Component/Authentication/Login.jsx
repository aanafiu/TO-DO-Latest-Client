import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = (e)=>{
    e.preventDefault();
    loginWithGoogle()
    .then(() => {

        toast.success("Log In", {
          style: {
            background: "#bbf451",
          }
    })
    navigate("/")
    })
    .catch((error) => {
      // console.log(error);
      if (error) {
        toast.error("No Account Found", {
          style: {
            background: "#bbf451",
          },
        });
      }
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    loginUser(email, password)
      .then(() => {

          toast.success("Log In", {
            style: {
              background: "#bbf451",
            }
      })
      navigate("/")
      })
      .catch((error) => {
        // console.log(error);
        if (error) {
          toast.error("No Account Found", {
            style: {
              background: "#bbf451",
            },
          });
        }
      });
  };

  return (
    <div className="w-full container mx-auto justify-center items-center flex h-[100%]">
      <form
        className="bg-newT space-y-5 p-10 m-2 rounded-xl shadow-lg w-full lg:w-[70%] mx-auto border border-newBTN/50"
        onSubmit={handleSubmit}
      >
        <h2 className="border-b-2 w-[50%] rounded-b-full mx-auto pb-2 my-font text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        {/* Email Input */}
        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full placeholder:text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-newP transition-all"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full placeholder:text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-newP transition-all"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-newBTN text-black text-xl font-semibold my-font py-2 rounded-lg hover:bg-newP hover:text-newBTN transition-all active:scale-95 shadow-md"
        >
          Login
        </button>

        <p className="text-center">
          Don't Have An Account?{" "}
          <Link
            className="text-newP font-bold my-font text-lg"
            to={"/user/register"}
          >
            Register Now
          </Link>
        </p>

        {/* Google Sign In */}
        <button
            onClick={handleGoogleSignIn}
          type="button"
          className="w-full bg-newBTN my-font text-black text-xl font-semibold py-2 rounded-lg hover:bg-newP hover:text-newBTN transition-all active:scale-95 shadow-md"
        >
          Google Sign In
        </button>
      </form>
    </div>
  );
};
export default Login;
