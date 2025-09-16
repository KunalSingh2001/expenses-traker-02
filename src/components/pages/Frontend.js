import React from 'react';

function Frontend() {
    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {/* Expense Form */}
                    <div className="card shadow p-4 mb-4">
                        <h4 className="text-center mb-3">Add Expense</h4>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="amount" className="form-label">
                                    Money Spent
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="amount"
                                    placeholder="Enter amount"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    placeholder="Enter description"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">
                                    Category
                                </label>
                                <select id="category" className="form-select" required>
                                    <option value="">Select category</option>
                                    <option value="Food">Food</option>
                                    <option value="Petrol">Petrol</option>
                                    <option value="Salary">Salary</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Shopping">Shopping</option>
                                </select>
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Add Expense
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="card shadow p-4">
                        <h4 className="text-center mb-3">Expense List</h4>
                        <table className="table table-bordered table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Amount</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>500</td>
                                    <td>Lunch</td>
                                    <td>Food</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>2000</td>
                                    <td>Fuel</td>
                                    <td>Petrol</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Frontend;