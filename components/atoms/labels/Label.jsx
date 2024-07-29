import React from 'react'

export default function Label({ children, htmlFor }) {
    return (
        <label className='text-slate-400 font-semibold mb-2 sm:text-xs md:text-base' htmlFor={htmlFor}>
            {children}
        </label>
    )
}
