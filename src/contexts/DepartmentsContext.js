import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const DepartmentsContext = createContext();

export const DepartmentsProvider = (props) => {
    const [departments, setdepartments] = useState([]);
    const uri = "http://localhost:5000/departments/";

    const getDepartments = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const headers = {
                    "x-access-token": token,
                };
                const resp = await axios.get(uri, { headers: headers });
                setdepartments(resp.data);
            } catch (error) {
                console.log(error);
            }
        } else {
            setdepartments([]);
        }
    };

    const addDepartment = async (department) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const headers = {
                    "x-access-token": token,
                };

                const resp = await axios.post(uri, department, {
                    headers: headers,
                });
                getDepartments();
                console.log(resp);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const editDepartment = async (id, obj) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const headers = {
                    "x-access-token": token,
                };

                const resp = await axios.put(`${uri}${id}`, obj, {
                    headers: headers,
                });
                getDepartments();
                console.log(resp);
            } catch (err) {
                console.log(err);
            }
        }
    };

    const deleteDepartment = async (id) => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const headers = {
                    "x-access-token": token,
                };

                const resp = await axios.delete(`${uri}${id}`, {
                    headers: headers,
                });
                getDepartments();
                console.log(resp);
            } catch (err) {
                console.log(err);
            }
        }
    };

    // useEffect(() => {
    //     getDepartments();
    //     console.log("getdep");
    // }, []);

    const contextValus = {
        getDepartments,
        departments,
        setdepartments,
        addDepartment,
        editDepartment,
        deleteDepartment,
    };

    return (
        <DepartmentsContext.Provider value={contextValus}>
            {props.children}
        </DepartmentsContext.Provider>
    );
};
