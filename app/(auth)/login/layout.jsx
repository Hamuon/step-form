"use client"
import StepForm from '@/components/StepForm';
import { usePathname } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import React, { useState, useEffect } from 'react'
import AuthProvider from '@/context/AuthProvider';
import ProtectLogin from '@/components/ProtectLogin';
export default function AuthLayout({ children }) {

    const pathname = usePathname();
    const [showLogin, setShowLogin] = useState(pathname === "/login" ? true : false);

    useEffect(() => {
        if (pathname === "/login") {
            setShowLogin(true)

        } else {
            setShowLogin(false)
        }
    }, [pathname])

    return (
        <ProtectLogin>
            <AuthProvider>
                <ToastContainer />
                {
                    showLogin ? <StepForm /> : null
                }
                {children}
            </AuthProvider>
        </ProtectLogin>
    )
}
