import { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext.js";
import "./style.css";

function CollapsibleExample() {
    const [expanded, setExpanded] = useState(false);
    const { isLogd, setIsLogd, logout } = useContext(AuthContext);

    useEffect(() => {}, [setIsLogd]);

    return (
        <Navbar expanded={expanded} expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">Factory</Navbar.Brand>
                <Navbar.Toggle
                    onClick={() => setExpanded(expanded ? false : "expanded")}
                    aria-controls="responsive-navbar-nav"
                />
                {isLogd ? (
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Item as="li" className="nav_li">
                                <Link
                                    onClick={() => setExpanded(false)}
                                    className="nav_link"
                                    to="/departments"
                                >
                                    Departments
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li" className="nav_li">
                                <Link
                                    onClick={() => setExpanded(false)}
                                    className="nav_link"
                                    to="/employees"
                                >
                                    Employees
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li" className="nav_li">
                                <Link
                                    onClick={() => setExpanded(false)}
                                    className="nav_link"
                                    to="/shifts"
                                >
                                    Shifts
                                </Link>
                            </Nav.Item>
                            <Nav.Item as="li" className="nav_li">
                                <Link
                                    onClick={() => setExpanded(false)}
                                    className="nav_link"
                                    to="/users"
                                >
                                    Users
                                </Link>
                            </Nav.Item>
                        </Nav>

                        <Nav>
                            <Nav.Item className="nav_li">
                                {" "}
                                <Link
                                    className="nav_link"
                                    to="/"
                                    onClick={() => {
                                        logout();
                                        setExpanded(false);
                                    }}
                                >
                                    Logout
                                </Link>
                            </Nav.Item>
                            <Nav.Item
                                className="nav_li"
                                style={{ color: "white" }}
                            >
                                <span>Welcom, Name!</span>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                ) : null}
            </Container>
        </Navbar>
    );
}

export default CollapsibleExample;
