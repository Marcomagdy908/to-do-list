import { useState, useEffect } from "react";
import "./hometasks.css";
import { initialTodos } from "./intial";
import { Link } from "react-router-dom";

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
}

function Card({ todo, onToggleDone }) {
  const { id, title, date, category, priority, completed } = todo;
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <Link
            to={`/edittask/${id}`}
            className={`card-title ${completed ? "done" : ""}`}
          >
            {title}
          </Link>
          <div className="checkbox-wrapper-46">
            <input
              className="inp-cbx"
              id={`cbx-46-${id}`}
              type="checkbox"
              checked={completed}
              onChange={() => onToggleDone(id)}
            />
            <label className="cbx" htmlFor={`cbx-46-${id}`}>
              <span>
                <svg width="12px" height="10px" viewBox="0 0 12 10">
                  <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                </svg>
              </span>
            </label>
          </div>
        </div>
        <div
          className="d-flex justify-content-start mt-3"
          style={{ width: "100%" }}
        >
          <div className="type m-2 ms-0">{category}</div>
          <div className={`priority m-2 ${priority}`}>{priority}</div>
        </div>
        <h5 className="date"><i className="fa-solid fa-calendar-days me-1"></i>Due : {formatDate(date)}</h5>
      </div>
    </div>
  );
}

function Hometasks() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : initialTodos;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleToggleDone = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const today = new Date().toISOString().slice(0, 10);
  const todayTasks = todos.filter(
    (todo) => todo.date === today && !todo.completed
  );
  const upcomingTasks = todos.filter(
    (todo) => todo.date > today && !todo.completed
  );
  const completedTasks = todos.filter((todo) => todo.completed);

  const Task_container = ({ title, tasks }) => (
    <div className="col-md-3 col-lg-3 col-sm-10 d-flex flex-column justify-content-center task-container">
      <h2 className="mt-5">{title}</h2>
      {tasks.length > 0 ? (
        tasks.map((todo) => (
          <Card key={todo.id} todo={todo} onToggleDone={handleToggleDone} />
        ))
      ) : (
        <p>No tasks available</p>
      )}
    </div>
  );
  return (
    <>
      <div className="container-fluid body-container">
        <h1>Your Tasks Overview</h1>
        <div className="row mt-4 mb-5">
          <Task_container title="Today" tasks={todayTasks} />
          <Task_container title="Upcoming" tasks={upcomingTasks} />
          <Task_container title="Completed" tasks={completedTasks} />
        </div>
      </div>
    </>
  );
}

export default Hometasks;
