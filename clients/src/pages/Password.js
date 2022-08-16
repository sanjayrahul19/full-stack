import React, { useState } from "react";
import axios from "../axios/axios";

const Password = () => {
  const [user, setUser] = useState({
    email: "",
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
    try {
      await axios.post("/password", user);
    } catch (err) {
      console.log(err);
    }
    setUser({
      email: "",
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
      <button style={{ padding: "7px" }} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Password;
