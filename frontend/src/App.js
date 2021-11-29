
// Route pages of application
import React from "react";
import { useDispatch } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router-dom';
import { attemptGetUser } from './store/thunks/user';
import {Spin} from "antd";

// Import components
import LandingPage from "./pages/landingPage";
import NavBar from "./components/navbar";
import ProtectedRoute from "./components/protectedRoute"
import LoginPage from "./pages/loginPage";
import DashboardPage from "./pages/dashboardPage";
import CalendarPage from "./pages/calendarPage";
import AboutUsPage from "./pages/aboutUsPage";
import RegisterPage from "./pages/registerPage";
import TaskForm from "./pages/taskGenerator";
import ViewChroniclePage from "./pages/viewChroniclePage";
import ViewTaskPage from './pages/viewTaskPage';

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
      {/* <OptionsBar style={{ maxWidth: '300px', position: 'absolute' }} /> */}
      <NavBar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegisterPage} />
        <Route path='/about-us' component={AboutUsPage} />
        <ProtectedRoute path='/dashboard' exact component={DashboardPage} />
        <ProtectedRoute path='/calendar' exact component={CalendarPage} />
        <ProtectedRoute path='/task-creation' exact component={TaskForm} />
        <Route path='/view-chronicle' exact component={ViewChroniclePage} />
        <Route path='/view-task' exact component={ViewTaskPage} />
        <Redirect to='/home' />
      </Switch>
    </div>
  ) : (
    <Spin size="large" style={{position: "absolute", top: "50vh", left: "50vw"}}/>
  );
}

export default App;