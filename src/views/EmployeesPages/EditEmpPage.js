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
import Loader from "../../components/Loader/Loader.js";

function GridComplexExample() {
    const { getDepartments, departments } = useContext(DepartmentsContext);
    const { getShifts, shifts, addEmployeeToShift } = useContext(ShiftsContext);
    const { employees, editEmployee, deleteEmployee, getEmployees } =
        useContext(EmployeesContext);
    const { id } = useParams();
    const employee = employees.find((emp) => emp._id === id);
    const [editedEmployee, setEditedEmployee] = useState({});
    const navigate = useNavigate();
    const [shiftsDropDown, setShiftsDropDown] = useState(false);
    const [shiftsToAdd, setShiftsToAdd] = useState([]);

    const getYearList = () => {
        const yearList = [];
        let currYear = new Date().getFullYear();
        let startYear = 1995;
        for (currYear; currYear >= startYear; currYear--) {
            yearList.push(currYear);
        }
        return yearList;
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setEditedEmployee((prevEmployee) => {
            return {
                ...prevEmployee,
                [id]: id === "startWorkYear" ? parseInt(value) : value,
            };
        });
    };

    const handleDelete = () => {
        deleteEmployee(id);
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        editEmployee(id, editedEmployee);
        navigate(-1);
    };

    const handleChosenShifts = (e) => {
        const { value } = e.target;
        if (shiftsToAdd.includes(value)) {
            setShiftsToAdd((prev) =>
                prev.filter((shiftId) => shiftId !== value)
            );
        } else {
            setShiftsToAdd((prev) => [...prev, value]);
        }
    };
    const handleSubmitShifts = (e) => {
        e.preventDefault();
        setShiftsDropDown((prev) => !prev);
        shiftsToAdd.map((shiftId) => addEmployeeToShift(shiftId, id));
    };

    useEffect(() => {
        getDepartments();
        getShifts();
        getEmployees();
    }, []);

    return (
        <Container fluid="md">
            <h3 style={{ textAlign: "center", marginTop: "10px" }}>
                Edite Employee
            </h3>
            {employee ? (
                <Form
                    onSubmit={handleSubmit}
                    style={{ width: "65%", margin: "auto" }}
                >
                    <Form.Group className="mb-3" controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            required
                            onChange={handleChange}
                            defaultValue={employee.firstName}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            required
                            onChange={handleChange}
                            defaultValue={employee.lastName}
                        />
                    </Form.Group>
                    <Row>
                        <Form.Group as={Col} controlId="departmentId">
                            <Form.Label>Department</Form.Label>
                            <Form.Select required onChange={handleChange}>
                                <option value={employee.departmentId}>
                                    {employee.department.name}
                                </option>
                                {departments
                                    .filter(
                                        (department) =>
                                            department._id !==
                                            employee.departmentId
                                    )
                                    .map((department) => (
                                        <option
                                            key={department._id}
                                            value={department._id}
                                        >
                                            {department.name}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} controlId="startWorkYear">
                            <Form.Label>Start Working in</Form.Label>
                            <Form.Select required onChange={handleChange}>
                                <option value={employee.startWorkYear}>
                                    {employee.startWorkYear}
                                </option>
                                {getYearList().map((year) => (
                                    <option value={year}>{year}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <div>
                        <div>
                            <div
                                style={{
                                    textAlign: "center",
                                    margin: "10px",
                                }}
                            >
                                <Button
                                    variant="outline-primary"
                                    onClick={() =>
                                        setShiftsDropDown((prev) => !prev)
                                    }
                                >
                                    Assign Shifts
                                </Button>
                                <Form
                                    style={{
                                        display: !shiftsDropDown
                                            ? "none"
                                            : null,
                                    }}
                                >
                                    <ul style={{ listStyle: "none" }}>
                                        {shifts
                                            .filter(
                                                (shift1) =>
                                                    !employee.shifts.some(
                                                        (shift2) =>
                                                            shift1._id ===
                                                            shift2._id
                                                    )
                                            )
                                            .map((shift) => (
                                                <li>
                                                    {" "}
                                                    <Form.Check
                                                        onClick={(e) =>
                                                            handleChosenShifts(
                                                                e
                                                            )
                                                        }
                                                        inline
                                                        name="group1"
                                                        type="checkbox"
                                                        id={shift["_id"]}
                                                        value={shift["_id"]}
                                                    />
                                                    {shift.date +
                                                        " " +
                                                        shift.startingHour +
                                                        " " +
                                                        shift.endingHour}
                                                </li>
                                            ))}{" "}
                                    </ul>
                                    <Button
                                        variant="outline-primary"
                                        onClick={(e) => handleSubmitShifts(e)}
                                    >
                                        Save Shifts
                                    </Button>
                                </Form>
                            </div>
                        </div>

                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employee.shifts
                                    ? employee.shifts
                                          .filter((shift) => shift["employees"])
                                          .map((shift) => (
                                              <tr key={shift._id}>
                                                  <td>{shift.date}</td>
                                                  <td>
                                                      {shift.startingHour +
                                                          " - " +
                                                          shift.endingHour}
                                                  </td>
                                              </tr>
                                          ))
                                    : null}
                            </tbody>
                        </Table>
                    </div>
                    <div
                        style={{
                            justifyContent: "space-between",
                            display: "flex",
                        }}
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
            ) : (
                <Loader />
            )}
        </Container>
    );
}

export default GridComplexExample;
