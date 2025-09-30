import "./homepage.css";
import { Link } from "react-router-dom";
import homeImage from "./assets/home.png";
import Hometasks from "./hometasks";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function Homepage() {

  useEffect(() => {
  AOS.init({ duration: 1000 });
}, []);

  return (
    <>
      <div className="container-fluid main-container h-100">
        <div className="row">
          <div className="col-md-5 d-flex flex-column justify-content-center align-items-start m-5 home-page-text " data-aos="fade-right">
            <h1>Organize Your Life.</h1>
            <h1>Accomplish More.</h1>
            <h1>Stay Focused.</h1>
            <p className="mt-4">
              Streamline your daily tasks, projects, and goals with Task
              Manager's intuitive interface. Stay on top of your commitments and
              boost your productivity effortlessly.
            </p>
            <Link to="/newtask" className="btn btn-primary mt-3 start-btn">
              Get Started
            </Link>
          </div>
          <div className="col-md-5 d-flex justify-content-center align-items-center" data-aos="fade-left">
            <img
              src={homeImage}
              alt="task"
              className="img-fluid home-page-img"
            />
          </div>
        </div>
      </div>
      <Hometasks />
    </>
  );
}

export default Homepage;
