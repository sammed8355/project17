const API = import.meta.env.VITE_API_URL ? `${import.meta.env.VITE_API_URL}/auth` : "http://localhost:5000/api/auth";

export const signupUser = async (data) => {
  const res = await fetch(`${API}/signup`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
  
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || "Signup failed");
  }
  return json;
};

export const verifyOtp = async (data) => {
  const res = await fetch(`${API}/verify-otp`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
  
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || "OTP verification failed");
  }
  return json;
};

export const loginUser = async (data) => {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
  });
  
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || "Login failed");
  }
  return json;
};
