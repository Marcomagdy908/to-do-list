import Nav from "./nav.jsx";
import Homepage from "./homepage.jsx";
import Newtask from "./newtask.jsx";
import Edittask from "./edittask.jsx";
import Footer from "./footer.jsx";
import Settings from "./settings.jsx";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Hometasks from "./hometasks.jsx";

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <Nav theme={theme} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/newtask" element={<Newtask />} />
        <Route path="/edittask/:id" element={<Edittask />} />
        <Route path="/tasks" element={<Hometasks />} />
        <Route
          path="/settings"
          element={<Settings theme={theme} setTheme={setTheme} />}
        />
      </Routes>
      <Footer theme={theme} />
    </>
  );
}

export default App;
