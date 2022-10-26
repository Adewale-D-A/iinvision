import React, { Suspense } from "react";
//react router
import { BrowserRouter } from "react-router-dom";
import LandingScreen from "./pages/landing-screen";

const AnimatedRoutes = React.lazy(() =>
  import("./animatedRoutes/animatedRoutes")
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LandingScreen />}>
        <AnimatedRoutes />
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
