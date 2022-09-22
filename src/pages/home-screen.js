import React from "react";
import { motion } from "framer-motion";

import "./pagesCss/home-screen.css";
import { Link } from "react-router-dom";
import pizzaSlice1 from "../staticAssets/pizza_display_1.jpg";
import pizzaSlice2 from "../staticAssets/pizza_display_2.jpg";

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
        <div className="img-ctn">
          <div className="dash-text">
            <h1>recipe book</h1>
          </div>
          <motion.img
            src={pizzaSlice1}
            alt=""
            className="piza_home"
            initial={{
              x: -400,
            }}
            whileInView={{ x: 0, transition: { duration: 1 } }}
          />
          <motion.img
            src={pizzaSlice2}
            alt=""
            className="piza_home"
            initial={{
              x: 400,
            }}
            whileInView={{ x: 0, transition: { duration: 1 } }}
          />
        </div>
      </main>
      <div className="footer-menu">
        <h1>Footer</h1>
      </div>
    </motion.div>
  );
}

export default HomeSreen;
