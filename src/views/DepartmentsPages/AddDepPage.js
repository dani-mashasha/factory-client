import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { DepartmentsContext } from "../../contexts/DepartmentsContext.js";
import { EmployeesContext } from "../../contexts/EmployeesContext.js";
import { useNavigate } from "react-router-dom";

function GridComplexExample() {
    const { addDepartment } = useContext(DepartmentsContext);
    const { employees, getEmployees } = useContext(EmployeesContext);
    const [newDepartment, setNewDepartment] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        console.log(id, value);
        setNewDepartment((prevDepartment) => {
            return {
                ...prevDepartment,
                [id]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addDepartment(newDepartment);
        navigate(-1);
    };

    useEffect(() => {
        if (employees.length < 1) {
            getEmployees();
        }
    }, []);

    return (
        <Container fluid="md">
            <h3 style={{ textAlign: "center", marginTop: "10px" }}>
                Add a New Department
            </h3>
            <Form
                onSubmit={handleSubmit}
                style={{ width: "60%", margin: "auto" }}
            >
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Department Name</Form.Label>
                    <Form.Control
                        required
                        onChange={handleChange}
                        placeholder="Enter Department Name..."
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="manager">
                    <Form.Label>Manager</Form.Label>
                    <Form.Select
                        required
                        onChange={handleChange}
                        defaultValue="Choose..."
                    >
                        <option value={""}>Choose a Manager</option>
                        {employees.map((employee) => (
                            <option key={employee._id} value={employee._id}>
                                {`${employee.firstName} ${employee.lastName}`}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    style={{ marginTop: "10px" }}
                >
                    Save
                </Button>

                <Button
                    onClick={() => navigate(-1)}
                    variant="danger"
                    style={{ marginTop: "10px", marginLeft: "10px" }}
                >
                    Cancel
                </Button>
            </Form>
        </Container>
    );
}

export default GridComplexExample;
