import { useState } from "react";
import { Link } from "react-router-dom";

//Style
import "./style.scss";
//Assets
// @ts-ignore
import Logo from "../../assets/img/logo.png";

const Header = () => {
  const [quoteActive, setQuoteActive] = useState(false);

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
      <div className={`get-quote-container ${quoteActive ? " active" : ""}`}>
        <div
          className={`get-quote-btn${quoteActive ? " active" : ""}`}
          onClick={() => setQuoteActive(!quoteActive)}
        >
          Get a Quote
        </div>
        <div className="get-quote-wrapper"></div>
      </div>
    </div>
  );
};

export default Header;
