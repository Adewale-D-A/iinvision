import React, { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import IInvisionLoader from "../components/iinvision-loader";
import TopBar from "../components/top-bar";
import "./pagesCss/signup-screen.css";

//password checker
import { passwordStrength } from "check-password-strength";

const SignUpScreen = () => {
  const navigate = useNavigate();
  //hold user input
  const [firstname_input, setFirstname_input] = useState("");
  const [lastname_input, setLastname_input] = useState("");
  const [email_input, setEmail_input] = useState("");
  const [username_input, setUsername_input] = useState("");
  const [password_input, setPassword_input] = useState("");
  const [confirmPassword_input, setConfirmPassword_input] = useState("");

  //set necessary error message to user
  const [passmatch, setPassMatch] = useState("");
  const [passCondition, setPassCondition] = useState("");
  const [submitCheck, setSubmitCheck] = useState("");
  const [errorClass, setErrorClass] = useState("");
  //set necessary styles
  const [pass_hue_state, setPass_hue_state] = useState("#282c34");
  const [confirm_pass_hue_state, setConfirm_pass_hue_state] =
    useState("#282c34");

  const [password_state, setPassword_state] = useState();
  const [state_hue, setState_hue] = useState("white");

  const PasswordChecker = (e) => {
    setPassword_input(e.target.value);
    const password_check = passwordStrength(e.target.value);
    if (e.target.value.length > 0) {
      if (password_check.id === 0) {
        setPass_hue_state("red");
        setState_hue("red");
      } else if (password_check.id === 1) {
        setPass_hue_state("#FF7F3F");
        setState_hue("#FF7F3F");
      } else if (password_check.id === 2) {
        setPass_hue_state("#C3FF99");
        setState_hue("#C3FF99");
      } else if (password_check.id === 3) {
        setPass_hue_state("#7FB77E");
        setState_hue("#7FB77E");
      }
      setPassword_state(
        `${password_check.value} (only contains: ${password_check.contains} & length = ${password_check.length})`
      );
      setPassCondition(`(must contain: 'lowercase', 'uppercase', 'symbol',
      'number' & >=10 characters)`);
    } else {
      setPass_hue_state("#282c34");
      setPassword_state("");
      setPassCondition("");
    }
  };

  const confirmPasswordState = (e) => {
    setConfirmPassword_input(e.target.value);
    if (e.target.value.length > 0) {
      if (e.target.value !== password_input) {
        setConfirm_pass_hue_state("red");
        setPassMatch("passwords do not match");
      } else {
        setConfirm_pass_hue_state("#282c34");
        setPassMatch("");
      }
    } else {
      setConfirm_pass_hue_state("#282c34");
      setPassMatch("");
    }
  };
  const RegisterUser = {
    firstname: firstname_input,
    lastname: lastname_input,
    email: email_input,
    password: password_input,
    username: username_input,
  };
  const SubmitForm = (e) => {
    e.preventDefault();
    const hideSubmit = document.getElementsByClassName("ii-submit");
    const showLoader = document.getElementsByClassName("ii-loader");
    hideSubmit[0].style.display = "none";
    showLoader[0].style.display = "block";
    const passwordIntegrity = passwordStrength(password_input);
    if (passwordIntegrity.id === 3) {
      if (password_input === confirmPassword_input) {
        if (
          firstname_input &&
          lastname_input &&
          email_input &&
          username_input &&
          password_input
        ) {
          setSubmitCheck("");

          axios
            .post("http://localhost:5000/authenticate/register", RegisterUser, {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            })
            .then((response) => {
              navigate("/login", { replace: true });
              // cookies.set("username", response.data.user_data.username, {
              //   encode: String,
              //   sameSite: true,
              // });
              console.log(response);
            })
            .catch((error) => {
              console.log(error.response.data.message);
              if (error.response.data.message.length === 1) {
                if (error.response.data.message[0].username) {
                  setSubmitCheck(error.response.data.message[0].username);
                  setErrorClass("error-response");
                  hideSubmit[0].style.display = "block";
                  showLoader[0].style.display = "none";
                } else {
                  setErrorClass("error-response");
                  setSubmitCheck(error.response.data.message[0].email);
                  hideSubmit[0].style.display = "block";
                  showLoader[0].style.display = "none";
                }
              } else if (error.response.data.message.length === 2) {
                setSubmitCheck(
                  `${error.response.data.message[0].username} and ${error.response.data.message[1].email}`
                );

                setErrorClass("error-response");
                hideSubmit[0].style.display = "block";
                showLoader[0].style.display = "none";
              } else {
                setSubmitCheck(error.response.data.message);
                setErrorClass("error-response");
                hideSubmit[0].style.display = "block";
                showLoader[0].style.display = "none";
              }
            });
        } else {
          setErrorClass("error-response");
          setSubmitCheck("Please fill out all required fields");
          hideSubmit[0].style.display = "block";
          showLoader[0].style.display = "none";
        }
      } else {
        setErrorClass("error-response");
        setSubmitCheck("passwords do not match");
        hideSubmit[0].style.display = "block";
        showLoader[0].style.display = "none";
      }
    } else {
      setSubmitCheck(`password is ${passwordIntegrity.value}`);
      setErrorClass("error-response");
      hideSubmit[0].style.display = "block";
      showLoader[0].style.display = "none";
    }
  };

  return (
    <>
      <motion.div
        style={{ "--darkmode": "#282c34" }}
        className="signup-container"
        //motion framer page animation styling
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        exit={{ x: 0, transition: { duration: 0.1 } }}
      >
        <header>
          <TopBar />
        </header>
        <main>
          <h1 style={{ color: "#5FD068", textAlign: "center" }}>SIGN UP</h1>
          <div className={errorClass}>
            <span>{submitCheck}</span>
          </div>
          <div>
            <form onSubmit={SubmitForm}>
              <div className="form-flex">
                <div>
                  <label htmlFor="firstname">*firstname</label>
                  <br />
                  <input
                    className="signup-inputs"
                    type="text"
                    id="firstname"
                    placeholder="firstname"
                    required
                    value={firstname_input}
                    onChange={(e) => setFirstname_input(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="lastname">*lastname</label>
                  <br />
                  <input
                    className="signup-inputs"
                    type="text"
                    id="lastname"
                    placeholder="lastname"
                    required
                    value={lastname_input}
                    onChange={(e) => setLastname_input(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-flex">
                <div>
                  <label htmlFor="email">*email</label>
                  <br />
                  <input
                    type="email"
                    id="email"
                    placeholder="email"
                    className="signup-inputs"
                    required
                    value={email_input}
                    onChange={(e) => setEmail_input(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="username">*username</label>
                  <br />
                  <input
                    className="signup-inputs"
                    type="text"
                    id="username"
                    placeholder="username"
                    required
                    value={username_input}
                    onChange={(e) => setUsername_input(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-flex">
                <div>
                  <label htmlFor="password">*password</label>
                  <br />
                  <input
                    style={{ "--cue_hue": pass_hue_state }}
                    className="password-inputs"
                    type="password"
                    id="password"
                    placeholder="password"
                    value={password_input}
                    onChange={(e) => PasswordChecker(e)}
                    required
                  />{" "}
                  <div className="pass-stat">
                    <span style={{ color: state_hue }}>{password_state}</span>
                  </div>
                  <div className="must-contain-req">
                    <span
                      style={{ "--pass_req": pass_hue_state }}
                      className="pass-requirements"
                    >
                      {passCondition}
                    </span>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirm_password">*confirm password</label>
                  <br />
                  <input
                    style={{ "--cue_hue_cpi": confirm_pass_hue_state }}
                    className="confirm-password-inputs"
                    type="password"
                    id="confirm_password"
                    placeholder="confirm password"
                    required
                    value={confirmPassword_input}
                    onChange={(e) => confirmPasswordState(e)}
                  />
                  <div
                    style={{ "--match_stat": confirm_pass_hue_state }}
                    className="match-status"
                  >
                    <span>{passmatch}</span>
                  </div>
                </div>
              </div>
              <div className="btn-container">
                <button type="submit" className="form-btn">
                  <span className="ii-submit">
                    <span>submit</span>
                  </span>
                  <span className="ii-loader" style={{ display: "none" }}>
                    <IInvisionLoader />
                  </span>
                </button>
              </div>
            </form>
          </div>
        </main>
      </motion.div>
    </>
  );
};

export default SignUpScreen;
