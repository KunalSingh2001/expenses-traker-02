import React, { useRef, useContext } from 'react';
import { Readirect, useHistory, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
function Login() {
    const { setLoginHandler } = useContext(AuthContext)
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();
    async function loginSubmitHandler(event) {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if (password.length !== 6) {
            alert("Password must be at least 6 characters long");
            return;
        }
        try {
            const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDtfKBpbUoqwilqRNORQ22-NoOc7SnzNMA", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setLoginHandler(data);
                emailRef.current.value = "";
                passwordRef.current.value = "";
                history.push('/dashboard');
            } else {
                alert("Error: " + data.error.message);
            }
        } catch (err) {
            console.error("Network error:", err);
            alert("Something went wrong, please try again.");
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4 w-50">
                <h3 className="text-center mb-4">Login</h3>
                <form onSubmit={loginSubmitHandler}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            ref={emailRef}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter password"
                            ref={passwordRef}
                            required
                        />
                    </div>

                    {/* Forgot Password link */}
                    <div className="mb-3 text-end">
                        <Link to="/forgot-password" className="text-decoration-none">
                            Forgot Password?
                        </Link>
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Login;