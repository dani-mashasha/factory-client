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
        <Container>
            <h2 style={{ textAlign: "center", margin: "10px" }}>Shifts</h2>
            {shifts.length > 0 ? (
                <div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "end",
                        }}
                    >
                        <Link to="/add_shift">
                            <Button
                                style={{
                                    borderBottomLeftRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                }}
                                variant="primary"
                            >
                                Add New Shift
                            </Button>
                        </Link>
                    </div>
                    <ShiftsTable shifts={shifts} />
                </div>
            ) : (
                <Loader />
            )}
        </Container>
    );
}

export default ShiftsPage;
