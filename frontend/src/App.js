
// Route pages of application
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Authentication
import AuthService from "./services/authService";
import EventBus from "./utils/eventBus";

// Import components
import LandingPage from "./pages/landingPage";
import NavBar from "./components/navbar";
import LoginPage from "./pages/loginPage";
import DashboardPage from "./pages/dashboardPage";
import CalendarPage from "./pages/calendarPage";
import AboutUsPage from "./pages/aboutUsPage";
import SettingsPage from "./pages/settingsPage";
import RegisterPage from "./pages/registerPage";
import WelcomePage from "./pages/welcomePage";
import OptionsBar from "./components/optionsBar";
import TaskCreation from "./pages/taskGenerator";

// Styles
import "./App.css";

// Driver for application
const App = () => {
  
  // Current application user
  const [currentUser, setCurrentUser] = React.useState(undefined);

  // User is logged in - boolean
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // Run on initial render to retrieve signed in user (if exists).
  React.useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
    }

    EventBus.on("login", () => {
      setCurrentUser(AuthService.getCurrentUser());
      setIsLoggedIn(true);
    });

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
      EventBus.remove("login");
    };
  }, []);

  // Logout utility
  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    setIsLoggedIn(false);
  };
  
  return (
    <div>
      <Router>
        <div>
          <OptionsBar style={{ maxWidth: "300px", position: "absolute" }} />
          <NavBar isLoggedIn={isLoggedIn} />
          <Switch>
            <Route path="/dashboard" component={DashboardPage} />
            <Route path="/calendar" component={CalendarPage} />
            <Route path="/about-us" component={AboutUsPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/welcome" component={WelcomePage} />
            <Route path="/task-creation" component={TaskCreation} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;