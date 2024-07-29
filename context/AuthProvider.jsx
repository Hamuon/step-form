"use client"
import { useState, useEffect, createContext } from "react"

export const AuthContext = createContext()

function AuthProvider({ children }) {
    const userToken = typeof window !== "undefined" ? window.localStorage.getItem('token') : null
    const savedUser = typeof window !== "undefined" ? window.localStorage.getItem('user') : null

    const [isLoading, setIsLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        setIsAuth(!!userToken || !!savedUser)
        setIsLoading(false)
    }, [savedUser, userToken]);

    return (
        <AuthContext.Provider
            value={{
                isAuth,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider