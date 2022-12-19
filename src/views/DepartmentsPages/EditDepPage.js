import { useContext, useEffect, useState } from "react";
import {
    ButtonGroup,
    Container,
    Dropdown,
    DropdownButton,
    Row,
    Table,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link, useParams } from "react-router-dom";
import { DepartmentsContext } from "../../contexts/DepartmentsContext.js";
import { EmployeesContext } from "../../contexts/EmployeesContext.js";
import { useNavigate } from "react-router-dom";
import { ShiftsContext } from "../../contexts/ShiftsContext.js";

function GridComplexExample() {
    const { getDepartments, departments, deleteDepartment, editDepartment } =
        useContext(DepartmentsContext);
    const { getShifts, shifts, addEmployeeToShift } = useContext(ShiftsContext);
    const { employees, getEmployees, addEmployeeToDepartment } =
        useContext(EmployeesContext);
    const { id } = useParams();
    const department = departments.find((dep) => dep._id === id);
    const [editedDepartment, setEditedDepartment] = useState({});
    const navigate = useNavigate();
    const [employeesDropDown, setEmployeesDropDown] = useState(false);
    const [employeesToAdd, setEmployeesToAdd] = useState([]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setEditedDepartment((prevEmployee) => {
            return {
                ...prevEmployee,
                [id]: value,
            };
        });
    };

    const handleDelete = () => {
        deleteDepartment(id);
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        editDepartment(id, editedDepartment);
        navigate(-1);
    };

    const handleChosenEmployees = (e) => {
        const { value } = e.target;
        if (employeesToAdd.includes(value)) {
            setEmployeesToAdd((prev) =>
                prev.filter((employeeId) => employeeId !== value)
            );
        } else {
            setEmployeesToAdd((prev) => [...prev, value]);
        }
    };

    const handleSubmitEmployees = (e) => {
        e.preventDefault();
        setEmployeesDropDown((prev) => !prev);
        employeesToAdd.map((employeeId) =>
            addEmployeeToDepartment(employeeId, id)
        );
    };

    useEffect(() => {
        if (employees.length < 1) {
            getEmployees();
        }
    }, []);

    console.log(department);
    return (
        <Container fluid="md">
            <h3 style={{ textAlign: "center", marginTop: "10px" }}>
                Edite Department
            </h3>
            <Form
                onSubmit={handleSubmit}
                style={{ width: "65%", margin: "auto" }}
            >
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Department Name</Form.Label>
                    <Form.Control
                        required
                        onChange={handleChange}
                        defaultValue={department.name}
                    />
                </Form.Group>

                <Row>
                    <Form.Group as={Col} controlId="manager">
                        <Form.Label>Manager</Form.Label>
                        <Form.Select required onChange={handleChange}>
                            <option value={department.manager._id}>
                                {`${department.manager.firstName} ${department.manager.lastName}`}
                            </option>
                            {employees
                                .filter(
                                    (emp) => emp._id !== department.manager._id
                                )
                                .map((emp) => (
                                    <option key={emp._id} value={emp._id}>
                                        {`${emp.firstName} ${emp.lastName}`}
                                    </option>
                                ))}
                        </Form.Select>
                    </Form.Group>
                </Row>
                <div
                    style={{
                        textAlign: "center",
                        margin: "10px",
                    }}
                >
                    <Button
                        variant="outline-primary"
                        onClick={() => setEmployeesDropDown((prev) => !prev)}
                    >
                        Assign Employees
                    </Button>
                    <Form
                        style={{
                            display: !employeesDropDown ? "none" : null,
                        }}
                    >
                        <ul style={{ listStyle: "none" }}>
                            {employees
                                .filter(
                                    (employee) =>
                                        employee.departmentId !==
                                            department._id &&
                                        employee._id !== department.manager._id
                                )
                                .map((emp) => (
                                    <li>
                                        {" "}
                                        <Form.Check
                                            onClick={(e) =>
                                                handleChosenEmployees(e)
                                            }
                                            inline
                                            name="group1"
                                            type="checkbox"
                                            id={emp._id}
                                            value={emp._id}
                                        />
                                        {`${emp.firstName} ${emp.lastName}`}
                                    </li>
                                ))}{" "}
                        </ul>
                        <Button
                            variant="outline-primary"
                            onClick={(e) => handleSubmitEmployees(e)}
                        >
                            Save Employees
                        </Button>
                    </Form>
                </div>

                <div
                    style={{ justifyContent: "space-between", display: "flex" }}
                >
                    <div>
                        <Button
                            className="ms-auto"
                            variant="primary"
                            type="submit"
                            style={{ marginTop: "10px" }}
                        >
                            Save
                        </Button>

                        <Button
                            onClick={() => navigate(-1)}
                            variant="danger"
                            style={{
                                marginTop: "10px",
                                marginLeft: "10px",
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                    <div>
                        <Button
                            as={Col}
                            variant="dark"
                            style={{
                                marginTop: "10px",
                                marginLeft: "10px",
                            }}
                            onClick={handleDelete}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="17"
                                height="17"
                                fill="currentColor"
                                class="bi bi-trash3-fill"
                                viewBox="0 0 16 16"
                            >
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </Form>
        </Container>
    );
}

export default GridComplexExample;
