import "./edittask.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
function Edittask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(getTask(id));
  const [editedtask, setEditedtask] = useState({ ...task });

  useEffect(() => {
    setEditedtask({ ...task });
  }, [isEditing, task]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedtask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const Todos = JSON.parse(localStorage.getItem("todos")) || [];
    const updatedTodos = Todos.map((todo) => {
      if (String(todo.id) === String(id)) {
        return editedtask;
      }
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTask(editedtask);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const Todos = JSON.parse(localStorage.getItem("todos")) || [];
      const updatedTodos = Todos.filter(
        (todo) => String(todo.id) !== String(id)
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      navigate("/");
    }
  };

  function getTask(taskId) {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (!todos) {
      return null;
    }
    const task = todos.find((todo) => String(todo.id) === String(taskId));
    return task;
  }
  if (!task) {
    return <div>Task not found</div>;
  }

  const {
    title,
    description,
    date,
    priority,
    category,
    completed,
  } = task;

  return (
    <>
      {!isEditing ? (
        <div className="showtask-container w-100">
          <div className="showtask">
            <div className="task-header d-flex justify-content-between align-items-center mb-3">
              <h1>{title}</h1>
              <span className="task-status">
                {completed ? "Done" : "in progress"}
              </span>
            </div>
            <div
              className="d-flex justify-content-between align-items-center mb-3"
              style={{ width: "60%" }}
            >
              <span className="task-date">
                <h5>Due Date:</h5>
                <h6>{date}</h6>
              </span>
              <span className="task-priority d-flex gap-2">
                <h5 className="mt-1">Priority:</h5>
                <div className={`priority align-items-center ${priority}`} >{priority}</div>
              </span>
            </div>
            <div>
              <span className="task-category  d-flex gap-2">
                <h5 className="mt-1">Category:</h5>
                <div className="type align-items-center">
                  {category}
                </div>
              </span>
            </div>
            <h6 className="mt-4">Description:</h6>
            <h5 className="mb-4">{description}</h5>
            <div className="d-flex gap-3 justify-content-end">
              <button className="edit-button" onClick={() => navigate("/")}>
                Done
              </button>
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                <i class="fa-solid fa-pen m-1"></i>Edit Task
              </button>
              <button className="delete-button" onClick={handleDelete}>
                <i class="fa-solid fa-trash m-1"></i>Delete Task
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="showtask-container">
          <form className="showtask" onSubmit={handleSubmit}>
            <div className="task-header d-flex justify-content-between align-items-center mb-3">
              <input
                type="text"
                className="form-control"
                defaultValue={title}
                value={editedtask.title}
                onChange={handleInputChange}
                name="title"
                style={{ width: "60%" }}
              />
              <span className="task-status">
                {completed ? "Done" : "in progress"}
              </span>
            </div>
            <div
              className="d-flex justify-content-between align-items-center mb-3"
              style={{ width: "60%" }}
            >
              <span className="task-date">
                <h5>Due Date:</h5>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  onChange={handleInputChange}
                  value={editedtask.date}
                  defaultValue={date}
                />
              </span>
              <span className="task-priority d-flex gap-2 ms-2">
                <h5 className="mt-4">Priority:</h5>
                <select
                  className="form-select mt-3"
                  name="priority"
                  onChange={handleInputChange}
                  value={editedtask.priority}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </span>
            </div>
            <div>
              <span className="task-category d-flex gap-2">
                <h5 className="mt-2">Category:</h5>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  list="categoryList"
                  name="category"
                  onChange={handleInputChange}
                  value={editedtask.category}
                />
                <datalist className="form-data-list" id="categoryList">
                  <option>Work</option>
                  <option>Personal</option>
                  <option>Shopping</option>
                </datalist>
              </span>
            </div>
            <h6 className="mt-4">Description:</h6>
            <textarea
              className="form-control mb-4"
              rows="3"
              defaultValue={description}
              name="description"
              onChange={handleInputChange}
              value={editedtask.description}
            ></textarea>
            <div className="d-flex gap-3 justify-content-end">
              <button
                type="button"
                className="edit-button"
                onClick={() => setIsEditing(false)}
              >
                <i class="fa-solid fa-pen m-1"></i>Cancel
              </button>
              <button type="submit" className="edit-button">
                <i class="fa-solid fa-save m-1"></i>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Edittask;
