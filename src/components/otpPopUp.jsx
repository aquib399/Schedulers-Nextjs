import { useRouter } from "next/navigation";
import { setCookie, server } from "../../middleware/auth";
export default function OtpPopUp({ onCancel, email, username, password }) {
  const router = useRouter();
  async function verifyOTP() {
    document.getElementById("backdrop").style.display = "none";
    const btn = document.getElementById("verifyBtn");
    const otpInput = document.getElementById("otp");
    if (otpInput.value.length != 6) {
      btn.style.textDecoration = "line-through";
      return;
    }
    btn.disabled = true;
    console.log(otpInput.value);
    const res = await fetch(server + "/verifyOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp: otpInput.value }),
    }).catch((err) => {
      console.log(err);
      alert("Error while sending mail");
    });
    if (res?.status == 200) {
      alert("Account created Successfully");
      setCookie(username, password);
      router.replace("/");
      return;
    }
    alert("Invalid OTP");
  }
  return (
    <>
      <div className="bg-black/60 fixed center-full animate-[fadeIn_500ms]">
        <div className="fixed flex flex-col items-center justify-center pt-4 gap-y-4 w-[44rem] h-[24rem] bg-white rounded-3xl shadow-2xl">
          <div onClick={onCancel} className="absolute top-4 right-4" id="backdrop">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 hover:cursor-pointer">
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
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
            type="number"
            placeholder="######"
            className="text-xl font-extrabold tracking-[10px] text-center outline-none border border-black rounded w-2/5 h-12 focus:w-1/2 transition-all duration-300 ease-out"
            onWheel={(e) => document.activeElement.blur()}
            onChange={() => {
              const otpInput = document.getElementById("otp");
              otpInput.value = otpInput.value.substring(0, 6);
              const btn = document.getElementById("verifyBtn");
              btn.disabled = false;
              btn.style.textDecoration = "none";
            }}
          />
          <button
            id="verifyBtn"
            onClick={verifyOTP}
            className="border border-black p-1 px-3 w-32 rounded hover:bg-black hover:text-white transition-all"
          >
            Verify
          </button>
          <button onClick={onCancel} className="text-blue-700 text-xs w-32 hover:text-black hover:underline">
            Edit / Resend
          </button>
          <span id="timer">60</span>
        </div>
      </div>
    </>
  );
}
