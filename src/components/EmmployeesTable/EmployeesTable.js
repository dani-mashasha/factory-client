import "./style.css";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function DarkTable({ employees }) {
    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Department</th>
                    <th>Shifts</th>
                </tr>
            </thead>
            <tbody>
                {employees.map((emp) => (
                    <tr key={emp._id}>
                        <td>
                            <Link
                                to={`/edit_employee/${emp._id}`}
                                className="name_link"
                            >
                                {emp.firstName + " " + emp.lastName}
                            </Link>
                        </td>
                        <td>{emp.department.name}</td>
                        <td>
                            {" "}
                            <ul
                                style={{
                                    overflowY: "scroll",
                                    height: "50px",
                                    listStyle: "none",
                                    padding: "0",
                                    margin: "0",
                                }}
                            >
                                {emp.shifts.map((shift) => (
                                    <li
                                        key={shift._id}
                                        style={{
                                            borderBottom: "1px solid #fff",
                                        }}
                                    >
                                        {shift.date +
                                            " - " +
                                            shift.startingHour +
                                            " " +
                                            shift.endingHour}
                                    </li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default DarkTable;
