import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Cookies from "universal-cookie";

import IInvisionLoader from "../components/iinvision-loader";
import TopBar from "../components/top-bar";
import "./pagesCss/signin-screen.css";

import img from "../staticAssets/real.png";

function LoginScreen() {
  const navigate = useNavigate();

  const cookies = new Cookies();
  // collect user payload
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //load correct error response
  const [errorClass, setErrorClass] = useState("");
  const [error, setError] = useState("");
  //signin function
  const Login = (e) => {
    e.preventDefault();
    const hideSubmit = document.getElementsByClassName("ii-submit");
    const showLoader = document.getElementsByClassName("ii-loader");
    hideSubmit[0].style.display = "none";
    showLoader[0].style.display = "block";
    const payloadArray = {
      username_email: username.toLowerCase(),
      password: password,
    };
    axios
      .post("http://localhost:5000/authenticate/login", payloadArray, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        navigate("/user", { replace: true });
        cookies.set("username", response.data?.user_data?.username, {
          encode: String,
          sameSite: true,
        });
      })
      .catch((error) => {
        if (error.response.data?.message) {
          setErrorClass("error-response");
          setError(error.response.data?.message);
        }
        hideSubmit[0].style.display = "block";
        showLoader[0].style.display = "none";
      });
  };

  return (
    <>
      <motion.div
        style={{ "--darkmode": "#282c34" }}
        className="login-container"
        //motion framer page animation styling
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        // exit={{
        //   x: "100%",
        //   transition: { duration: 0.1 },
        // }}
        transition={{ duration: 0.1 }}
      >
        <header>
          <TopBar />
        </header>
        <img src={img} alt="" className="img" />
        <main className="main-login-page">
          <div className="side-img" alt=""></div>
          <div className="main-ctn">
            <div className={errorClass}>
              <span>{error}</span>
            </div>
            <div>
              <form onSubmit={Login}>
                <div className="user-icon">
                  <span className="user-i">
                    <i class="fa-solid fa-user-lock"></i>
                  </span>
                </div>
                <div>
                  <label htmlFor="username">username</label>
                  <br />
                  <input
                    type="text"
                    placeholder="username or email"
                    className="login-input"
                    id="username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password">password</label>
                  <br />
                  <input
                    type="password"
                    placeholder="password"
                    className="login-input"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <div className="submit-btn">
                  <button type="submit" className="sub-btn">
                    <span className="ii-submit">
                      <span style={{ marginRight: "5px" }}>
                        <i class="fas fa-fingerprint"></i>
                      </span>
                      <span>submit</span>
                    </span>
                    <span className="ii-loader" style={{ display: "none" }}>
                      <IInvisionLoader />
                    </span>
                  </button>
                </div>
              </form>
              <div className="login-signup">
                <span>
                  dont't have an account?{" "}
                  <Link to="/signup" className="link-signup">
                    {" "}
                    Signup
                  </Link>
                </span>
                <br />
                <span>
                  <Link to="/resetPassword" className="link-signup">
                    forgot password?
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </main>
      </motion.div>
    </>
  );
}

export default LoginScreen;
