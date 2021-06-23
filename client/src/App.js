import React, {Fragment} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import { AuthProvider } from './contexts/AuthContext';



//components
import Home from "./components/Home"
import Join from "./components/Join"
import Footer from "./components/Footer"
import Signup from './components/Signup';
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';
import UpdateProfile from './components/UpdateProfile';
import MyBusiness from './components/MyBusiness';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Fragment>
          <AuthProvider>
            <Switch>
              <PrivateRoute path="/" exact component={Home} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/join" component={Join} />
              <PrivateRoute path="/mybusiness" component={MyBusiness} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Footer />
            </Switch>
          </AuthProvider>
        </Fragment>
      </Router>
    </AuthProvider>
  );
}

export default App;
