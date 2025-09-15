import React, { useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
function Register() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    async function registerSubmitHandler(event) {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirm_password = confirmPasswordRef.current.value;
        if (password.length !== 6) {
            alert("Password must be at least 6 characters long");
            return;
        }
        if (password !== confirm_password) {
            alert("Password does not match with confirm password");
            return;
        }
        console.log(password,confirm_password );
        try {
            const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDtfKBpbUoqwilqRNORQ22-NoOc7SnzNMA", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true,
                }),
            });

            const data = await res.json();
            console.log('data', data)
            if (res.ok) {
                emailRef.current.value = "";
                passwordRef.current.value = "";
                confirmPasswordRef.current.value = "";
                alert('Reagister Successfully')
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
                <h3 className="text-center mb-4">Register</h3>
                <form onSubmit={registerSubmitHandler}>
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
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="confirmPassword"
                            placeholder="Re-enter password"
                            ref={confirmPasswordRef}
                            required
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
