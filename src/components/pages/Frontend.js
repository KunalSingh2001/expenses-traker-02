import React, { useRef, useState, useEffect } from "react";
import axios from "axios";

function Frontend() {
    const titleRef = useRef();
    const amountRef = useRef();
    const categoryRef = useRef();
    const [expenses, setExpenses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [editId, setEditId] = useState(null); 

    async function ExpansesSubmitHandler(event) {
        event.preventDefault();
        const title = titleRef.current.value;
        const amount = amountRef.current.value;
        const category = categoryRef.current.value;

        if (editId) {
            const res = await axios.put(
                `https://e-commerce-project-2-4807f-default-rtdb.firebaseio.com/expanses/${editId}.json`,
                { title, amount, category }
            );
            if (res.status === 200) {
                setExpenses((prev) =>
                    prev.map((item) =>
                        item.id === editId ? { id: editId, title, amount, category } : item
                    )
                );
                setEditId(null);
                alert("Expense updated successfully");
            }
        } else {
            const res = await axios.post(
                "https://e-commerce-project-2-4807f-default-rtdb.firebaseio.com/expanses.json",
                { title, amount, category }
            );
            if (res.status === 200) {
                const id = res.data.name; 
                setExpenses((prev) => [...prev, { id, title, amount, category }]);
                alert("Expense added successfully");
            }
        }

        titleRef.current.value = "";
        amountRef.current.value = "";
        categoryRef.current.value = "";
    }

    async function deleteHandler(id) {
        const res = await axios.delete(
            `https://e-commerce-project-2-4807f-default-rtdb.firebaseio.com/expanses/${id}.json`
        );
        if (res.status === 200) {
            setExpenses((prev) => prev.filter((item) => item.id !== id));
            alert("Expense deleted successfully");
        }
    }

    function editHandler(item) {
        titleRef.current.value = item.title;
        amountRef.current.value = item.amount;
        categoryRef.current.value = item.category;
        setEditId(item.id);
    }

    useEffect(() => {
        setIsLoading(true);
        async function fetchExpanses() {
            const res = await axios.get(
                "https://e-commerce-project-2-4807f-default-rtdb.firebaseio.com/expanses.json"
            );
            const data = res.data || {};
            const loadedExpenses = Object.keys(data).map((key) => ({
                id: key,
                ...data[key],
            }));
            setExpenses(loadedExpenses);
            setIsLoading(false);
        }
        fetchExpanses();
    }, []);

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow p-4 mb-4">
                        <h4 className="text-center mb-3">
                            {editId ? "Edit Expense" : "Add Expense"}
                        </h4>
                        <form onSubmit={ExpansesSubmitHandler}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    placeholder="Enter description"
                                    ref={titleRef}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="amount" className="form-label">
                                    Money Spent
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="amount"
                                    placeholder="Enter amount"
                                    ref={amountRef}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">
                                    Category
                                </label>
                                <select
                                    id="category"
                                    className="form-select"
                                    ref={categoryRef}
                                    required
                                >
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
                                    {editId ? "Update Expense" : "Add Expense"}
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
                                    <th>Title</th>
                                    <th>Amount</th>
                                    <th>Category</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            Loading...
                                        </td>
                                    </tr>
                                ) : (
                                    expenses.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.title}</td>
                                            <td>{item.amount}</td>
                                            <td>{item.category}</td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-warning me-2"
                                                    onClick={() => editHandler(item)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => deleteHandler(item.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Frontend;
