import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [services, setServices] = useState("");
    const authorizationToken = `Bearer ${token}`;

    const storeTokenInLS = (serverToken)=>{
        setToken(serverToken);
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

    // JWT Authentication - Get the currently loggedIn user data
    const userAuthentication = async()=>{
        try {
            const response = await fetch("http://localhost:5000/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            });

            if(response.ok){
                const data = await response.json();
                console.log("User Data", data.userData)
                setUser(data.userData);
            }
        } catch (error) {
            console.error("Error fetching user data");
        }
    }

    // To fetch the services from the database
    const getServices = async()=>{
        try {
            const response = await fetch("http://localhost:5000/api/data/service", {
                method: "GET"
            });

            const data = await response.json();
            setServices(data.message)
            console.log(data.message);
        } catch (error) {
            console.log(`Services frontend error ${error}`)
        }
    }

    useEffect(()=>{
        getServices();
        userAuthentication();
    },[])

    return <AuthContext.Provider value={{ isLoggedIn,storeTokenInLS, LogoutUser, user, services, authorizationToken }}>
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
