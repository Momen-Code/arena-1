import { Link } from "react-router-dom";

//Style
import "./style.scss";
//Assets
// @ts-ignore
import Logo from "../../assets/img/logo.png";

const Header = () => {
  return (
    <div className="header-container">
      <Link to="/" className="logo-container">
        Arena
      </Link>
      <div className="burger-menu">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="get-quote-btn">Get a Quote</div>
    </div>
  );
};

export default Header;
