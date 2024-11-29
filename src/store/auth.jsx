import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState()

    const storeTokenInLS = (serverToken) =>{
        setToken(serverToken)
        return localStorage.setItem("token", serverToken)
    }

    let isLoggedIn = !!token;     
    
    const LogoutUser = () =>{
        setToken("");
        return localStorage.removeItem("token")
    }


    // jwt authentication to get the currently logged in user data

    const userAuthentication = async () =>{
        try {
            const response = await fetch("http://localhost:5000/userData", {
                method:"GET",
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            if(response.ok){
                const data = await response.json();
                setUser(data.userData);
            }
        } catch (error) {
            console.log("error fetcing auth data")
        }
    }

    useEffect(()=>{
        userAuthentication();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);





    return <AuthContext.Provider value={{isLoggedIn, storeTokenInLS, LogoutUser, user}}> 
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}