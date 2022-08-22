import React from "react";
import "./pagesCss/home-screen.css";

function HomeSreen() {
  return (
    <div className="home" style={{ "--darkmode": "#282c34" }}>
      <header className="home-header">
        <div className="i-logo">
          <span>iinvision &#128161;</span>
        </div>
        <div className="i-motto">
          <span>document your thoughts and bright ideas</span>
        </div>
        <div className="sign-up_in">
          <div className="sign_user">
            <span>sign in</span>
          </div>
          <div className="sign_user">
            <span>signup</span>
          </div>
        </div>
      </header>
    </div>
  );
}

export default HomeSreen;
