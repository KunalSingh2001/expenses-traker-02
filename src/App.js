import React, { useContext } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/pages/Dashboard";
import Profile from "./components/pages/Profile";
import Frontend from "./components/pages/Frontend";
import ForgetPassword from "./components/auth/ForgetPassword";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
function App() {
	const {token} = useSelector((state) => state.auth);
	const {mode} = useSelector((state) => state.theme)
	console.log("theme", mode);
	// const { token, loading } = useContext(AuthContext);
	// if (loading) {
	// 	return <div className="text-center mt-5">Loading...</div>;
	// }
	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					{token ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
				</Route>
				<Route path="/register" exact component={Register} />
				<Route path="/forgot-password" exact component={ForgetPassword} />
				<Route path="/login" exact>
					{token ? <Redirect to="/dashboard" /> : <Login/>}
				</Route> 
				<Route path="/dashboard" exact>
					{token ? <Dashboard /> : <Redirect to="/login" />}
				</Route>

				<Route path="/profile" exact>
					{token ? <Profile /> : <Redirect to="/login" />}
				</Route>
				<Route path="/frontend" exact>
					{token ? <Frontend /> : <Redirect to="/login" />}
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
