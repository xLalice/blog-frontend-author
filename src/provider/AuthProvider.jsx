import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userAuth, setUserAuth] = useState(false);
    const [loginErr, setLoginErr] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUserAuth(true);
        }
    }, [userAuth])

    const login = async (formData) => {
        const { username, password } = formData;
        const url = "https://blog-backend-api-production-2c23.up.railway.app/api/users/login";

        try {
            const response = await axios.post(url, { username, password });
            const token = response.data.token;
            const user = response.data.user;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            setUserAuth(true);
        } catch (error) {
            setLoginErr(true);
        }
    };
    

    return (
        <AuthContext.Provider value={{ userAuth, login, loginErr }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuthContext = () => {
    return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuthContext };
