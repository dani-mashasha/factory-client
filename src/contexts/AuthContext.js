import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [isLogd, setIsLogd] = useState(null);
    const uri = "http://localhost:5000/auth/login";

    const login = async (user) => {
        try {
            const resp = await axios.post(uri, user);
            const { token } = resp.data;
            localStorage.setItem("token", token);
            console.log(token);
            setIsLogd(true);
        } catch (error) {
            setIsLogd(false);
            console.log(error.message);
        }
    };
    const logout = () => {
        localStorage.clear();
        setIsLogd(null);
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLogd(true);
        }
    }, []);

    const contextValus = {
        login,
        isLogd,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValus}>
            {props.children}
        </AuthContext.Provider>
    );
};
