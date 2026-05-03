import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyOtp } from "../services/authService";

export default function VerifyOTP() {
  const [searchParams] = useSearchParams();
  const mobile = searchParams.get("mobile");
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!mobile) {
      navigate("/signup");
    }
  }, [mobile, navigate]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && e.target.previousSibling) {
        e.target.previousSibling.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      setError("Please enter the full 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await verifyOtp({ mobile, otp: otpValue });
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user)); // Save user details
      alert("Verification successful!");
      navigate("/set-profile"); 
    } catch (err) {
      setError(err.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 border-2 border-green-700 rounded-full flex items-center justify-center p-1">
            <img
              src="/logo.png"
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-green-800 mt-3">
            Verify Your Number
          </h1>
          <p className="text-gray-500 text-sm mt-1 text-center">
            Enter 6-digit OTP sent to <br />
            <span className="font-semibold text-gray-800">{mobile}</span>
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm px-4 py-2 rounded mb-4 text-center">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          
          <div className="flex gap-2 mb-6 justify-center w-full">
            {otp.map((data, index) => {
              return (
                <input
                  className="w-10 h-12 md:w-12 md:h-14 text-center text-xl font-semibold border-2 rounded-lg focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                  type="text"
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={e => handleChange(e.target, index)}
                  onFocus={e => e.target.select()}
                  onKeyDown={e => handleBackspace(e, index)}
                />
              );
            })}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded-lg transition disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-5">
          Didn't receive code?{" "}
          <button className="text-green-700 font-semibold hover:underline" onClick={() => alert("Resend functionality to be implemented")}>
            Resend OTP
          </button>
        </p>

      </div>
    </div>
  );
}
