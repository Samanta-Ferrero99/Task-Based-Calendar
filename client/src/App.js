import React from "react";

// Route pages of application
import { Route } from "react-router-dom";

// Import components
import LandingPage from "./components/landingPage";
import NavBar from "./components/navbar";
import "./App.css";

const App = () => {
  return (
    <div>
      <Route exact path="/">
        <NavBar />
        <LandingPage />
      </Route>
    </div>
  );
};

export default App;
