"use client"
import { z } from 'zod'
import { useState } from 'react'
import { toast } from 'react-toastify'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useLoading from '@/hooks/useLoading'
import { useRouter } from 'next/navigation'
import Label from '@/components/atoms/labels/Label'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkOtp, getOtp } from '@/services/authService'
import SubmitButton from '@/components/atoms/buttons/SubmitButton'
import { useOtpResend } from '@/utils/useOtpRequest'

const schema = z.object({
    code: z.string().min(5, {
        message: "Please enter the code"
    })
})
export default function OtpModal({ phone: mobile }) {
    const router = useRouter()

    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0o0);
    const { loading, setLoading } = useLoading()
    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            resolver: zodResolver(schema)
        }
    )

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 10);

        return () => {
            clearInterval(interval);
        };
    }, [seconds, minutes]);

    const resendOTP = useOtpResend(setMinutes, setSeconds, getOtp, setLoading, mobile)

    const submitHandler = async (code) => {
        setLoading(1)
        const verifyData = { ...code, ...mobile }
        await checkOtp(verifyData)
            .then((res) => {
                if (res.status === 200) {
                    toast.success('کد تایید شد', {
                        position: "top-center",
                    });
                    router.push("/")
                    setLoading(0)
                } else {
                    toast.error(res.response.data.message, {
                        position: "top-center"
                    })
                    setLoading(0)
                }
            }).catch((error) => {
                console.log(error);
                toast.error(error.response.data.message, {
                    position: "top-center"
                })
                setLoading(0)
            })
    }

    return (
        <div className='modal-container'>
            <form onSubmit={handleSubmit(submitHandler)} className='modal-form relative'>
                <div className='flex flex-col w-full items-start'>
                    <span className='text-3xl font-semibold mb-3'>Authorization</span>
                    <Label htmlFor="otp">Please Enter the code</Label>
                    <div className='flex items-center gap-2 w-full'>
                        <input {...register("code")} className={`input input-bordered w-full font-numerals my-2 ${errors.code ? "input-error" : null}`} type="number" placeholder="Code" />
                        <button disabled={seconds > 0 || minutes > 0} onClick={resendOTP} className={`font-numerals px-4 py-3 text-white rounded-lg min-w-20 flex items-center justify-center ${seconds > 0 || minutes > 0 ? 'bg-[#54515d]' : 'bg-[#5227CC]'}`}>
                            {seconds > 0 || minutes > 0 ? (
                                <p>
                                    {minutes < 10 ? `0${minutes}` : minutes}:
                                    {seconds < 10 ? `0${seconds}` : seconds}
                                </p>
                            ) : "Resend "}
                        </button>
                    </div>
                    <div className='flex gap-2 mt-2 sm:w-full'>
                        <SubmitButton loading={loading == 1} type="submit" text="Submit" />
                    </div>
                </div>
            </form>
        </div>
    )
}
