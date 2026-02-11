import { useState } from "react";
import "../styles/TaskForm.css";

const TaskForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    // call the function passed from App parent
    onAdd(formData);

    // Reset form
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2 className="form-title">Add New Task</h2>

      <div className="form-group">
        <input
          type="text"
          name="title"
          className="form-input"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          className="form-textarea"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <select
          name="priority"
          className="form-select"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <label className="form-label">Due Date:</label>
        <input
          type="date"
          name="dueDate"
          className="form-input"
          value={formData.dueDate || ""}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn-submit">
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
