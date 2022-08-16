import React, { useEffect } from "react";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import SignUp from "./pages/SignUp";
import Verify from "./pages/Verify";
import Login from "./pages/Login";
import Password from "./pages/Password";
import ResetPassword from "./pages/ResetPassword";
import { useDispatch } from "react-redux";
import { handleToken } from "./action/user";
import Private from "./Private";
const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(handleToken(token));
    }
  }, [token]);

  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/verify/:id" element={<Verify />} />
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<Private />}>
          <Route path="/user" element={<User />} />
        </Route>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password" element={<Password />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
