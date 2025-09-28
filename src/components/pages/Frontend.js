import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { add, edit, listing, deleteExpanse } from "../redux/expenses";
import { toggleTheme } from "../redux/theme";
function Frontend() {
    const dispatch = useDispatch();
    const expensesList = useSelector((state) => state.expenses.expenses) || [];
    const { mode } = useSelector((state) => state.theme)
    console.log('frontend theme', mode);
    const titleRef = useRef();
    const amountRef = useRef();
    const categoryRef = useRef();
    const [isLoading, setIsLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [showPremium, setShowPremium] = useState(false);
    const [showPremiumFeature, setshowPremiumFeature] = useState(false);


    function editHandler(item) {
        titleRef.current.value = item.title;
        amountRef.current.value = item.amount;
        categoryRef.current.value = item.category;
        console.log('editHandler', item.id);
        setEditId(item.id);
    }


    async function ExpansesSubmitHandler(event) {
        event.preventDefault();
        const title = titleRef.current.value;
        const amount = amountRef.current.value;
        const category = categoryRef.current.value;
        console.log('editId', editId);
        if (editId) {
            const res = await axios.put(
                `https://e-commerce-project-2-4807f-default-rtdb.firebaseio.com/expanses/${editId}.json`,
                { title, amount, category }
            );
            if (res.status === 200) {
                console.log('nbdhdbchb', { id: editId, title, amount, category })

                dispatch(edit({ id: editId, title, amount, category }));
                // setExpenses((prev) =>
                //     prev.map((item) =>
                //         item.id === editId ? { id: editId, title, amount, category } : item
                //     )
                // );
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
                dispatch(add({ id, title, amount, category }));
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
            dispatch(deleteExpanse(id));
            alert("Expense deleted successfully");
        }
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
            // setExpenses(loadedExpenses);
            dispatch(listing(loadedExpenses) || []);
            const totalAmount = loadedExpenses.reduce((sum, item) => {
                return sum + Number(item.amount);
            }, 0);

            if (totalAmount > 10000) {
                setShowPremium(true);
            }
            setIsLoading(false);
        }
        fetchExpanses();
    }, [dispatch]);

    async function handlePremium() {
        setshowPremiumFeature(true);
    }

    async function handleToggleTheme() {
        dispatch(toggleTheme());
    }

    const downloadCSV = () => {
        const headers = "No,ID,Name,Amount,Category";
        const rows = expensesList.map((item, index) => (
            `${index+1},${item.id},${item.title},${item.amount},${item.category}`
        ));
        const csv = [headers, ...rows].join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "userdata.csv";
        a.click();

        window.URL.revokeObjectURL(url);
    };


    return (
        <div className={`container py-5 ${mode === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    {showPremium &&
                        <div className="card shadow p-4 text-center">
                            <button className="btn btn-success btn-lg w-100" onClick={handlePremium}>
                                Activate Premium
                            </button>
                            {showPremiumFeature &&
                                <div className="p-4 text-center">
                                    <button className="btn btn-info btn-lg w-100" onClick={handleToggleTheme}>
                                        Toggle Theme
                                    </button>
                                </div>
                            }
                        </div>
                    }
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
                                    expensesList.map((item, index) => (
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
                        {showPremiumFeature &&
                            <div className="p-4 text-center">
                                <button className="btn btn-info btn-lg w-100" onClick={downloadCSV}>
                                    Download
                                </button>
                            </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Frontend;
