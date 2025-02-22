import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "./AuthProvider";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateDetails, registerNewAccount, loginWithGoogle } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://kikilagbe.vercel.app/userinformation", {
        name,
        email,
        password,
      })
      .then(() => {
        registerNewAccount(email, password).then(() => {
          updateDetails(name).then(() => {
            toast.success("Account Created With Email!", {
              style: {
                background: "#bbf451",
              },
            });

            navigate("/"); // Redirect to home page
          });
        });
      })
      .catch((error) => {
        // console.log(error.status)
        if (error.status === 400) {
          toast.error("Account Already Created!", {
            style: {
              background: "#bbf451",
            },
          });
        }
      });

    // })
    // .catch((error) => {
    //   if (error) {
    //     toast.error("Already Account Had With Gmail!", {
    //       style: {
    //         background: "#bbf451",
    //       },
    //     });
    //   }
    // });
  };

  //   Google Sign UP
  const handleGoogleSignIn = async () => {
    try {
      const res = await loginWithGoogle(); // Firebase authentication
      const { displayName, email } = res.user; // Get user details
      console.log(displayName, email, "resname");

      // Step 2: Check if the user exists in MongoDB
      axios
        .post("https://kikilagbe.vercel.app/userinformation", {
          name: displayName,
          email,
          password: "",
        })
        .then((response) => {
          console.log(response, "resss");

          axios.post("https://kikilagbe.vercel.app/userinformation", {
            name: displayName,
            email,
            password: "", // Since it's Google, no password needed
          });
          updateDetails(displayName);
          toast.success("Account Created With Gmail!", {
            style: {
              background: "#bbf451",
            },
          });

          navigate("/"); // Redirect to home page
        })
        .catch(() => {
          // console.log(error, "iamreg")
          toast.error("Already Account Created With Gmail!", {
            style: {
              background: "#bbf451",
            },
          });
        });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google Sign-In Failed!", {
        style: {
          background: "#bbf451",
        },
      });

      if (error.message === "Firebase: Error (auth/popup-closed-by-user).") {
        navigate("/user/register");
      }
    }
  };

  return (
    <div className="w-full container mx-auto justify-center items-center flex h-[100%]">
      <form
        className="bg-newT space-y-5 p-10 m-2  rounded-xl shadow-lg w-full lg:w-[70%] mx-auto border border-newBTN/50"
        onSubmit={handleSubmit}
      >
        <h2 className="border-b-2 w-[50%] rounded-b-full mx-auto pb-2 my-font text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>

        {/* Name Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full placeholder:text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-newP transition-all"
          />
        </div>

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
          Register
        </button>

        <p className="text-center">
          Don't Have An Account!!!{" "}
          <Link
            className="text-newP font-bold my-font text-lg"
            to={"/user/login"}
          >
            Log In Now
          </Link>
        </p>

        {/* Google Sign Up */}

        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="w-full bg-newBTN my-font text-black text-xl font-semibold py-2 rounded-lg hover:bg-newP hover:text-newBTN transition-all active:scale-95 shadow-md"
        >
          Google Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
