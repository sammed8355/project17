import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SetProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("Member");
  const [photoBase64, setPhotoBase64] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/signup");
    } else {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFullName(parsedUser.name || "");
      if (parsedUser.role) setRole(parsedUser.role);
      if (parsedUser.profile_photo) setPhotoBase64(parsedUser.profile_photo);
    }
  }, [navigate]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setError("Image size should be less than 2MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoBase64(reader.result);
        setError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError("Full Name is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          name: fullName,
          role: role,
          profile_photo: photoBase64
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      // Update local storage with new user data
      localStorage.setItem("user", JSON.stringify({
        ...user,
        name: fullName,
        role: role,
        profile_photo: photoBase64
      }));

      // Navigate to Dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4 py-8">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-green-800">Complete Your Profile</h1>
          <p className="text-gray-500 text-sm mt-2">Add basic information</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm px-4 py-2 rounded mb-6 text-center">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col">
          
          {/* Photo Upload Area */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-28 h-28 mb-3">
              <div className="w-full h-full rounded-full border-4 border-green-100 overflow-hidden bg-gray-100 flex items-center justify-center">
                {photoBase64 ? (
                  <img src={photoBase64} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <i className="fas fa-user text-4xl text-gray-300"></i>
                )}
              </div>
              
              <label 
                htmlFor="photo-upload" 
                className="absolute bottom-0 right-0 bg-green-600 w-8 h-8 rounded-full flex items-center justify-center text-white cursor-pointer shadow-md hover:bg-green-700 transition"
              >
                <i className="fas fa-camera text-sm"></i>
              </label>
              <input 
                id="photo-upload" 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handlePhotoUpload}
              />
            </div>
            <span className="text-sm text-green-700 font-medium cursor-pointer" onClick={() => document.getElementById('photo-upload').click()}>
              Upload Photo
            </span>
          </div>

          {/* Full Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <i className="fas fa-user"></i>
              </span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:bg-white transition"
                placeholder="Sunita Patil"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Select Role</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <i className="fas fa-users-cog"></i>
              </span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:bg-white transition appearance-none"
              >
                <option value="Member">Member</option>
                <option value="President">President</option>
                <option value="Secretary">Secretary</option>
                <option value="Treasurer">Treasurer</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <i className="fas fa-chevron-down text-sm"></i>
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
          >
            {loading ? "Saving..." : "Continue"}
          </button>
        </form>

      </div>
    </div>
  );
}
