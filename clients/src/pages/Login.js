import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "../axios/axios";
import { handleToken } from "../action/user";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/login", user);
      if (data?.token) {
        console.log(data.token);
        localStorage.setItem("token", data?.token);
        dispatch(handleToken(data?.token));
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <div style={{ padding: "10px" }}>
        <label htmlFor="email">Email:</label>
        <input
          name="email"
          type="text"
          id="email"
          onChange={handleChange}
          style={{ padding: "7px", width: "200px" }}
        />
      </div>
      <div style={{ padding: "10px" }}>
        <label htmlFor="password">Password:</label>
        <input
          name="password"
          type="text"
          id="password"
          onChange={handleChange}
          style={{ padding: "7px", width: "200px" }}
        />
      </div>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default Login;
