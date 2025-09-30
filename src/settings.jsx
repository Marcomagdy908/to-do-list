import "./settings.css";
import homelight from "./assets/homelight.png";
import homedark from "./assets/homedark.png";
import { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

function Settings({ theme, setTheme }) {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

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

  const convertToCSV = (data) => {
    const todos = JSON.parse(data);
    if (!todos || todos.length === 0) {
      return "";
    }
    const headers = Object.keys(todos[0]);
    const csvRows = [];
    csvRows.push(headers.join(","));

    for (const row of todos) {
      const values = headers.map((header) => {
        const escaped = ("" + row[header]).replace(/"/g, '""'); 
        return `"${escaped}"`;
      });
      csvRows.push(values.join(","));
    }
    return csvRows.join("\n");
  };

  const handleExportData = () => {
    const todos = localStorage.getItem("todos");
    if (!todos) {
      alert("No to-do data to export.");
      return;
    }

    const data = convertToCSV(todos);
    const fileType = "text/csv";
    const fileName = "todos.csv";
    const blob = new Blob([data], { type: fileType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="settings-container" data-aos="fade-up">
      <h1>Settings</h1>
      <div className="appearance" data-aos="fade-right" data-aos-delay="100">
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
      <div className="notifications" data-aos="fade-left" data-aos-delay="200">
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
      <div className="data-privacy" data-aos="fade-right" data-aos-delay="300">
        <h2>Data & Privacy</h2>
        <h5>Review and manage your data and privacy settings</h5>
        <div className="data-export pt-3 d-flex justify-content-between align-items-center">
          <span>
            <label>Export Data</label>
            <h6>Download a copy of your data for backup or transfer</h6>
          </span>
          <button onClick={handleExportData}>Export Data as CSV</button>
        </div>
      </div>
      <button
        className="save-button mt-5"
        onClick={handleSaveChanges}
        data-aos="fade-up"
        data-aos-delay="400"
      >
        Save Changes
      </button>
    </div>
  );
}

export default Settings;
