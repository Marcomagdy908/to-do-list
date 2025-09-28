import "./footer.css";
import logoImage from "./assets/logo.png";
import darklogoImage from "./assets/darklogo.png";


function Footer({ theme }) {
  return (
    <>
      <div className="footer">
        <div className="footer-logo">
          <img src={theme === "dark" ? darklogoImage : logoImage} alt="logo" className="img-fluid" />
          <ul>
            <li>
              <a href="#">Quick Links</a>
            </li>
            <li>
              <a href="#">Legal</a>
            </li>
            <li>
              <a href="#">Community</a>
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <p>© 2025 All Rights Reserved Created by Marco</p>
          <ul>
            <li>
              <a href="#">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;
