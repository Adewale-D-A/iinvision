import React from "react";
import IInvisionLoader from "../components/iinvision-loader";
import TopBar from "../components/top-bar";
import "./pagesCss/signin-screen.css";

function LoginScreen() {
  const Login = (e) => {
    e.preventDefault();
    const hideSubmit = document.getElementsByClassName("ii-submit");
    const showLoader = document.getElementsByClassName("ii-loader");
    hideSubmit[0].style.display = "none";
    showLoader[0].style.display = "block";
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
                >
                  {/* <i class="fas fa-lock"></i> */}
                  {/* <span>Holla</span> */}
                </input>
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
