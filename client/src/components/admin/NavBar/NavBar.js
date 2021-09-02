import React, { useState, useEffect, useRef } from "react";
import { Link, Redirect, useLocation, useHistory } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { useAuthContext, useAppContext } from "../../../provider";

//Styles
import "./style.scss";
// import { FloatingBox } from "../index";
//Assets

const NavBar = () => {
	const history = useHistory();
	const location = useLocation();
	const [sidebarActive, setSidebarActive] = useState(false);
	const [visible, setVisible] = useState(false);
	const { setIsLoggedIn } = useAuthContext();
	const { createNotification, userData } = useAppContext();

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
				<button
					className="logout-btn"
					onClick={() => {
						setIsLoggedIn(false);
						history.push("/");
						createNotification("You have logged out successfully", "success");
					}}
				>
					<BiPowerOff className="logout-icon" />
					<h3>Logout</h3>
				</button>
				<div className="burger-menu" onClick={() => setSidebarActive(!sidebarActive)}>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
			{sidebarActive && (
				<aside className="sidebar" ref={sidebarRef}>
					<div className="triangle-up"></div>
					<div className="bottom-buttons">
						<Link to="/admin/projects" className={location.pathname == "/admin/projects" ? "active" : ""}>
							Projects
						</Link>
						<Link to="/admin/services" className={location.pathname == "/admin/services" ? "active" : ""}>
							Services
						</Link>
						{userData.role == "administrator" && (
							<Link to="/admin/users" className={location.pathname == "/admin/users" ? "active" : ""}>
								Users
							</Link>
						)}
						<Link to="/admin/invoices" className={location.pathname == "/admin/invoices" ? "active" : ""}>
							Invoices
						</Link>
						<Link to="/admin/paypal-bills" className={location.pathname == "/admin/paypal-bills" ? "active" : ""}>
							Paypal Bills
						</Link>
					</div>
				</aside>
			)}
		</div>
	);
};

export default NavBar;
