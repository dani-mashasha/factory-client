import "./style.css";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

function DarkTable({ departments }) {
    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Manager</th>
                    <th>Employees</th>
                </tr>
            </thead>

            <tbody>
                {departments.map((dep) => (
                    <tr key={dep._id}>
                        <td>
                            <Link
                                to={`/edit_department/${dep._id}`}
                                className="name_link"
                            >
                                {dep.name}
                            </Link>
                        </td>
                        <td>
                            {dep.manager.firstName + " " + dep.manager.lastName}
                        </td>
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
                                {dep.employees.map((emp) => (
                                    <li
                                        style={{
                                            borderBottom: "1px solid #fff",
                                        }}
                                        key={emp._id}
                                    >
                                        <Link to={`/edit_employee/${emp._id}`}>
                                            {emp.firstName + " " + emp.lastName}
                                        </Link>
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
