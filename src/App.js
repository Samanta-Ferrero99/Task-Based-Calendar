
// Route pages of application
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UseGoogleLoginProps } from "react-google-login";

// Import components
import LandingPage from "./pages/landingPage";
import NavBar from "./components/navbar";
import LoginPage from "./pages/loginPage";
import DashboardPage from "./pages/dashboardPage";
import CalendarPage from "./pages/calendarPage";
import AboutUsPage from "./pages/aboutUsPage";
import SettingsPage from "./pages/settingsPage";


import "./App.css";


const App = () => {

  return (
    <div>
      <NavBar isAuth={UseGoogleLoginProps}/>
      <Router>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/calendar" component={CalendarPage} />
          <Route path="/about-us" component={AboutUsPage} />
          <Route path="/settings" component={SettingsPage} />
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
