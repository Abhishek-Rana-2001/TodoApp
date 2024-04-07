import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { User, authContextType } from "../types/Types";


const AuthContext = createContext<authContextType | null>(null)

type AuthProviderProps = PropsWithChildren 


export default function AuthProvider({
    children,
} : AuthProviderProps) {
    
    const [user, setUser] = useState<User | null>(null);

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(()=>{
       const user = localStorage.getItem("user")
       console.log(user)
       if(user !== null && user !== undefined){
        setUser(JSON.parse(user))
        setIsLoggedIn(true)
       }
    },[])

    const contextValue = { 
        user, // Ensure user has required properties
        setUser,
        isLoggedIn,
        setIsLoggedIn
    };

   return <AuthContext.Provider value={contextValue} >{children}</AuthContext.Provider> 
}

export const useAuth = ()=>{
    const context = useContext(AuthContext)

    if(context === null){
        throw new Error("useAuth must be used within the AuthProvider")
    }

   return context
}