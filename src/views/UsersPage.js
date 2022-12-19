import { UsersContext } from "../contexts/UsersContext.js";
import { useContext, useEffect } from "react";
import UsersTable from "../components/UsersTable/UsersTable.js";
import { Container } from "react-bootstrap";
import Loader from "../components/Loader/Loader.js";

function UserssPage() {
    const { getUsers, users } = useContext(UsersContext);

    useEffect(() => {
        getUsers();
    }, []);
    return (
        <Container>
            <h2 style={{ textAlign: "center", margin: "10px" }}>Users</h2>
            {users.length > 0 ? <UsersTable users={users} /> : <Loader />}
        </Container>
    );
}

export default UserssPage;
