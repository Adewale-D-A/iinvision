import { Link } from "react-router-dom";
import "./css/top-bar.css";
const TopBar = () => {
  return (
    <>
      <Link to="/home" className="link-style">
        <div className="i-logo">
          <span>iinvision &#128161;</span>
        </div>
      </Link>
    </>
  );
};
export default TopBar;
