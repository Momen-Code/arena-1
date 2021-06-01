import React from "react";
import { Link, useHistory } from "react-router-dom";

//Styles
import "./style.scss";

//Assets
const Login = () => {
	const history = useHistory();

	return (
		<div className="login-container">
			<div className="form-container">
				<div className="input-container">
					<div className="title-container">
						<h3>Email / Username</h3>
					</div>
					<div className="feild-container">
						<input type="text" placeholder="Email / Username" name="user" />
					</div>
				</div>
				<div className="input-container">
					<div className="title-container">
						<h3>Password</h3>
					</div>
					<div className="feild-container">
						<input type="password" placeholder="Password" name="password" />
					</div>
				</div>
				<div className="btn-container">
					<button type="submit" onClick={() => history.push("/admin/users")}>
						Login
					</button>
				</div>
				<div className="forget-pass-container">
					<Link to="/admin/reset-password">Forgot Password ?</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
