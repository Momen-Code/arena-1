//Style
import { Link } from "react-router-dom";
import "./style.scss";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="logo-container">
        <Link to="/">
          <h1>ARENA</h1>
        </Link>
        <div className="copyright">© 2020 ARCHAOS</div>
      </div>
      <div className="nav-links">
        <h2>Quick Links</h2>
        <div className="links">
          <div>
            <a>Security</a>
            <a>Pricing</a>
            <a>Request a Demo</a>
            <a>Mobile Growth</a>
          </div>
          <div>
            <a>Press</a>
            <a>Contact</a>
            <a>Partner program</a>
            <a>Careers</a>
          </div>
        </div>
      </div>
      <div className="address-container">
        <h2>ADDRESS</h2>
        <br />
        AHMED YEHIA STREET , <br />
        BESIDE SHALABY PHARMACY AND L’ECLAIR ALEXANDRIA,
        <br /> EGYPT
      </div>
      <div className="designed-archaos">
        <h3>Designed by ARCHAOS</h3>
        <div className="img-bg"></div>
      </div>
    </div>
  );
};

export default Footer;
