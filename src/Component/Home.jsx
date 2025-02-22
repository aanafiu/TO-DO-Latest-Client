import { useContext } from "react";
// import { Outlet } from "react-router";
import { AuthContext } from "./Authentication/AuthProvider";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const { myDetails } = useContext(AuthContext);
  console.log(myDetails);

  const userId = myDetails?.email;


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = async () => {
    if (!title) {
      toast.error("Task title is required");
      return;
    }

    try {
      const response = await axios.post("https://kikilagbe.vercel.app/tasks", { userId, title, description, category:"toDo" });

      if (response.status === 201) {
        toast.success("Task Added Successfully");
        setTitle("");  
        setDescription("");
      }
    } catch (error) {
      toast.error("Failed to add task");
      console.error(error);
    }
  };


  return (
    <>
      <div className="container p-2 gap-2 mx-auto my-text my-10 flex flex-col md:flex-row justify-center md:justify-evenly items-center text-newT">
        <div>
          <h1 className="text-3xl w-full text-center font-bold">
            Hello, {myDetails?.displayName}
          </h1>
          <h1 className="text-base">Hope You Are Doing Well.</h1>
        </div>
        <div className="flex flex-col gap-3 ">
          <h1 className="text-5xl my-font">
            Let's Structure Your Daily Routine With Us
          </h1>
          <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="glass text-newBTN rounded-xl py-2 outline-0 text-lg pl-4 font-bold w-full mb-2"
      />

      <textarea
        className="glass rounded-xl text-newBTN outline-0 py-2 pl-4 text-lg font-semibold w-full mb-2"
        placeholder="Your Planning"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <button
        onClick={handleAddTask}
        className="btn glass w-fit mx-auto px-10 text-newBTN hover:border-2 hover:scale-105 transition-all"
      >
        Click To Add
      </button>
        </div>
      </div>
    </>
  );
};

export default Home;
