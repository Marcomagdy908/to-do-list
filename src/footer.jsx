import "./footer.css";
import logoImage from "./assets/logo.png";
import darklogoImage from "./assets/darklogo.png";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";


function Footer({ theme }) {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <>
      <div className="footer">
        <div className="footer-logo">
          <img src={theme === "dark" ? darklogoImage : logoImage} alt="logo" className="img-fluid" data-aos="fade-right" />
          <ul data-aos="fade-left">
            <li>
              <a href="#">
                Quick Links</a>
            </li>
            <li>
              <a href="#">
               Legal</a>
            </li>
            <li>
              <a href="#">Community</a>
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <p>© 2025 All Rights Reserved Created by Marco</p>
          <ul>
            <li data-aos="fade-up" data-aos-delay="100" data-aos-anchor-placement="top-bottom">
              <a href="https://www.facebook.com/marco.magdy.1884">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li data-aos="fade-up" data-aos-delay="200" data-aos-anchor-placement="top-bottom">
              <a href="https://github.com/Marcomagdy908">
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
            <li data-aos="fade-up" data-aos-delay="300" data-aos-anchor-placement="top-bottom">
              <a href="https://www.linkedin.com/in/marco-magdy-99a5b82a3/" >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* <div style={{ height: "100px" }}></div> */}
    </>
  );
}

export default Footer;
