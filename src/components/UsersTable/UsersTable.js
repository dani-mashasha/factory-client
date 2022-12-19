import "./style.css";
import Table from "react-bootstrap/Table";

function DarkTable({ users }) {
    return (
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Maximum Actions Allowed</th>
                    {/* <th>Current Actions Allowed</th> */}
                </tr>
            </thead>
            <tbody>
                {users
                    ? users.map((user) => (
                          <tr key={user._id}>
                              <td>{user.fullName}</td>
                              <td>{user.numOfActions}</td>
                              {/* <td>{user.currentActionsAllowed}</td> */}
                          </tr>
                      ))
                    : null}
            </tbody>
        </Table>
    );
}

export default DarkTable;
