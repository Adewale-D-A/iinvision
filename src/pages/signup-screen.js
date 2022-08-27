import React, { useState } from "react";

import TopBar from "../components/top-bar";
import "./pagesCss/signup-screen.css";

//password checker
import { passwordStrength } from "check-password-strength";

const SignUpScreen = () => {
  //hold user input
  const [firstname_input, setFirstname_input] = useState();
  const [lastname_input, setLastname_input] = useState();
  const [email_input, setEmail_input] = useState();
  const [username_input, setUsername_input] = useState();
  const [password_input, setPassword_input] = useState();
  const [confirmPassword_input, setConfirmPassword_input] = useState();

  const [passmatch, setPassMatch] = useState("");
  const [passCondition, setPassCondition] = useState("");
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

  return (
    <>
      <div style={{ "--darkmode": "#282c34" }} className="signup-container">
        <header>
          <TopBar />
        </header>
        <main>
          <div>
            <form>
              <h1 style={{ color: "#5FD068", textAlign: "center" }}>SIGN UP</h1>
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
                  submit
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default SignUpScreen;
