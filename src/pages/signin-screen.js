import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import IInvisionLoader from "../components/iinvision-loader";
import TopBar from "../components/top-bar";
import "./pagesCss/signin-screen.css";

function LoginScreen() {
  const navigate = useNavigate();

  // collect user payload
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  //signin function
  const Login = (e) => {
    e.preventDefault();
    const hideSubmit = document.getElementsByClassName("ii-submit");
    const showLoader = document.getElementsByClassName("ii-loader");
    hideSubmit[0].style.display = "none";
    showLoader[0].style.display = "block";
    // navigate("/user", { replace: true });
    const payloadArray = {
      username_email: username.toLowerCase(),
      password: password,
    };
    // console.log(payloadArray);
    axios
      .post("http://localhost:5000/authenticate/login", payloadArray)
      .then((response) => {
        console.log(response);
        console.log("received");
      })
      .catch((error) => {
        console.log(error);
        console.log("error");
      });
  };

  return (
    <>
      <div style={{ "--darkmode": "#282c34" }} className="login-container">
        <header>
          <TopBar />
        </header>
        <main>
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
          </div>
        </main>
      </div>
    </>
  );
}

export default LoginScreen;
