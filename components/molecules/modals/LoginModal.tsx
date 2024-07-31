"use client"
import React from 'react'
import { useForm } from 'react-hook-form'
import { getOtp } from '@/services/authService'
import Label from '@/components/atoms/labels/Label'
import { zodResolver } from '@hookform/resolvers/zod'
import SubmitButton from '@/components/atoms/buttons/SubmitButton'
import useLoading from '@/hooks/useLoading';
import { useOtpRequest } from '@/utils/useOtpRequest';
import { MobileSchema } from '@/utils/schemas'

type LoginModalProps = {
    nextStep: () => void,
    setPhone: (mobile: string) => void
}
export default function LoginModal({ nextStep, setPhone }: LoginModalProps) {

    const { loading, setLoading } = useLoading()
    const submitHandler: any = useOtpRequest(setPhone, setLoading, getOtp, nextStep)
    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            resolver: zodResolver(MobileSchema)
        }
    )

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
