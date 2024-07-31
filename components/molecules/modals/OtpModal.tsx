"use client"
import { useForm } from 'react-hook-form'
import useLoading from '@/hooks/useLoading'
import { useCountdown, useOtpCheck, useOtpResend } from '@/utils/useOtpRequest'
import Label from '@/components/atoms/labels/Label'
import { zodResolver } from '@hookform/resolvers/zod'
import { checkOtp, getOtp } from '@/services/authService'
import SubmitButton from '@/components/atoms/buttons/SubmitButton'
import { OtpSchema } from '@/utils/schemas';

export default function OtpModal({ phone: mobile }: { phone: string }) {

    const { loading, setLoading } = useLoading()
    const submitHandler = useOtpCheck(setLoading, checkOtp, mobile)
    const { minutes, seconds, reset } = useCountdown(2, 0);
    const { register, handleSubmit, formState: { errors } } = useForm(
        {
            resolver: zodResolver(OtpSchema)
        }
    )

    const { resendOTP } = useOtpResend(getOtp, reset);
    const handleResendOTP = () => {
        resendOTP(mobile);
    };

    return (
        <div className='modal-container'>
            <form onSubmit={handleSubmit(submitHandler)} className='modal-form relative'>
                <div className='flex flex-col w-full items-start'>
                    <span className='text-3xl font-semibold mb-3'>Authorization</span>
                    <Label htmlFor="otp">Please Enter the code</Label>
                    <div className='flex items-center gap-2 w-full'>
                        <input {...register("code")} className={`input input-bordered w-full font-numerals my-2 ${errors.code ? "input-error" : null}`} type="number" placeholder="Code" />
                        <button disabled={seconds > 0 || minutes > 0} onClick={handleResendOTP} className={`font-numerals px-4 py-3 text-white rounded-lg min-w-20 flex items-center justify-center ${seconds > 0 || minutes > 0 ? 'bg-[#54515d]' : 'bg-[#5227CC]'}`}>
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
