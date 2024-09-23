import React, { useEffect, useState } from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const EmployeeList = () => {
    
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        if (employees.length === 0) {
          const storedData = JSON.parse(localStorage.getItem('employeeData')) || [];
          setEmployees(storedData);
        }
    }, []);

    useEffect(() => {
        if (employees.length > 0) {
          localStorage.setItem('employeeData', JSON.stringify(employees));
        }
    }, [employees]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name === '' || email === '' || phone === '') {
            alert('Please fill in all fields.');
            return;
        }

        const newEmployee = { name, email, phone };

        if (editIndex !== null) {
            const updatedEmployees = employees.map((emp, index) =>
                index === editIndex ? newEmployee : emp
            );
            setEmployees(updatedEmployees);
            setEditIndex(null);
        } else {
            setEmployees([...employees, newEmployee]);
        }

        setName('');
        setEmail('');
        setPhone('');
    };

    const handleDelete = (index) => {
        const updatedEmployees = employees.filter((_, i) => i !== index);
        setEmployees(updatedEmployees);
    };

    const handleEdit = (index) => {
        const employee = employees[index];
        setName(employee.name);
        setEmail(employee.email);
        setPhone(employee.phone);
        setEditIndex(index);
    };

    return (
        <div className="container mt-5">
            <h1>Employee Management</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {editIndex !== null ? 'Update Employee' : 'Add Employee'}
                </button>
            </form>

            <h2 className="mt-5">Employee List</h2>
            {employees.length === 0 ? (
                <p>No employees added yet.</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Sr No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.phone}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => handleEdit(index)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EmployeeList