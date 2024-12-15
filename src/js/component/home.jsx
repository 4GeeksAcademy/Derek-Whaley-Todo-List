import React, { useState } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]); // Array to hold tasks
  const [input, setInput] = useState(""); // Input value

  // Function to add a task when Enter is pressed
  const addTask = (e) => {
    if (e.key === "Enter" && input.trim()) {
      setTasks([...tasks, input]);
      setInput("");
    }
  };

  // Function to delete a task
  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="todo-container">
      <h1 className="title">todo's</h1>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={addTask}
        className="input-field"
      />
      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <li
              key={index}
              className="task-item"
              onMouseEnter={(e) =>
                (e.currentTarget.lastChild.style.display = "block")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.lastChild.style.display = "none")
              }
            >
              {task}
              <span
                className="delete-icon"
                onClick={() => deleteTask(index)}
              >
                &#10005;
              </span>
            </li>
          ))
        ) : (
          <li className="no-tasks">No tasks, add a task</li>
        )}
      </ul>
      <p className="task-count">
        {tasks.length > 0 ? `${tasks.length} item(s) left` : ""}
      </p>
    </div>
  );
};

export default Home;
