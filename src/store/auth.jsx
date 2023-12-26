import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const [token, setToken] = useState(localStorage.getItem("token"));

    const storeTokenInLS = (serverToken)=>{
        return localStorage.setItem("token", serverToken);  //save token in the browser's local storage
    }

    // Check logged in or not
    let isLoggedIn = !!token;
    console.log(isLoggedIn);

    // Logout Functionality
    const LogoutUser = () =>{
        setToken("");
        return localStorage.removeItem('token');   //removing the token from the local storage
    }

    return <AuthContext.Provider value={{ isLoggedIn,storeTokenInLS, LogoutUser }}>
        {children}
    </AuthContext.Provider>
}

// custom hook for auth consumer
export const useAuth = ()=>{
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return authContextValue;
}
