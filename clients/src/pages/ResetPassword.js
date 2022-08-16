import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios/axios";
const ResetPassword = () => {
  const [user, setUser] = useState({
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const { id } = useParams();

  const reset = async () => {
    try {
      const res = await axios.post("/reset-password", user, {
        headers: {
          authorization: id,
        },
      });
      if (res.data.success === true) {
        return setError(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {error.length > 0 ? (
        <h1>{error}</h1>
      ) : (
        <div style={{ padding: "10px" }}>
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="text"
            id="password"
            onChange={handleChange}
            style={{ padding: "7px", width: "200px" }}
          />
          <button onClick={reset}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
