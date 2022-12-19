import { DepartmentsContext } from "../../contexts/DepartmentsContext.js";
import { useContext, useEffect, useState } from "react";
import DepartmentTable from "../../components/DepartmentsTable/DepartmentTable.js";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader.js";

function DepartmentsPage() {
    const { getDepartments, departments } = useContext(DepartmentsContext);

    useEffect(() => {
        getDepartments();
    }, []);
    return (
        <Container>
            <h2 style={{ textAlign: "center", margin: "10px" }}>Departments</h2>
            {departments.length > 0 ? (
                <div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "end",
                        }}
                    >
                        <Link to="/add_department">
                            <Button
                                style={{
                                    borderBottomLeftRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                }}
                                variant="primary"
                            >
                                Add New Department
                            </Button>
                        </Link>
                    </div>
                    <DepartmentTable departments={departments} />
                </div>
            ) : (
                <Loader />
            )}
        </Container>
    );
}

export default DepartmentsPage;
