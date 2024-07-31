"use client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export const useCountdown = (initialMinutes = 0, initialSeconds = 0) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

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
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, minutes]);

  const reset = (newMinutes: number, newSeconds: number) => {
    setMinutes(newMinutes);
    setSeconds(newSeconds);
  };

  return { minutes, seconds, reset };
};

export const useOtpResend = (
  getOtp: (mobile: string) => Promise<any>,
  reset: (newMinutes: number, newSeconds: number) => void
) => {
  const resendOTP = async (mobile: string) => {
    try {
      const res = await getOtp(mobile);
      if (res.status === 200) {
        toast.success("Code was resent", {
          position: "top-right",
        });
        reset(2, 0);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while resending OTP");
    } finally {
    }
  };

  return { resendOTP };
};

export const useOtpRequest = (
  setPhone: (mobile: string) => void,
  setLoading: (loading: number) => void,
  getOtp: (mobile: string) => Promise<any>,
  nextStep: () => void
) => {
  return async (mobile: string) => {
    setPhone(mobile);
    setLoading(1);

    try {
      const res = await getOtp(mobile);

      if (res?.status === 200) {
        toast.success("code sent successfully", { position: "top-center" });
        nextStep();
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred", {
        position: "top-center",
      });
    } finally {
      setLoading(0);
    }
  };
};

export const useOtpCheck = (
  setLoading: (loading: number) => void,
  checkOtp: (verifyData: { mobile: string; code: string }) => Promise<any>,
  mobile: any
) => {
  const router = useRouter();
  return async (code: any) => {
    const verifyData = { ...code, ...mobile };
    setLoading(1);
    try {
      const res = await checkOtp(verifyData);
      if (res?.status === 200) {
        cookies.set("token", res?.data?.token, { path: "/" });
        toast.success("Code is confirmed", {
          position: "top-center",
        });
        router.push("/");
        setLoading(0);
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message || "An error occurred", {
        position: "top-center",
      });
    } finally {
      setLoading(0);
    }
  };
};
