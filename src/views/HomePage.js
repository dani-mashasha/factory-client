import { useContext } from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.js";

function HomePage() {
    const { isLogd, logout } = useContext(AuthContext);
    return (
        <Container fluid="md" style={{ textAlign: "center" }}>
            <h1 style={{ marginTop: "10px" }}>Welcom To The Factory</h1>
            <h3 style={{ marginTop: "60px", marginBottom: "60px" }}>
                Please log in to start making changes and managing the
                factory...
            </h3>
            {isLogd ? (
                <Button
                    variant="dark"
                    onClick={() => {
                        logout();
                    }}
                >
                    Logout
                </Button>
            ) : (
                <Link to="/login">
                    <Button variant="primary">Login</Button>{" "}
                </Link>
            )}
        </Container>
    );
}

export default HomePage;
