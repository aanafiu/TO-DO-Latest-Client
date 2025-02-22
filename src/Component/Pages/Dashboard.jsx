import { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { AuthContext } from "../Authentication/AuthProvider";

const categories = ["toDo", "inProgress", "done"];

const Dashboard = () => {
  const [allTasks, setAllTasks] = useState({
    toDo: [],
    inProgress: [],
    done: [],
  });
  const [userInfo, setUserInfo] = useState({});
  const { myDetails } = useContext(AuthContext);

  useEffect(() => {
    if (myDetails?.email) {
      fetchUserData();
    }
  }, [myDetails]);

  const fetchUserData = async () => {
    try {
      const { data } = await axios.get(
        `https://kikilagbe.vercel.app/userinfo?email=${myDetails.email}`
      );
      setUserInfo(data?.user);
      setAllTasks(data?.user?.tasks || { toDo: [], inProgress: [], done: [] });
    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const sourceCategory = result.source.droppableId;
    const destinationCategory = result.destination.droppableId;

    if (sourceCategory === destinationCategory) return;

    const updatedTasks = { ...allTasks };
    const [movedTask] = updatedTasks[sourceCategory].splice(result.source.index, 1);
    updatedTasks[destinationCategory].splice(result.destination.index, 0, movedTask);

    setAllTasks(updatedTasks);

    try {
      await axios.put(`https://kikilagbe.vercel.app/tasks/move`, {
        userId: userInfo._id,
        taskId: movedTask.id,
        fromCategory: sourceCategory,
        toCategory: destinationCategory,
      });

      fetchUserData();
    } catch (error) {
      console.error("Error updating task", error);
      setAllTasks(allTasks);
    }
  };

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold my-font text-newBTN flex justify-between w-full">
        Hello, {userInfo.name}...
        <span className="my-text text-lg font-bold capitalize">
          Here is your To-Do List
        </span>
      </h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="glass p-4 rounded-lg shadow-md min-h-[500px] flex flex-col flex-grow"
                >
                  <h2 className="text-2xl font-bold mb-3 border-b-2 text-newBTN text-center uppercase">
                    {category}
                  </h2>

                  <div className="flex flex-col flex-grow min-h-full">
                    {allTasks[category]?.map((task, i) => (
                      <Draggable key={task.id} draggableId={task.id} index={i}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              zIndex: snapshot.isDragging ? 1000 : "auto",
                              position: snapshot.isDragging ? "absolute" : "relative",
                              left: snapshot.isDragging ? 0 : "auto",
                              right: snapshot.isDragging ? 0 : "auto",
                            }}
                            className={`glass p-3 mb-2 rounded-md shadow-md cursor-pointer transition-all ${
                              snapshot.isDragging ? "opacity-80 scale-105 bg-gray-200" : ""
                            }`}
                          >
                            <h3 className="font-bold">{task.title}</h3>
                            <p className="text-sm">{task.description}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Dashboard;
