"use client"
import React from 'react';
import { useState, useEffect } from 'react'
import StepForm from '@/components/StepForm';
import { usePathname } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AuthProvider from '@/context/AuthProvider';
export default function AuthLayout(
    { children }
        : Readonly<{
            children: React.ReactNode;
        }>
) {

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
        <AuthProvider>
            <ToastContainer />
            {
                showLogin ? <StepForm /> : null
            }
            {children}
        </AuthProvider>
    )
}
