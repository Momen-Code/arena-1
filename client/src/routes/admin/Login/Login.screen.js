import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import useHooks from "../hooks";

//Styles
import "./style.scss";

//Assets
const Login = () => {
	const history = useHistory();
	const { login } = useHooks();
	const [user, setUser] = useState("");
	const [password, setPassword] = useState("");

	return (
		<div className="login-container">
			<form className="form-container" onSubmit={(e) => e.preventDefault()}>
				<div className="input-container">
					<div className="title-container">
						<h3>Email / Username</h3>
					</div>
					<div className="feild-container">
						<input
							type="text"
							placeholder="Email / Username"
							name="user"
							value={user}
							onChange={(e) => setUser(e.target.value)}
						/>
					</div>
				</div>
				<div className="input-container">
					<div className="title-container">
						<h3>Password</h3>
					</div>
					<div className="feild-container">
						<input
							type="password"
							placeholder="Password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
				</div>
				<div className="btn-container">
					<button type="submit" onClick={() => login({ user, password })}>
						Login
					</button>
				</div>
				<div className="forget-pass-container">
					<Link to="/admin/reset-password">Forgot Password ?</Link>
				</div>
			</form>
		</div>
	);
};

export default Login;
