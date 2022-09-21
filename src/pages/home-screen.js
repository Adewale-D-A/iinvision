import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import "./pagesCss/home-screen.css";
import { Link } from "react-router-dom";

function HomeSreen() {
  const box1Variant = {
    visible: { x: 0, transition: { duration: 1 } },
    hidden: { x: -400 },
  };
  const box2Variant = {
    visible: { x: 0, transition: { duration: 1 } },
    hidden: { x: 400 },
  };

  const control1 = useAnimation();
  const control2 = useAnimation();

  const [ref1, inView1] = useInView();
  const [ref2, inView2] = useInView();

  useEffect(() => {
    if (inView1) {
      control1.start("visible");
    }
    if (inView1 === false) {
      control1.start("hidden");
    }
    if (inView2) {
      control2.start("visible");
    }
    if (inView2 === false) {
      control2.start("hidden");
    }
  }, [control1, control2, inView1, inView2]);

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
          ref={ref1}
          variants={box1Variant}
          initial="hidden"
          animate={control1}
        >
          <h1>Hello</h1>
        </motion.div>
        <motion.div
          className="div-main-2"
          ref={ref2}
          variants={box2Variant}
          initial="hidden"
          animate={control2}
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
