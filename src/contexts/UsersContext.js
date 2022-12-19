import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UsersContext = createContext();

export const UsersProvider = (props) => {
    const [users, setUsers] = useState([]);
    const uri = "http://localhost:5000/users/";

    async function getUsers() {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const headers = {
                    "x-access-token": token,
                };
                const resp = await axios.get(uri, { headers: headers });
                setUsers(resp.data);
            } catch (error) {
                console.log(error);
            }
        } else {
            setUsers([]);
        }
    }

    // useEffect(() => {
    //     getUsers();
    // }, []);

    const contextValus = {
        getUsers,
        users,
        setUsers,
    };

    return (
        <UsersContext.Provider value={contextValus}>
            {props.children}
        </UsersContext.Provider>
    );
};
