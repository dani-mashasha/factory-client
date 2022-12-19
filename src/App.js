import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DepartmentsPage from "./views/DepartmentsPages/DepartmentsPage.js";
import EmployeesPage from "./views/EmployeesPages/EmployeesPage.js";
import LoginPage from "./views/LoginPage.js";
import UsersPage from "./views/UsersPage.js";
import ShiftsPage from "./views/ShiftsPages/ShiftsPage.js";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar.js";
import AddEmpPage from "./views/EmployeesPages/AddEmpPage.js";
import EditEmpPage from "./views/EmployeesPages/EditEmpPage.js";
import AddDepPage from "./views/DepartmentsPages/AddDepPage.js";
import EditDepPage from "./views/DepartmentsPages/EditDepPage.js";
import HomePage from "./views/HomePage.js";
import AddShiftPage from "./views/ShiftsPages/AddShiftPage.js";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route
                    path="/departments"
                    element={<DepartmentsPage />}
                ></Route>
                <Route path="/employees" element={<EmployeesPage />}></Route>
                <Route path="/add_employee" element={<AddEmpPage />}></Route>
                <Route
                    path="/edit_employee/:id"
                    element={<EditEmpPage />}
                ></Route>
                <Route path="/add_department" element={<AddDepPage />}></Route>
                <Route
                    path="/edit_department/:id"
                    element={<EditDepPage />}
                ></Route>
                <Route path="/users" element={<UsersPage />}></Route>
                <Route path="/shifts" element={<ShiftsPage />}></Route>
                <Route path="/add_shift" element={<AddShiftPage />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/" element={<HomePage />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
