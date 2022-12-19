import { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { DepartmentsContext } from "../../contexts/DepartmentsContext.js";
import { EmployeesContext } from "../../contexts/EmployeesContext.js";
import { useNavigate } from "react-router-dom";

function GridComplexExample() {
    const { departments } = useContext(DepartmentsContext);
    const { addEmployee } = useContext(EmployeesContext);
    const [newEmployee, setNewEmployee] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        console.log(id, value);
        setNewEmployee((prevEmployee) => {
            return {
                ...prevEmployee,
                [id]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addEmployee(newEmployee);
        navigate(-1);
    };
    return (
        <Container fluid="md">
            <h3 style={{ textAlign: "center", marginTop: "10px" }}>
                Add a New Employee
            </h3>
            <Form
                onSubmit={handleSubmit}
                style={{ width: "60%", margin: "auto" }}
            >
                <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        required
                        onChange={handleChange}
                        placeholder="Enter first name..."
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        required
                        onChange={handleChange}
                        placeholder="Enter last name..."
                    />
                </Form.Group>

                <Form.Group as={Col} controlId="departmentId">
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                        required
                        onChange={handleChange}
                        defaultValue="Choose..."
                    >
                        <option value={""}>Choose a Department</option>
                        {departments.map((department) => (
                            <option key={department._id} value={department._id}>
                                {department.name}
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
