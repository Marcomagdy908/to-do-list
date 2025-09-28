import "./nav.css";
import logo from "./assets/logo.png";
import darklogo from "./assets/darklogo.png";
import { Link, NavLink } from "react-router-dom";

function Nav({ theme }) {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand"
          href="#"
          margin={"0"}
          padding={"0"}
        >
          <img
            src={theme === "dark" ? darklogo : logo}
            alt="Logo"
            className="d-inline-block align-text-top"
            width={"50"}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto ms-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                aria-current="page"
              >
                Settings
              </NavLink>
            </li>
          </ul>
          <div className="d-flex">
            <Link to="/newtask" className="btn add-btn">
              + Add Task
            </Link>
            <button className="fa-solid fa-user btn" style={{backgroundColor:"transparent"}}></button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
