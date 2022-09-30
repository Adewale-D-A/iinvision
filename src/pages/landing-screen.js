import "./pagesCss/landing-screen.css";
// import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import { motion } from "framer-motion";

function LandingScreen() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   setTimeout(function () {
  //     // navigate(-1);
  //     navigate("/home", { replace: true });
  //   }, 2000); //wait 2 seconds
  // }, [navigate]);

  return (
    <motion.div
      className="landing"
      //motion framer page animation styling
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: 0, transition: { duration: 0.1 } }}
    >
      <header className="landing-header">
        <div className="i-landing-pg">
          <h1
            data-text="&nbsp;...iinvision&nbsp;&#128161;"
            className="i-tag"
            style={{ "--hue": "#FAEA48" }}
          >
            &nbsp;...iinvision&nbsp;&#128161;
          </h1>
        </div>
      </header>
    </motion.div>
  );
}

export default LandingScreen;
