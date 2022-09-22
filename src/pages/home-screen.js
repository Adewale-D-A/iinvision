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
      <main>
        <motion.div
          className="div-main-1"
          initial={{
            x: -400,
          }}
          whileInView={{ x: 0, transition: { duration: 1 } }}
        >
          <h1>Hello</h1>
        </motion.div>
        <motion.div
          className="div-main-2"
          initial={{
            x: 400,
          }}
          whileInView={{ x: 0, transition: { duration: 1 } }}
        >
          <h1>World</h1>
        </motion.div>
      </main>
      <div className="footer-menu">
        <h1>Footer</h1>
      </div>
    </motion.div>
  );
}

export default HomeSreen;
