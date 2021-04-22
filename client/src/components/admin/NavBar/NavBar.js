import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

//Styles
import "./style.scss";
// import { FloatingBox } from "../index";
//Assets

const NavBar = () => {
  const location = useLocation();
  const [sidebarActive, setSidebarActive] = useState(false);
  const [visible, setVisible] = useState(false);

  const sidebarRef = useRef(null);

  const containerHandler = (e) => {
    e.preventDefault();

    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setSidebarActive(false);
    }
  };

  return (
    <div className="nav-bar-container">
      <div className="navbar-container">
        <Link to="/" className="logout-btn">
          <BiPowerOff className="logout-icon" />
          <h3>Logout</h3>
        </Link>
        <div
          className="burger-menu"
          onClick={() => setSidebarActive(!sidebarActive)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      {sidebarActive && (
        <aside className="sidebar" ref={sidebarRef}>
          <div className="triangle-up"></div>
          <div className="bottom-buttons">
            <Link
              to="/admin/users"
              className={location.pathname == "/admin/users" ? "active" : ""}
            >
              Users
            </Link>
            <Link
              to="/admin/bills"
              className={location.pathname == "/admin/bill" ? "active" : ""}
            >
              Bills
            </Link>
          </div>
        </aside>
      )}
    </div>
  );
};

export default NavBar;
