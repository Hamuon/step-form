
'use client'
import { useState } from "react";
export default function useLoading() {
    const [loading, setLoading] = useState(0);
    return {
        loading,
        setLoading
    };
}
