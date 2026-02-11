import { useState, useEffect } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onDelete, onToggle, onEdit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3); // desktop default

  // Responsive logic: update itemsToShow based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else {
        setItemsToShow(3);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Reset index if tasks get deleted and we are out of bounds
  useEffect(() => {
    const maxIndex = Math.max(0, tasks.length - itemsToShow);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks.length, itemsToShow]);

  // safe check for empty tasks
  if (!tasks || tasks.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "#64748b" }}>
        <h3>No tasks available</h3>
        <p>Create a new task to get started!</p>
      </div>
    );
  }

  // --- CAROUSEL LOGIC ---

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      // If we are at the end, go back to strat
      if (prevIndex + itemsToShow >= tasks.length) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      // If we are at start, go to the end
      if (prevIndex === 0) {
        return Math.max(0, tasks.length - itemsToShow);
      }
      return prevIndex - 1;
    });
  };

  // Calculate the width percntage for each item
  const itemWidth = 100 / itemsToShow;

  return (
    <div
      className="carousel-container"
      style={{ position: "relative", margin: "40px 0" }}
    >
      {/* Header / Filter placeholder */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <h2>My Tasks ({tasks.length})</h2>
        <span style={{ fontSize: "0.9rem", color: "#64748b" }}>
          Showing {Math.min(itemsToShow, tasks.length)} visible
        </span>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        style={{
          position: "absolute",
          left: "-20px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
        }}
      >
        &#8592; {/* arrow */}
      </button>

      <div
        className="carousel-track-container"
        style={{ overflow: "hidden", width: "100%" }}
      >
        {/* Moving Track */}
        <div
          className="carousel-track"
          style={{
            display: "flex",
            transition: "transform 0.5s ease-in-out",
            transform: `translateX(-${currentIndex * itemWidth}%)`,
          }}
        >
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                minWidth: `${itemWidth}%`,
                padding: "0 10px",
              }}
            >
              <TaskItem
                task={task}
                onDelete={onDelete}
                onToggle={onToggle}
                onEdit={onEdit}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={nextSlide}
        style={{
          position: "absolute",
          right: "-20px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          cursor: "pointer",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
        }}
      >
        &#8594;
      </button>

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        {Array.from({ length: Math.ceil(tasks.length / itemsToShow) }).map(
          (_, idx) => (
            <span
              key={idx}
              style={{
                display: "inline-block",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background:
                  Math.floor(currentIndex / itemsToShow) === idx
                    ? "var(--primary-color)"
                    : "#cbd5e1",
                margin: "0 5px",
                transition: "background 0.3s",
              }}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default TaskList;
