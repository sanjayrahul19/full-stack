import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import userReducer from "./reducer/user";
import reduxThunk from "redux-thunk";

const rootReducers = combineReducers({
  userData: userReducer,
});

const store = createStore(rootReducers, applyMiddleware(reduxThunk));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
