import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const EmployeesContext = createContext();

export const EmployeesProvider = (props) => {
    const [employees, setEmployees] = useState([]);
    const uri = "http://localhost:5000/employees/";

    const getEmployees = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const headers = {
                    "x-access-token": token,
                };
                const resp = await axios.get(uri, { headers: headers });
                setEmployees(resp.data);
            } catch (error) {
                console.log("Error:" + error);
            }
        } else {
            setEmployees([]);
        }
    };
    const addEmployee = async (employee) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const headers = {
                    "x-access-token": token,
                };

                const resp = await axios.post(uri, employee, {
                    headers: headers,
                });
                getEmployees();
                console.log(resp);
            } catch (error) {
                console.log("Error:" + error);
            }
        }
    };

    const editEmployee = async (id, obj) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const headers = {
                    "x-access-token": token,
                };

                const resp = await axios.put(`${uri}${id}`, obj, {
                    headers: headers,
                });
                getEmployees();
                console.log(resp);
            } catch (error) {
                console.log("Error: " + error);
            }
        }
    };

    const deleteEmployee = async (id) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const headers = {
                    "x-access-token": token,
                };

                const resp = await axios.delete(`${uri}${id}`, {
                    headers: headers,
                });
                getEmployees();
                console.log(resp);
            } catch (error) {
                console.log("Error:" + error);
            }
        }
    };

    const addEmployeeToDepartment = async (id, depId) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const headers = {
                    "x-access-token": token,
                };
                const resp = await axios.put(`${uri}${id}/${depId}`, {
                    headers: headers,
                });
                getEmployees();
                console.log(resp);
            } catch (err) {
                console.log(err);
            }
        }
    };

    // useEffect(() => {
    //     getEmployees();
    //     console.log("getemp");
    // }, []);

    const contextValus = {
        employees,
        getEmployees,
        setEmployees,
        addEmployee,
        editEmployee,
        deleteEmployee,
        addEmployeeToDepartment,
    };

    return (
        <EmployeesContext.Provider value={contextValus}>
            {props.children}
        </EmployeesContext.Provider>
    );
};
