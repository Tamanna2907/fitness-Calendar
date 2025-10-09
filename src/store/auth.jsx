import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userId, setUserId] = useState(null);

    // Extract userId from token on initial load and token changes
    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.userId);
            } catch (error) {
                console.error("Error decoding token:", error);
                // Handle invalid token
                LogoutUser();
            }
        } else {
            setUserId(null);
        }
    }, [token]);

    const storeTokenInLS = (serverToken) => {
        console.log("Token from server: ", serverToken);
        setToken(serverToken);
        
        // Extract userId when storing new token
        if (serverToken) {
            try {
                const decodedToken = jwtDecode(serverToken);
                setUserId(decodedToken.userId);
            } catch (error) {
                console.error("Error decoding token:", error);
            }
        }
        
        return localStorage.setItem("token", serverToken);
    };

    const LogoutUser = () => {
        setToken("");
        setUserId(null);
        return localStorage.removeItem("token");
    };

    let isLoggedIn = !!token;

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, userId, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};