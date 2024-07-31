import React from 'react'

export default function Label(props: any) {
    return (
        <label className='text-slate-400 font-semibold mb-2 sm:text-xs md:text-base' htmlFor={props.htmlFor}>
            {props.children}
        </label>
    )
}
