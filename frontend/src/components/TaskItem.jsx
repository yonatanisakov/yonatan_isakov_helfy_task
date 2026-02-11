import { useState } from "react";
import "../styles/TaskItem.css";

const TaskItem = ({ task, onDelete, onToggle, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...task });

  // helper to get color based on priority (from index.css)
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "var(--danger-color)";
      case "medium":
        return "var(--warning-color)";
      case "low":
        return "var(--success-color)";
      default:
        return "var(--secondary-color)";
    }
  };

  const handleSave = () => {
    onEdit(editData);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  if (isEditing) {
    return (
      <div
        className="task-card"
        style={{ borderLeft: `5px solid var(--primary-color)` }}
      >
        <input
          type="text"
          name="title"
          className="edit-input"
          value={editData.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          className="edit-textarea"
          value={editData.description}
          onChange={handleChange}
        />
        <select
          name="priority"
          className="edit-select"
          value={editData.priority}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="task-actions">
          <button className="btn btn-save" onClick={handleSave}>
            Save
          </button>
          <button
            className="btn btn-cancel"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // Normal view mode
  return (
    <div
      className="task-card"
      style={{
        borderLeft: `5px solid ${getPriorityColor(task.priority)}`,
        opacity: task.completed ? 0.6 : 1,
      }}
    >
      <div className="task-header">
        <h3
          className="task-title"
          style={{
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.title}
        </h3>
        <span
          className="task-priority-badge"
          style={{
            color: getPriorityColor(task.priority),
          }}
        >
          {task.priority}
        </span>
      </div>

      <p className="task-description">
        {task.description || "No description provided"}
      </p>

      <div className="task-actions">
        <button className="btn btn-complete" onClick={() => onToggle(task.id)}>
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          className="btn btn-edit"
          onClick={() => {
            setEditData({ ...task });
            setIsEditing(true);
          }}
        >
          Edit
        </button>

        <button className="btn btn-delete" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
