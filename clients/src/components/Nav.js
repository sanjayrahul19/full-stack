import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../action/user";
const Nav = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData.users);
  console.log(user);

  const logout = () => {
    dispatch(removeUser());
  };

  return (
    <div className="nav">
      <nav className="navBar">
        <h1>User Management</h1>
        <ul className="nav_container">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/user">User</Link>
          </li>
          <li>
            <Link to="/signUp">SignUp</Link>
          </li>
          <li>
            <Link to="/password">Password</Link>
          </li>
          {user ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
