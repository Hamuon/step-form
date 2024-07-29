"use client"
import { z } from 'zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { getOtp } from '@/services/authService'
import Label from '@/components/atoms/labels/Label'
import { zodResolver } from '@hookform/resolvers/zod'
import SubmitButton from '@/components/atoms/buttons/SubmitButton'
import useLoading from '@/hooks/useLoading';
import { useOtpRequest } from '@/utils/useOtpRequest';

const schema = z.object({
    mobile: z.string().min(1, { message: "Phone number is required." }).max(11, { message: "Phone number can't be more than 11 character." }).regex(/^09[0-9][0-9]-?[0-9]{3}-?[0-9]{4}$/, { message: "Invalid phone number." }),
})
export default function LoginModal({ nextStep, setPhone }) {

    const { loading, setLoading } = useLoading()
    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            resolver: zodResolver(schema)
        }
    )


    const submitHandler = useOtpRequest(setPhone, setLoading, getOtp, nextStep)

    return (
        <div className='modal-container'>
            <form onSubmit={handleSubmit(submitHandler)} className='modal-form relative'>
                <div className='flex flex-col items-start w-full'>
                    <div className='flex w-full justify-start mb-3 items-center'>
                        <span className='md:text-3xl sm:text-xl font-semibold '>Welcome!</span>
                    </div>
                    <Label htmlFor="phone">
                        Please Enter your Phone Number
                    </Label>
                    <input {...register("mobile")} className={`input input-bordered w-full my-2 font-numerals ${errors.mobile ? "input-error" : null}`} type="digit" placeholder="Phone Number" />
                    <div className='flex gap-2 mt-2 sm:w-full'>
                        <SubmitButton type="submit" className="w-full" loading={loading == 1} text="Get Code" />
                    </div>
                </div>
            </form >
        </div >
    )
}
