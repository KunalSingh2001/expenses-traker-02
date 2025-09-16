import React, { useCallback, useContext } from "react";
import "./App.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/pages/Dashboard";
import Profile from "./components/pages/Profile";
import ForgetPassword from "./components/auth/ForgetPassword";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./components/context/AuthContext";

function App() {
  const { token } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/register" exact component={Register} />
        <Route path="/forgot-password" exact component={ForgetPassword} />
        <Route path="/login" exact component={Login} />
        <Route path='/dashboard'>
          {token &&
            <Dashboard />
          }
        </Route>
        <Route path='/profile'>
          {token &&
            <Profile />
          }
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
