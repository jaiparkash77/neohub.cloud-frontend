import { createContext, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const storeTokenInLS = (serverToken)=>{
        return localStorage.setItem("token", serverToken);  //save token in the browser's local storage
    }

    return <AuthContext.Provider value={{ storeTokenInLS }}>
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
