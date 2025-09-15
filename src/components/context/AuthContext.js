import React, { createContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isLogin, setIsLogin] = useState(null);
    const history = useHistory();
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    })

    const setLoginHandler = (data) => {
        localStorage.setItem('token', data.idToken);
        localStorage.setItem('isLogin', true);
        localStorage.setItem('email', data.email)
        setToken(data.idToken);
        setIsLogin(true);
    }

    const logoutHandler = (data) => {
        localStorage.removeItem('email');
        localStorage.removeItem('isLogin');
        localStorage.removeItem('token');
        setToken(null);
        history.push('/login');
    }

    return (
        <AuthContext.Provider value={{ token, isLogin, setLoginHandler, logoutHandler }}>
            {children}
        </AuthContext.Provider>
    )

}

export { AuthContext, AuthProvider };