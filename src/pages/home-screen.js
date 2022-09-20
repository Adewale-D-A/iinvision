import React from "react";
import { motion } from "framer-motion";

import "./pagesCss/home-screen.css";
import { Link } from "react-router-dom";

function HomeSreen() {
  return (
    <motion.div
      className="home"
      style={{ "--darkmode": "#282c34" }}
      //motion framer page animation styling
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.1 }}
    >
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
          <Link to="/signup" className="signup-user">
            <span text-data="signup" className="sign_up_user">
              signup
            </span>
          </Link>
        </div>
      </header>
    </motion.div>
  );
}

export default HomeSreen;
