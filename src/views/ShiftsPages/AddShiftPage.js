import { ShiftsContext } from "../../contexts/ShiftsContext.js";
import { useContext, useEffect } from "react";
import ShiftsTable from "../../components/ShiftsTable/ShiftsTable.js";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader.js";

function ShiftsPage() {
    const { getShifts, shifts } = useContext(ShiftsContext);

    useEffect(() => {
        getShifts();
    }, []);

    return (
        <Container fluid="md">
            <h3 style={{ textAlign: "center", marginTop: "10px" }}>
                Add a New Shift
            </h3>
            {/* <Form
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
        </Form> */}
        </Container>
    );
}

export default ShiftsPage;
