import React from "react";

//react router
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import screens
import HomeSreen from "./pages/home-screen";
import LandingScreen from "./pages/landing-screen";
import LoginScreen from "./pages/signin-screen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path="/home" element={<HomeSreen />} />
        <Route path="/login" element={<LoginScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
