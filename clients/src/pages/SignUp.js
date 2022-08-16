import React, { useState } from "react";
import axios from "../axios/axios";

const SignUp = () => {
  const [user, setUser] = useState({
    name: "",
    role: "",
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
      const { data } = await axios.post("/signUp", user);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    setUser({
      name: "",
      role: "",
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <form autoComplete="off">
        <div style={{ padding: "10px" }}>
          <label htmlFor="userName">Name:</label>
          <input
            name="name"
            type="text"
            id="userName"
            onChange={handleChange}
            value={user.userName}
            style={{ padding: "7px", width: "200px" }}
          />
          <div style={{ marginTop: "20px" }}>
            <select
              style={{ padding: "10px" }}
              name="role"
              onChange={handleChange}
              value={user.role}
            >
              <option>Select</option>
              <option>admin</option>
              <option>employee</option>
            </select>
          </div>
        </div>
        <div style={{ padding: "10px" }}>
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="text"
            id="email"
            onChange={handleChange}
            value={user.email}
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
            value={user.password}
            style={{ padding: "7px", width: "200px" }}
          />
        </div>
      </form>
      <button style={{ padding: "10px" }} onClick={handleSubmit}>
        SignUp
      </button>
    </div>
  );
};

export default SignUp;
