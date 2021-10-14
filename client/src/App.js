import React from "react";

// Route pages of application
import { Route } from "react-router-dom";

// Import components
import LandingPage from "./components/landingPage";
import NavBar from "./components/navbar";
import "./App.css";
import LoginPage from "./components/login";

const App = () => {
  return (
    <div>
      <NavBar />
      <Route exact path="/">
        <LandingPage />
      </Route>
      <Route exact path="/login">
        <LoginPage />
      </Route>
    </div>
  );
};

export default App;
