import "./pagesCss/landing-screen.css";
import { useNavigate } from "react-router-dom";

function LandingScreen() {
  const navigate = useNavigate();

  setTimeout(function () {
    navigate("./home", { replace: true });
  }, 2000); //wait 2 seconds

  return (
    <div className="landing">
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
    </div>
  );
}

export default LandingScreen;
