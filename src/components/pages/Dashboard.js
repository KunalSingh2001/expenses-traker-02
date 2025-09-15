import React from 'react';
import {Link} from 'react-router-dom'
function Dashboard() {
    return (
        <div className="d-flex justify-content-between align-items-center border-bottom border-dark pb-2 mb-3">
            <h6 className="mb-0">Welcome to Expense Tracker!!!</h6>
            <span className="badge bg-light text-dark">
                Your profile is Incomplete. <Link to="/profile" className="text-primary">Complete now</Link>
            </span>
        </div>
    );
}

export default Dashboard;