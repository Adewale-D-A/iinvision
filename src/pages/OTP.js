import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TopBar from "../components/top-bar";
import "./pagesCss/OTP.css";

const EmailOTPConfirmation = () => {
  const [otpInput, setOtpInput] = useState("");

  const [showModal, setShowModal] = useState("none");
  const [closeRetry, setcloseRetry] = useState("close");
  const [OTPStatus, setOtpStatus] = useState("Accepted");
  const [OtpStatusHue, setOtpStatusHue] = useState("#61b15a");
  const [OtpInstruction, setOtpInstruction] = useState("");
  const [iconDisplay, setIconDisplay] = useState();

  const HideModal = (e) => {
    setShowModal("none");
  };

  const navigate = useNavigate();

  const verifyOTP = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/emailauth/verifytoken",
        { token: otpInput },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        setShowModal("");
        setcloseRetry("close");
        setOtpStatus("OTP Accepted");
        setOtpStatusHue("#61b15a");
        setIconDisplay(<i class="fa-sharp fa-solid fa-check"></i>);
        setOtpInstruction("redirecting to login ...");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        setShowModal("");
        setcloseRetry(
          <i class="fa-sharp fa-solid fa-arrow-rotate-left"> retry</i>
        );
        setOtpStatus("OTP Rejected");
        setOtpStatusHue("#B20600");
        setIconDisplay(<i class="fa-sharp fa-solid fa-xmark"></i>);
        setOtpInstruction("OTP is invalid, please use correct OTP");
      });
  };

  return (
    <>
      <motion.div
        //motion framer page animation styling
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: 0, transition: { duration: 0.1 } }}
      >
        <div style={{ display: showModal }} className="modal">
          <div className="modal-main">
            <div className="modal-content">
              <div>
                <button
                  onClick={HideModal}
                  className="otp-retry-btn"
                  style={{ "--okaycolor": OtpStatusHue }}
                >
                  {closeRetry}
                </button>
              </div>
              <div
                className="verification-ctn"
                style={{ "--okaycolor": OtpStatusHue }}
              >
                <div className="instruction">
                  <span>{OTPStatus}</span>
                </div>
                <div className="icon-check">
                  <span className="icon-mark">{iconDisplay}</span>
                </div>
              </div>
              <div style={{ "--okaycolor": OtpStatusHue }}>
                <span className="otp-instruction">{OtpInstruction}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="opt-main-container">
          <div className="opt-container">
            <div className="top-bar">
              <TopBar />
            </div>
            <div className="otp-input-field">
              <form className="form-email-otp-style" onSubmit={verifyOTP}>
                <div>
                  <input
                    type="text"
                    placeholder="Email OTP"
                    className="otp-input"
                    required
                    style={{ "--borderHue": "#FF7F3F" }}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                  />
                </div>
                <div>
                  <button className="otp-btn" type="submit">
                    verify
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default EmailOTPConfirmation;
