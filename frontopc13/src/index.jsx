import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "../src/style/style.css";
import Home from "./pages/home/home";
import SignIn from "./pages/signIn/signIn";
import User from "./pages/user/user";
import { store } from "./redux/redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
