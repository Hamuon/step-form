"use client"
import { useState, useEffect, createContext } from "react"
import Cookies from "universal-cookie"
const cookies = new Cookies()
export const AuthContext = createContext({
    isAuth: false,
    isLoading: true
})

function AuthProvider({ children }: React.PropsWithChildren<{}>) {
    const userToken = cookies.get("token")

    const [isLoading, setIsLoading] = useState(true)
    const [isAuth, setIsAuth] = useState(false)

    useEffect(() => {
        setIsAuth(!!userToken)
        setIsLoading(false)
    }, [userToken]);

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