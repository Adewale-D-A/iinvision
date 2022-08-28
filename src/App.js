import React from "react";
//react router
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./animatedRoutes/animatedRoutes";

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
