import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext.js";

function LoginPage() {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const { login, isLogd } = useContext(AuthContext);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUser((prevUser) => {
            return {
                ...prevUser,
                [id]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(user);
        if (localStorage.getItem("token")) {
            navigate("/departments");
        }
    };
    return (
        <Container fluid="md">
            <h3 style={{ textAlign: "center", marginTop: "10px" }}>Login</h3>
            {isLogd === false ? (
                <Alert
                    style={{ width: "60%", margin: "auto" }}
                    variant={"danger"}
                >
                    Worng Username or Email !, Pleasse Try Again
                </Alert>
            ) : null}
            <Form
                onSubmit={handleSubmit}
                style={{ width: "60%", margin: "auto" }}
            >
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="string"
                        placeholder="Enter username"
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
}

export default LoginPage;
