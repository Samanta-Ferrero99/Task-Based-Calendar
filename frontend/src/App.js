
// Route pages of application
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UseGoogleLoginProps } from "react-google-login";

// Auth imports
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

// Import components
import LandingPage from "./pages/landingPage";
import NavBar from "./components/navbar";
import LoginPage from "./pages/loginPage";
import DashboardPage from "./pages/dashboardPage";
import CalendarPage from "./pages/calendarPage";
import AboutUsPage from "./pages/aboutUsPage";
import SettingsPage from "./pages/settingsPage";
import RegisterPage from "./pages/registerPage";

import Login from "./components/auth/login";
import Register from "./components/auth/register";

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user info and exp
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds

  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

const App = () => {

  return (
    <div>
      <Provider store={store}>
        <NavBar isAuth={UseGoogleLoginProps} />
        <Router>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/calendar" component={CalendarPage} />
            <Route path="/about-us" component={AboutUsPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/register" component={RegisterPage} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
