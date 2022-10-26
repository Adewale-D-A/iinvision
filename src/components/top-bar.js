import { Link, useNavigate } from "react-router-dom";
import "./css/top-bar.css";

const TopBar = () => {
  const navigate = useNavigate();

  const navBack = () => {
    navigate(-1, { replace: true });
  };
  return (
    <>
      <div>
        <button className="back-btn" onClick={navBack}>
          <i class="fa-solid fa-arrow-left-long"> BACK</i>{" "}
        </button>
      </div>
      <Link to="/" className="link-style">
        <div className="i-logo">
          <span>iinvision &#128161;</span>
        </div>
      </Link>
    </>
  );
};
export default TopBar;
