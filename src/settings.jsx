import "./settings.css";
import homelight from "./assets/homelight.png";
import homedark from "./assets/homedark.png";
import { useState } from "react";

function Settings({ theme, setTheme }) {
  const [notifications, setNotifications] = useState(() => {
    const savedNotifications = localStorage.getItem("notifications");
    return savedNotifications
      ? JSON.parse(savedNotifications)
      : { email: false, push: false, reminders: true };
  });

  const handleNotificationChange = (event) => {
    const { name, checked } = event.target;
    setNotifications((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSaveChanges = () => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
    alert("Settings saved successfully!");
  };

  const handleExportData = () => {
    const todos = localStorage.getItem("todos");
    if (!todos) {
      alert("No to-do data to export.");
      return;
    }
    const blob = new Blob([todos], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "todos.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="appearance">
        <h2>Appearance</h2>
        <h5>Customize the look and feel of the application</h5>
        <div className="modes">
          <button
            className={theme === "light" ? "active-mode" : ""}
            onClick={() => setTheme("light")}
          >
            <div className="light-mode-img">
              <img
                className="img-fluid"
                style={{ width: "400px" }}
                src={homelight}
                alt="light mode"
              ></img>
            </div>
            Light Mode
          </button>
          <button
            className={theme === "dark" ? "active-mode" : ""}
            onClick={() => setTheme("dark")}
          >
            <div className="light-mode-img">
              <img
                className="img-fluid"
                style={{ width: "400px" }}
                src={homedark}
                alt="light mode"
              ></img>
            </div>
            Dark Mode
          </button>
        </div>
      </div>
      <div className="notifications">
        <h2>Notifications</h2>
        <h5>Manage your notification preferences</h5>
        <div className="notification-options">
          <label>Email Notifications</label>
          <div className="notification-type">
            <h6>Receive updates and alerts via email</h6>
            <div className="checkbox">
              <input
                type="checkbox"
                name="email"
                className="checkbox-input"
                checked={notifications.email}
                onChange={handleNotificationChange}
              />
            </div>
          </div>
          <label>Push Notifications</label>
          <div className="notification-type">
            <h6>Receive updates and alerts via push notifications</h6>
            <div className="checkbox">
              <input
                type="checkbox"
                name="push"
                className="checkbox-input"
                checked={notifications.push}
                onChange={handleNotificationChange}
              />
            </div>
          </div>
          <label>Task Reminders</label>
          <div className="notification-type">
            <h6>Get reminded about your tasks and deadlines</h6>
            <div className="checkbox">
              <input
                type="checkbox"
                name="reminders"
                className="checkbox-input"
                checked={notifications.reminders}
                onChange={handleNotificationChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="data-privacy">
        <h2>Data & Privacy</h2>
        <h5>Review and manage your data and privacy settings</h5>
        <div className="data-export pt-3">
          <span>
            <label>Export Data</label>
            <h6>Download a copy of your data for backup or transfer</h6>
          </span>
          <button onClick={handleExportData}>Export Data</button>
        </div>
      </div>
      <button className="save-button mt-5" onClick={handleSaveChanges}>
        Save Changes
      </button>
    </div>
  );
}

export default Settings;
