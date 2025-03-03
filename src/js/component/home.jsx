import React, { useState, useEffect } from "react";

const API_URL = "https://playground.4geeks.com/todo/users/derekwhaley";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Load tasks from API
  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        if (data.todos && Array.isArray(data.todos)) {
          setTasks(data.todos);
        } else {
          console.error("Unexpected response format:", data);
        }
      })
      .catch((error) => console.error("Error loading tasks:", error));
  }, []);

  // Add new task to API
  const addTask = (e) => {
    if (e.key === "Enter" && input.trim()) {
      const newTask = { label: input, is_done: false };

      fetch(`https://playground.4geeks.com/todo/todos/derekwhaley`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Task added:", data);
          setTasks([...tasks, data]);
          setInput("");
        })
        .catch((error) => console.error("Error adding task:", error));
    }
  };

  // Delete task from API
  const deleteTask = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setTasks(tasks.filter((task) => task.id !== id)); // Remove from UI
        } else {
          console.error("Error deleting task:", response.status);
        }
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  // Delete ALL tasks from API
  const deleteAllTasks = () => {
    fetch(`https://playground.4geeks.com/todo/users/derekwhaley`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete tasks. Status: ${response.status}`);
        }
        console.log("User deleted. Waiting before recreating...");
        return new Promise((resolve) => setTimeout(resolve, 1000)); // Small delay
      })
      .then(() => {
        return fetch(`https://playground.4geeks.com/todo/users/derekwhaley`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to recreate user. Status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        console.log("User successfully recreated with empty task list.");
        setTasks([]); // Clear UI
      })
      .catch((error) => console.error("Error clearing tasks:", error));
  };
  
  
  return (
    <div className="todo-container">
      <h1 className="title">To-Do List</h1>
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
          tasks.map((task) => (
            <li key={task.id} className="task-item">
              {task.label}
              <span className="delete-icon" onClick={() => deleteTask(task.id)}>
                ❌
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

      {/* Delete All Tasks Button */}
      {tasks.length > 0 && (
        <button className="delete-all-btn" onClick={deleteAllTasks}>
          Delete All Tasks
        </button>
      )}
    </div>
  );
};

export default Home;



