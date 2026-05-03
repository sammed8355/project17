import { useState } from "react";
import { signupUser } from "../services/authService";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signupUser(form);
    alert(res.message);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-80">
        <h2 className="text-xl font-bold text-center mb-4">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            placeholder="Name"
            className="w-full p-2 border rounded"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            className="w-full p-2 border rounded"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="w-full bg-green-600 text-white p-2 rounded">
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
