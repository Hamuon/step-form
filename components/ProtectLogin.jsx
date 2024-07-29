"use client"
import { AuthContext } from "@/context/AuthProvider"
import { usePathname, useRouter } from "next/navigation"
import { useContext, useEffect } from "react"

function ProtectLogin({ children }) {

    const { isAuth } = useContext(AuthContext)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (isAuth && pathname === "/login") {
            router.replace("/request")
        }
    }, [isAuth, router, pathname])

    if (!isAuth && pathname === "/login") {
        return children;
    } else {
        return <div className="flex justify-center items-center text-3xl w-full h-full z-50 bg-gray-100">
            در حال انتقال...
        </div>
    }

}

export default ProtectLogin;