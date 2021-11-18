
// Route pages of application
import React from "react";
import { useDispatch } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { attemptGetUser } from './store/thunks/user';

// Import components
import LandingPage from "./pages/landingPage";
import NavBar from "./components/navbar";
import ProtectedRoute from "./components/protectedRoute"
import LoginPage from "./pages/loginPage";
import DashboardPage from "./pages/dashboardPage";
import CalendarPage from "./pages/calendarPage";
import AboutUsPage from "./pages/aboutUsPage";
import SettingsPage from "./pages/settingsPage";
import RegisterPage from "./pages/registerPage";
import WelcomePage from "./pages/welcomePage";
import OptionsBar from "./components/optionsBar";
import TaskForm from "./pages/taskGenerator";

// Styles
import "./App.css";

// Driver for application
const App = () => {

  // Whether app is loading
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(attemptGetUser())
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [dispatch]);
  
  return !loading ? (
    <div>
      <OptionsBar style={{ maxWidth: '300px', position: 'absolute' }} />
      <NavBar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route path='/about-us' component={AboutUsPage} />
        <ProtectedRoute path='/dashboard' exact component={DashboardPage} />
        <ProtectedRoute path='/calendar' exact component={CalendarPage} />
        <ProtectedRoute path='/settings' exact component={SettingsPage} />
        <ProtectedRoute exact path='/welcome' component={WelcomePage} />
        <ProtectedRoute path='/task-creation' exact component={TaskForm} />
        <Redirect to='/home' />
      </Switch>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default App;