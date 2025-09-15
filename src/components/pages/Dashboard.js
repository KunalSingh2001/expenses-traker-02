import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
function Dashboard() {
    const { token, logoutHandler } = useContext(AuthContext);
    async function verifyEmail(event) {
        event.preventDefault();
        const res = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDtfKBpbUoqwilqRNORQ22-NoOc7SnzNMA", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: token,
            })
        });

        const data = await res.json();
        console.log(data);
    }

    return (
        <div className="d-flex justify-content-between align-items-center border-bottom border-dark pb-2 mb-3">
            <h6 className="mb-0">Welcome to Expense Tracker!!!</h6>
            <span className="badge bg-light text-dark">
                Your profile is Incomplete. <Link to="/profile" className="text-primary">Complete now</Link>
            </span>
            <button className="btn btn-primary" onClick={verifyEmail}>Verify email</button>
            <button className="btn btn-danger" onClick={logoutHandler}>Logout</button>
        </div>
    );
}

export default Dashboard;