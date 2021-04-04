import React from "react";
import { Link } from "react-router-dom";

//Styles
import "./style.scss";

//Assets
const Login = () => {
  return (
    <div className="login-container">
      <div className="form-container">
        <form>
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
            <button type="submit">Login</button>
          </div>
        </form>
        <div className="forget-pass-container">
          <Link to="/Password-Reset">Forgot Password ?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
