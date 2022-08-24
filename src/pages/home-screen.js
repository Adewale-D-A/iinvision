import React from "react";
import "./pagesCss/home-screen.css";
import { Link } from "react-router-dom";

function HomeSreen() {
  return (
    <div className="home" style={{ "--darkmode": "#282c34" }}>
      <header className="home-header">
        <div className="i-logo">
          <span>iinvision &#128161;</span>
        </div>
        <div className="i-motto">
          <span>document your technological ideas</span>
        </div>
        <div className="sign-up_in">
          <Link to="/login" className="sign_user">
            <span className="login_user" text-data="login">
              login
            </span>
          </Link>
          <div className="sign_user">
            <span>signup</span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default HomeSreen;