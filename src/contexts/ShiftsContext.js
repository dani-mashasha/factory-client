import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ShiftsContext = createContext();

export const ShiftsProvider = (props) => {
    const [shifts, setShifts] = useState([]);
    const uri = "http://localhost:5000/shifts/";

    const getShifts = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const headers = {
                    "x-access-token": token,
                };
                const resp = await axios.get(uri, { headers: headers });
                setShifts(resp.data);
            } catch (error) {
                console.log(error);
            }
        } else {
            setShifts([]);
        }
    };

    const addShift = async (shift) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const headers = {
                    "x-access-token": token,
                };
                const resp = await axios.post(uri, shift, { headers: headers });
                getShifts();
                console.log(resp);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const editShift = async (id, obj) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const headers = {
                    "x-access-token": token,
                };
                const resp = await axios.put(`${uri}${id}`, obj, {
                    headers: headers,
                });
                getShifts();
                console.log(resp);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const addEmployeeToShift = async (id, employeeId) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const headers = {
                    "x-access-token": token,
                };
                const resp = await axios.put(`${uri}${id}/${employeeId}`, {
                    headers: headers,
                });
                getShifts();
                console.log(resp);
            } catch (err) {
                console.log(err);
            }
        }
    };

    // useEffect(() => {
    //     getShifts();
    // }, []);

    const contextValus = {
        shifts,
        getShifts,
        setShifts,
        addShift,
        editShift,
        addEmployeeToShift,
    };

    return (
        <ShiftsContext.Provider value={contextValus}>
            {props.children}
        </ShiftsContext.Provider>
    );
};
