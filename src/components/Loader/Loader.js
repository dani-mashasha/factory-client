import { Container, Spinner } from "react-bootstrap";

function AnimationExample() {
    return (
        <Spinner
            style={{ marginLeft: "50%", marginRight: "50%", marginTop: "50px" }}
            animation="border"
            size="lg"
            variant="primary"
        />
    );
}

export default AnimationExample;
