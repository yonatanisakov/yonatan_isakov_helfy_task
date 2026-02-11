import { useState, useEffect } from "react";
import * as api from "./services/api";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskFilter from "./components/TaskFilter";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");

  // Priority mapping for numerical sorting
  const priorityWeight = { high: 3, medium: 2, low: 1 };
  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await api.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      console.error("Error loading tasks:", err);
      setError("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await api.createTask(taskData);
      setTasks([...tasks, newTask]);
    } catch (err) {
      console.error("Error adding task:", err);
      alert("Failed to add task");
    }
  };

  const handleToggleTask = async (id) => {
    try {
      const updatedTask = await api.toggleTaskStatus(id);
      setTasks(tasks.map((t) => (t.id === id ? updatedTask : t)));
    } catch (err) {
      console.error("Error toggling task:", err);
      alert("Failed to update task");
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      const result = await api.updateTask(updatedTask.id, updatedTask);
      setTasks(tasks.map((t) => (t.id === updatedTask.id ? result : t)));
    } catch (err) {
      console.error("Error updating task:", err);
      alert("Failed to update task");
    }
  };
  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.deleteTask(id);
        setTasks(tasks.filter((t) => t.id !== id));
      } catch (err) {
        console.error("Error deleting task:", err);
        alert("Failed to delete task");
      }
    }
  };

  // Logic for filtering tasks before passing to the Carousel
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "priority")
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return new Date(b.createdAt) - new Date(a.createdAt); // default newest first
    });

  return (
    <div
      className="app-main"
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}
    >
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "2.5rem", color: "var(--primary-color)" }}>
          Task Manager
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Endless Carousel Experience
        </p>
      </header>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "12px 24px",
            backgroundColor: showForm
              ? "var(--secondary-color)"
              : "var(--primary-color)",
            color: "white",
            border: "none",
            borderRadius: "var(--radius)",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            transition: "all 0.3s ease",
          }}
        >
          {showForm ? "✕ Close Form" : "+ Add New Task"}
        </button>
      </div>

      {showForm && (
        <div style={{ animation: "slideDown 0.3s ease-out" }}>
          <TaskForm
            onAdd={(task) => {
              handleAddTask(task);
              setShowForm(false); // hide after adding for better flow
            }}
          />
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "20px",
            border: "1px solid #ddd",
            width: "250px",
          }}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "20px",
            border: "1px solid #ddd",
          }}
        >
          <option value="createdAt">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>
      <TaskFilter currentFilter={filter} onFilterChange={setFilter} />

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading tasks...</p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onDelete={handleDeleteTask}
          onToggle={handleToggleTask}
          onEdit={handleUpdateTask}
        />
      )}

      <footer
        style={{
          marginTop: "60px",
          textAlign: "center",
          fontSize: "0.8rem",
          color: "#94a3b8",
        }}
      >
        Built for Helfy Home Assignment
      </footer>
    </div>
  );
}

export default App;
