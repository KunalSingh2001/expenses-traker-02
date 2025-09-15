import React from 'react';
import {Link} from 'react-router-dom'
function Dashboard() {
    function verifyEmail(event) {
        event.preventDefault();
        console.log('enter')
    }

    return (
        <div className="d-flex justify-content-between align-items-center border-bottom border-dark pb-2 mb-3">
            <h6 className="mb-0">Welcome to Expense Tracker!!!</h6>
            <span className="badge bg-light text-dark">
                Your profile is Incomplete. <Link to="/profile" className="text-primary">Complete now</Link>
            </span>
            <button className="btn btn-primary"onClick={verifyEmail}>Verify email</button>
        </div>
    );
}

export default Dashboard;