import { EmployeesContext } from "../../contexts/EmployeesContext.js";
import { useContext, useEffect } from "react";
import EmployeesTable from "../../components/EmmployeesTable/EmployeesTable.js";
import { Alert, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader.js";

function EmployeesPage() {
    const { getEmployees, employees } = useContext(EmployeesContext);

    useEffect(() => {
        getEmployees();
    }, []);
    return (
        <Container>
            <h2 style={{ textAlign: "center", margin: "10px" }}>Employees</h2>
            {employees.length > 0 ? (
                <div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "end",
                        }}
                    >
                        <Link to="/add_employee">
                            <Button
                                style={{
                                    borderBottomLeftRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                }}
                                variant="primary"
                            >
                                Add New Employee
                            </Button>
                        </Link>
                    </div>
                    <EmployeesTable employees={employees} />
                </div>
            ) : (
                <Loader />
            )}
        </Container>
    );
}

export default EmployeesPage;
