import React from "react";
//react router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AccountHome from "./pages/account-home";

//import screens
import HomeSreen from "./pages/home-screen";
import LandingScreen from "./pages/landing-screen";
import LoginScreen from "./pages/signin-screen";
import SignUpScreen from "./pages/signup-screen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/home" element={<HomeSreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignUpScreen />} />
        <Route path="/user" element={<AccountHome />} />
        <Route path="*" element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
