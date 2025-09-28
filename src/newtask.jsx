import "./newtask.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Newtask() {
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [dueDate, setDueDate] = useState("");
const [priority, setPriority] = useState("");
const [category, setCategory] = useState("");
const navigate = useNavigate();
const handleSubmit = (event) => {
  event.preventDefault();
  if (!title || !description || !dueDate || !priority || !category) {
    alert("Please fill in all fields");
    return;
  }
  const newTask = {
    id: Date.now(),
    title,
    description,
    date: dueDate,
    priority,
    category,
    completed: false,
  };

  const existingTodos = JSON.parse(localStorage.getItem("todos")) || [];
  localStorage.setItem("todos", JSON.stringify([...existingTodos, newTask]));
  navigate("/");
};

  return (
    <div className="container py-4">
      <div className="label">
        <h1>Create New Task</h1>
      </div>
      <form className="newtask-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Task Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="e.g complete homework"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="desc" className="form-label mt-3">
            Task Description
          </label>
          <textarea
            className="form-control"
            id="desc"
            rows="3"
            placeholder="e.g math and science homework"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">
            Due Date
          </label>
          <input type="date" className="form-control" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <div className="mb-3" style={{ width: "45%" }}>
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select className="form-select" id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div className="mb-3" style={{ width: "45%" }}>
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="category"
              list="categoryList"
              placeholder="e.g work"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <datalist className="form-data-list" id="categoryList">
              <option>Work</option>
              <option>Personal</option>
              <option>Shopping</option>
            </datalist>
          </div>
        </div>
        <div className="form-check form-switch mb-3 d-flex justify-content-end">
          <button type="reset" className="btn btn-secondary me-2" onClick={() => navigate("/")}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default Newtask;
