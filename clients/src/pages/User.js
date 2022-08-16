import React, { useState, useEffect } from "react";
import axios from "../axios/axios";
const User = () => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const users = async () => {
      try {
        const { data } = await axios.get("/usersdata", {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        });
        if (data?.success === true) {
          setUser(data.user);
        }
      } catch (err) {
        console.log(err);
        setUser(err.data.msg);
      }
    };
    users();
  }, []);

  return (
    <div>
      {user.length > 0 ? (
        user.map((user) => (
          <div key={user._id}>
            <h1>{user.name}</h1>
          </div>
        ))
      ) : (
        <h1>Restricted Account</h1>
      )}
    </div>
  );
};

export default User;
