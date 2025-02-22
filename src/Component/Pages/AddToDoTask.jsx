import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../Authentication/AuthProvider";

const AddToDoTask = () => {
    const {myDetails} = useContext(AuthContext);
  const [task, setTask] = useState({
    title: "",
    description: "",
    category: "toDo",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setTask({ ...task, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.title) {
      toast.error("Task title is required");
      return;
    }
  
    try {
      const response = await axios.post("https://kikilagbe.vercel.app/tasks", {
        userId: myDetails.email,
        title: task.title,
        description: task.description,
        category: task.category, // Send selected category
      });
  
      if (response.status === 201) {
        toast.success("Task Added Successfully");
        setTask({ title: "", description: "", category: "toDo" }); // Reset form
      }
    } catch (error) {
      toast.error("Failed to add task");
      console.error("Error adding task:", error);
    }
  };
  

  return (
    <div className="glass p-5 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-newBTN text-center mb-4">Add New Task</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title */}
        <input
          type="text"
          name="title"
          value={task.title}
          onChange={handleChange}
          placeholder="Task Title"
          className="glass p-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-newBTN"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          value={task.description}
          onChange={handleChange}
          placeholder="Task Description"
          className="glass p-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-newBTN"
          required
        ></textarea>

        {/* Category Selection */}
        <div className="flex justify-around items-center bg-gray-100 p-3 rounded-lg">
          {["toDo", "inProgress", "done"].map((cat) => (
            <label key={cat} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={cat}
                checked={task.category === cat}
                onChange={handleCategoryChange}
                className="accent-newBTN"
              />
              <span className="text-gray-800 font-semibold capitalize">{cat.replace(/([A-Z])/g, " $1")}</span>
            </label>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-newBTN text-white py-2 px-4 rounded-md font-bold hover:bg-opacity-90 transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddToDoTask;
