import React, { useContext, useEffect } from "react";
import "./Login.css";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Login = ({ url }) => {
  const navigate = useNavigate();
  const { admin, setAdmin, token, setToken } = useContext(StoreContext);
  const [data, setData] = useState({ email: "", password: "" });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    const response = await axios.post(url + "/api/user/login", data);
    if (response.data.success) {
      if (response.data.role === "admin") {
        setToken(response.data.token);
        setAdmin(true);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("admin", true);
        toast.success("Login Successfully");
        navigate("/dashboard");
      } else {
        toast.error("You are not an admin");
      }
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    if (admin && token) {
      navigate("/add");
    }
  }, []);

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">

        <div className="login-logo">
          <div className="login-logo-icon">🍽️</div>
          <h2>EasyFood</h2>
          <p>Admin Panel</p>
        </div>

        <div className="login-popup-title">
          <h2>Welcome back</h2>
          <p>Sign in to your admin account</p>
        </div>

        <div className="login-popup-inputs">
          <div className="input-group">
            <label>Email address</label>
            <input
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type="password"
              placeholder="Your password"
              required
            />
          </div>
        </div>

        <button type="submit">Login</button>

        <p className="login-footer">EasyFood Admin © 2026</p>

      </form>
    </div>
  );
};

export default Login;