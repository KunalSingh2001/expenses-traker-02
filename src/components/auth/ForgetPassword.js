import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function ForgetPassword() {
    const [isLoading, setIsLoading] = useState(false);
    const emailRef = useRef();
    async function forgotPasswordHandler(event) {
        event.preventDefault();
        try {
            setIsLoading(true);
            const email = emailRef.current.value;
            const res = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDtfKBpbUoqwilqRNORQ22-NoOc7SnzNMA",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        requestType: "PASSWORD_RESET",
                        email: email,
                    }),
                }
            );

            const data = await res.json();
            console.log("Reset email response:", data);

            if (data.error) {
                alert("Error: " + data.error.message);
            } else {
                emailRef.current.value = "";
                setIsLoading(false);
                alert("Password reset email sent! Check your inbox.");
            }
        } catch (err) {
            console.error("Something went wrong", err);
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4 w-50">
                <h3 className="text-center mb-4">Forgot Password</h3>
                <form onSubmit={forgotPasswordHandler}>
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

                    <div className="mb-3 text-end">
                        <Link to="/login" className="text-decoration-none">
                            login again?
                        </Link>
                    </div>

                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-primary d-flex justify-content-center align-items-center"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                    ></span>
                                    Processing...
                                </>
                            ) : (
                                "Submit"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgetPassword;