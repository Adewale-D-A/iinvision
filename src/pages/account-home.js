import { motion } from "framer-motion";
import Cookies from "universal-cookie";
import TopBar from "../components/top-bar";
import "./pagesCss/account-home.css";

const AccountHome = () => {
  const cookies = new Cookies();
  const username = cookies.get("username");

  return (
    <>
      <motion.div
        className="user-account"
        style={{ "--darkmode": "#282c34" }}
        //motion framer page animation styling
        initial={{ width: 0, overflow: "hidden" }}
        animate={{ width: "100%" }}
        exit={{ x: "100%", transition: { duration: 0.1 } }}
      >
        <header>
          <TopBar />
        </header>
        <main>
          <h1>Welcome Home {username}</h1>
        </main>
      </motion.div>
    </>
  );
};

export default AccountHome;
