import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import axiosInstance from "../../util/axios";
import { VERIFY_OTP } from "../../util/api";
import { useEffect, useState } from "react";
export default function OtpPopUp({ onCancel, email, onResend }) {
  const router = useRouter();
  const [time, setTime] = useState(60);
  async function verifyOTP(e) {
    e.preventDefault();
    const otp = e.target.otp.value;
    const reqBody = { email, otp };
    console.log(reqBody);
    try {
      const { data } = await axiosInstance.post(VERIFY_OTP, reqBody);
      if (data?.error) throw { message: data?.message };
      router.push("/signin")
    } catch (error) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    }
  }
  useEffect(() => {
    time > 0 &&
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
  }, [time]);
  return (
    <>
      <div className="bg-black/60 fixed center-full animate-[fadeIn_500ms]">
        <form onSubmit={verifyOTP} className="fixed flex flex-col items-center justify-center pt-4 gap-y-4 w-[44rem] h-[24rem] bg-white rounded-3xl shadow-2xl">
          <div onClick={onCancel} className="absolute top-4 right-4" id="backdrop">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:cursor-pointer">
              <path
                fillRule="evenodd"
                d={`M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12
                13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z`}
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-2xl font-bold">Please Enter The OTP To Verify Your Account</p>
          <p className="text-sm">
            A 6 Digit OTP has been sent to
            <span className="text-blue-700"> {email}</span>
          </p>
          <input
            id="otp"
            name="otp"
            type="number"
            placeholder="######"
            required
            className={`text-xl font-extrabold tracking-[10px] text-center outline-none border border-black rounded w-2/5 h-12
            focus:w-1/2 transition-all duration-300 ease-out`}
            onWheel={(e) => document.activeElement.blur()}
            onChange={() => {
              const otpInput = document.getElementById("otp");
              otpInput.value = otpInput.value.substring(0, 6);
            }}
          />
          <button type="submit" className="border border-black p-1 px-3 w-32 rounded hover:bg-black hover:text-white transition-all">
            Verify
          </button>
          {time > 0 && <span id="timer">You can resend otp in {time}</span>}
          {!time && (
            <button
              type="button"
              id="verifyBtn"
              onClick={() => {
                onResend().then(() => setTime(60));
              }}
              className="border border-black p-1 px-3 w-32 rounded hover:bg-black hover:text-white transition-all"
            >
              Resend
            </button>
          )}
        </form>
      </div>
    </>
  );
}
