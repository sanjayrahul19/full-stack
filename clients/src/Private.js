import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleToken } from "./action/user";
import { Outlet, Navigate } from "react-router-dom";
const Private = () => {
  const [isToken, setIsToken] = useState(false);
  const user = useSelector((state) => state.userData.users);
  console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(handleToken(token));
      }
      setTimeout(() => {
        setIsToken(true);
      }, 1000);
    } else {
      setIsToken(true);
    }
  }, []);

  if (isToken) {
    return user ? <Outlet /> : <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Private;
