import { toast } from "react-toastify";

export const useOtpRequest = (setPhone, setLoading, getOtp, nextStep) => {
  return async (mobile) => {
    setPhone(mobile);
    setLoading(1);

    try {
      const res = await getOtp(mobile);

      if (res?.status === 200) {
        toast.success("کد ارسال شد", { position: "top-center" });
        nextStep();
      } else {
        throw new Error(res.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "An error occurred", {
        position: "top-center",
      });
    } finally {
      setLoading(0);
    }
  };
};

export const useOtpResend = (
  setMinutes,
  setSeconds,
  setLoading,
  getOtp,
  mobile
) => {
  return async () => {
    setLoading(1);
    try {
      const res = await getOtp(mobile);

      if (res.status === 200) {
        toast.success("کد مجددا ارسال شد", {
          position: "top-right",
        });

        setMinutes(2);
        setSeconds(0o0);
        setLoading(0);
      } else {
        throw new Error(res.response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(0);
    }
  };
};
