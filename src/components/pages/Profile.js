import React, { useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
function Profile() {
    const { token } = useContext(AuthContext);
    const fullNameRef = useRef();
    const profilePhotoRef = useRef();
    console.log('token', token);
    async function handleFormSubmit(event) {
        event.preventDefault();
        const name = fullNameRef.current.value;
        const url = profilePhotoRef.current.value;
        const res = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDtfKBpbUoqwilqRNORQ22-NoOc7SnzNMA",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    idToken: token,
                    displayName: name,
                    photoUrl: url,
                    returnSecureToken: true,
                }),
            }
        );
        const data = await res.json();
        console.log('data', data);
    }

    useEffect(() => {
        async function fetchUserDetail() {
            try {
                const res = await fetch(
                    "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDtfKBpbUoqwilqRNORQ22-NoOc7SnzNMA",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            idToken: token, 
                        }),
                    }
                );

                const data = await res.json();
                if (data && data.users && data.users.length > 0) {
                    fullNameRef.current.value = data.users[0].displayName || "";
                    profilePhotoRef.current.value = data.users[0].photoUrl || "";
                }
            } catch (err) {
                console.error("Error fetching user details:", err);
            }
        }

        fetchUserDetail();
    }, [token]);


    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center border-bottom border-dark pb-2 mb-4">
                <h6 className="mb-0 fst-italic">Winners never quit, Quitters never win.</h6>
                <span className="badge bg-light text-dark">
                    Your Profile is <strong>64%</strong> completed.
                    A complete Profile has higher chances of landing a job.{" "}
                    <Link to="/complete-profile" className="text-primary">
                        Complete now
                    </Link>
                </span>
            </div>

            <div className="card shadow-sm p-4">
                <h5 className="mb-4 text-center">Contact Details</h5>
                <form onSubmit={handleFormSubmit}>
                    <div className="row mb-3 align-items-center">
                        <div className="col-md-6 d-flex align-items-center mb-3 mb-md-0">
                            <i className="bi bi-github me-2 fs-5"></i>
                            <label htmlFor="fullName" className="form-label me-2 mb-0">
                                Full Name:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="fullName"
                                placeholder="Enter your full name"
                                ref={fullNameRef}
                            />
                        </div>

                        <div className="col-md-6 d-flex align-items-center">
                            <i className="bi bi-globe me-2 fs-5"></i>
                            <label htmlFor="photoUrl" className="form-label me-2 mb-0">
                                Profile Photo URL
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="photoUrl"
                                placeholder="Enter photo URL"
                                ref={profilePhotoRef}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-danger">
                            Update
                        </button>
                        <button type="button" className="btn btn-outline-danger">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;
