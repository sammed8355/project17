import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">

      <div className="border-2 border-gray-300 rounded-3xl p-10 w-full max-w-md text-center shadow-md">

        {/* Top Logo */}
        <div className="flex justify-center mb-5">
        <div className="w-20 h-20 border-2 border-green-600 rounded-full flex items-center justify-center p-1">
            <img
            src="/logo.png"   
            alt="logo"
            className="w-full h-full object-contain"
            />
        </div>
        </div>

        {/* Title */}
        <h1 className="text-green-700 text-2xl font-semibold">
          Mahila Bachat Gat
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-base mt-1">
          सक्षम महिला, समृद्ध समाज
        </p>

        {/* Bottom Illustration */}
        <div className="mt-6">
          <img
            src="/women-group.png"
            alt="women group"
            className="w-full"
          />
        </div>

      </div>
    </div>
  );
}