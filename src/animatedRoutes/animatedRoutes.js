import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

//import screens
import AccountHome from "../pages/account-home";
import HomeSreen from "../pages/home-screen";
import LandingScreen from "../pages/landing-screen";
import LoginScreen from "../pages/signin-screen";
import SignUpScreen from "../pages/signup-screen";
import EmailOTPConfirmation from "../pages/OTP";
import ForgetPassword from "../pages/forgetPassword";
import ChangePassword from "../pages/changePassword";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/home" element={<HomeSreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/user" element={<AccountHome />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/emailconfirmation" element={<EmailOTPConfirmation />} />
        <Route path="/resetPassword" element={<ForgetPassword />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route path="*" element={<LoginScreen />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
