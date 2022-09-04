import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TopBar from "../components/top-bar";
import "./pagesCss/forgetPassword.css";
import Cookies from "universal-cookie";

const ForgetPassword = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [emailInput, setEmailInput] = useState("");
  const [showMessage, setShowMessage] = useState("");

  const verifyOTP = (e) => {
    e.preventDefault();
    if (emailInput) {
      axios
        .post(
          "http://localhost:5000/emailauth/resetotp",
          { email: emailInput },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response);
          setShowMessage("");
          cookies.set("tokenMail", emailInput, {
            encode: String,
            sameSite: true,
          });
          navigate("/changePassword", { replace: true });
        })
        .catch((error) => {
          console.log(error);
          setShowMessage("user does not exist");
        });
    } else {
      setShowMessage("This field is required");
    }
  };

  return (
    <>
      <motion.div
        //motion framer page animation styling
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: 0, transition: { duration: 0.1 } }}
      >
        <div className="opt-container">
          <div className="top-bar">
            <TopBar />
          </div>
          <div className="email-main">
            <div>
              <div className="user-error-message">
                <span>{showMessage}</span>
              </div>
              <form>
                <div className="otp-input-field">
                  <div>
                    <input
                      type="email"
                      placeholder="user email"
                      className="otp-input"
                      required
                      style={{ "--borderHue": "#FF7F3F" }}
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                    />
                  </div>
                  <div>
                    <button
                      className="otp-btn"
                      type="submit"
                      onClick={verifyOTP}
                    >
                      submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ForgetPassword;
