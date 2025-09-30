import "./newtask.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function Newtask() {
  useEffect(() => {
    aos.init({ duration: 2000 });
  }, []);

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
    <div className="container py-4" data-aos="fade-up">
      <div className="label" data-aos="fade-right" data-aos-delay="100">
        <h1>Create New Task</h1>
      </div>
      <form className="newtask-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="title"
            className="form-label"
            data-aos="fade-right"
            data-aos-delay="150"
          >
            Task Title
          </label>
          <input
            type="text"
            className="form-control"
            data-aos="fade-right"
            data-aos-delay="200"
            id="title"
            placeholder="e.g complete homework"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label
            htmlFor="desc"
            className="form-label mt-3"
            data-aos="fade-right"
            data-aos-delay="250"
          >
            Task Description
          </label>
          <textarea
            className="form-control"
            id="desc"
            rows="3"
            data-aos="fade-right"
            data-aos-delay="300"
            placeholder="e.g math and science homework"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label
            htmlFor="dueDate"
            className="form-label"
            data-aos="fade-right"
            data-aos-delay="350"
          >
            Due Date
          </label>
          <input
            type="date"
            className="form-control"
            data-aos="fade-right"
            data-aos-delay="400"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="mb-3 d-flex justify-content-between">
          <div className="mb-3" style={{ width: "45%" }}>
            <label
              htmlFor="priority"
              className="form-label"
              data-aos="fade-right"
              data-aos-delay="450"
              data-aos-anchor-placement="top-bottom"
            >
              Priority
            </label>
            <select
              className="form-select"
              data-aos="fade-right"
              data-aos-delay="500"
              data-aos-anchor-placement="top-bottom"
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div className="mb-3" style={{ width: "45%" }}>
            <label
              htmlFor="category"
              className="form-label"
              data-aos="fade-left"
              data-aos-delay="450"
              data-aos-anchor-placement="top-bottom"
            >
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="category"
              data-aos="fade-left"
              data-aos-delay="500"
              data-aos-anchor-placement="top-bottom"
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
          <button
            type="reset"
            className="btn btn-secondary me-2"
            data-aos="fade-up"
            data-aos-delay="600"
            data-aos-anchor-placement="top-bottom"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            data-aos="fade-up"
            data-aos-delay="600"
            data-aos-anchor-placement="top-bottom"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default Newtask;
