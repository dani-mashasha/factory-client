import "./style.css";
import Table from "react-bootstrap/Table";

function DarkTable({ shifts }) {
    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Hours</th>
                    {/* <th>Employees</th> */}
                </tr>
            </thead>
            <tbody>
                {shifts
                    ? shifts.map((shift) => (
                          <tr key={shift._id}>
                              <td>{shift.date}</td>
                              <td>
                                  {shift.startingHour +
                                      " - " +
                                      shift.endingHour}
                              </td>
                              {/* <td>
                                      {" "}
                                      <ul
                                          style={{
                                              overflowY: "scroll",
                                              height: "50px",
                                              listStyle: "none",
                                          }}
                                      >
                                          {shift.employees.map((emp) => (
                                              <li>
                                                  {emp.firstName +
                                                      " " +
                                                      emp.lastName}
                                              </li>
                                          ))}
                                      </ul>
                                  </td> */}
                          </tr>
                      ))
                    : null}
            </tbody>
        </Table>
    );
}

export default DarkTable;
