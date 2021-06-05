import React, { useState } from "react";
import { Link } from "react-router-dom";
import useHooks from "../hooks";

//Styles
import "./style.scss";

//Assets

const ResetPassword = () => {
	const { resetPassword } = useHooks();
	const [user, setUser] = useState("");
	return (
		<div className="password-reset-container">
			<div className="content-container">
				<div className="form-title-container">
					<h2>Reset Password</h2>
				</div>
				<div className="form-container">
					<form onSubmit={(e) => e.preventDefault()}>
						<div className="input-container">
							<div className="title-container">
								<h3>Email / Username</h3>
							</div>
							<div className="feild-container">
								<input
									type="text"
									placeholder="Email / Username"
									name="username"
									value={user}
									onChange={(e) => setUser(e.target.value)}
								/>
							</div>
						</div>
						<div className="btn-container">
							<button type="submit" onClick={() => resetPassword({ user })}>
								Send new password
							</button>
						</div>
					</form>
					<div className="forget-pass-container">
						<Link to="/admin/login">Go to login page</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResetPassword;
