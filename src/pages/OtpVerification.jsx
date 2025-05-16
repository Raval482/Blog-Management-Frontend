import React, { useState, useEffect } from 'react';
import OTPInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaShieldAlt } from 'react-icons/fa';

const OtpVerification = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  // ✅ Get stored email on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (!storedEmail) {
      toast.error("Email not found. Please register again.");
      navigate("/register");
    } else {
      setEmail(storedEmail);
    }
  }, [navigate]);

  // ✅ Handle OTP Verify
  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/otp-verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, otp })
      });

      const data = await response.json();

      if (data.success) {
        toast.success("OTP Verified Successfully!");
        localStorage.removeItem("email"); // ✅ Clean up
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error("Something went wrong. Try again later.");
      console.error("OTP verification error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center space-y-6">
        <div className="flex justify-center text-5xl text-indigo-600">
          <FaShieldAlt />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">OTP Verification</h2>
        <p className="text-gray-500">
          Please enter the 6-digit code sent to your email: <span className="font-medium">{email}</span>
        </p>

        <div className="flex justify-center">
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            inputStyle={{
              width: "3rem",
              height: "3rem",
              margin: "0 0.3rem",
              fontSize: "1.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc"
            }}
            renderInput={(props) => <input {...props} />}
          />
        </div>

        <button
          onClick={handleVerify}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl transition duration-300"
        >
          Verify OTP
        </button>

        <p className="text-sm text-gray-500">
          Didn’t receive code?{" "}
          <button
            onClick={() => toast("Resend OTP functionality coming soon")}
            className="text-indigo-600 hover:underline"
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default OtpVerification;
