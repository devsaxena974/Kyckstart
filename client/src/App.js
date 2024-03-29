import React, {Fragment} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import "./App.css"
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
import UpdateName from './components/UpdateName';
import Business from './components/Business';
import Memberships from './components/Memberships';
import Browse from './components/Browse';
import About from './components/About';


function App() {
  return (
    <div className="mt-2 mb-5">
    <AuthProvider>
      <Router>
        <Fragment>
          <AuthProvider>
            <Switch>
              <PrivateRoute path="/" exact component={Home} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/join" component={Join} />
              <PrivateRoute path="/mybusiness" component={MyBusiness} />
              <PrivateRoute path="/memberships" component={Memberships} />
              <PrivateRoute path="/updatebusiness" component={UpdateName} />
              <PrivateRoute path="/browse" component={Browse} />
              <PrivateRoute path="/business/:name" component={Business} />
              <Route path="/about" component={About} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Footer />
            </Switch>
          </AuthProvider>
        </Fragment>
      </Router>
    </AuthProvider>
    </div>
  );
}

export default App;
