import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TopBar from "../components/top-bar";
import "./pagesCss/changePassword.css";
import Cookies from "universal-cookie";

//password checker
import { passwordStrength } from "check-password-strength";

const ChangePassword = () => {
  const cookies = new Cookies();
  const tokenizedMail = cookies.get("tokenMail");

  const [emailToken, setEmailToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showStateMsg, setShowStateMsg] = useState("");

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

  const HandlePasswordChange = (e) => {
    e.preventDefault();
    if (emailToken && newPassword && confirmPassword) {
      const passwordIntegrity = passwordStrength(newPassword);
      if (passwordIntegrity.id === 3) {
        if (newPassword === confirmPassword) {
          axios
            .post(
              "http://localhost:5000/pass/resetPassword",
              { resetCode: emailToken, newPassword: newPassword },
              {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              }
            )
            .then((response) => {
              console.log(response);
              setShowModal("");
              setcloseRetry("close");
              setOtpStatus("Password Changed");
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
        } else {
          setShowStateMsg(`passwords do not match`);
        }
      } else {
        setShowStateMsg(
          `password is ${passwordIntegrity.value} (must contain: 'lowercase', 'uppercase', 'symbol',
          'number' & >=10 characters)`
        );
      }
    } else {
      setShowStateMsg("All fields are required");
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
        <div style={{ display: showModal }} className="modal-reset">
          <div className="modal-main-reset">
            <div className="modal-content-reset">
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
                className="verification-ctn-reset"
                style={{ "--okaycolor": OtpStatusHue }}
              >
                <div className="instruction-reset">
                  <span>{OTPStatus}</span>
                </div>
                <div className="icon-check-reset">
                  <span className="icon-mark-reset">{iconDisplay}</span>
                </div>
              </div>
              <div style={{ "--okaycolor": OtpStatusHue }}>
                <span className="otp-instruction-reset">{OtpInstruction}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="opt-main-container-reset">
          <div className="opt-container">
            <div className="top-bar">
              <TopBar />
            </div>
            <div className="reset-password-field">
              <div className="show-error-msg">
                <span>{showStateMsg}</span>
              </div>
              <form
                onSubmit={HandlePasswordChange}
                className="reset-form-sheet"
              >
                <div className="input-fields-style">
                  <label htmlFor="otp" className="labels">
                    Email Token
                  </label>{" "}
                  <br />
                  <input
                    id="otp"
                    type="text"
                    placeholder="reset token"
                    className="otp-input"
                    required
                    style={{ "--borderHue": "#FF7F3F" }}
                    value={emailToken}
                    onChange={(e) => setEmailToken(e.target.value)}
                  />
                </div>
                <div className="input-fields-style">
                  <label htmlFor="new-pass" className="labels">
                    New password
                  </label>{" "}
                  <br />
                  <input
                    id="new-pass"
                    type="password"
                    placeholder="new password"
                    required
                    className="otp-input"
                    style={{ "--borderHue": "#FF7F3F" }}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="input-fields-style">
                  <label htmlFor="new-pass" className="labels">
                    confirm password
                  </label>{" "}
                  <br />
                  <input
                    id="confirm-pass"
                    type="password"
                    placeholder="confirm password"
                    className="otp-input"
                    required
                    style={{ "--borderHue": "#FF7F3F" }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="sub-btn">
                  <button className="reset-btn" type="submit">
                    Reset Password
                  </button>
                </div>
                <div className="mailtoken-sent-msg">
                  <span>
                    Password reset token has been sent to {tokenizedMail}
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ChangePassword;
