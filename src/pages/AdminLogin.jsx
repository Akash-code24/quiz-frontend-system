import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    const correctUser = "admin";
    const correctPass = "123";

    if (user === correctUser && pass === correctPass) {
      localStorage.setItem("isAdmin", "true");
      navigate("/dashboard");
    } else {
      alert("Wrong credentials");
    }
  }

return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Admin Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
            <input
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
            />

            <input
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
            />

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition duration-200"
            >
                Login
            </button>
        </form>
    </div>
);
}
