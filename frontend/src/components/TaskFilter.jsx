const TaskFilter = ({ currentFilter, onFilterChange }) => {
  const filters = ["all", "completed", "pending"];

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onFilterChange(f)}
          style={{
            padding: "8px 16px",
            textTransform: "capitalize",
            cursor: "pointer",
            borderRadius: "20px",
            border: "1px solid var(--primary-color)",
            backgroundColor:
              currentFilter === f ? "var(--primary-color)" : "white",
            color: currentFilter === f ? "white" : "var(--primary-color)",
            transition: "all 0.2s",
          }}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
