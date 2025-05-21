// pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components";

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      localStorage.setItem("isAdmin", "true");
      navigate("/dashboard");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <section className="max-w-md mx-auto p-6 mt-20 border rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-center">Admin Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="password" className="block mb-1">Enter Admin Password</label>
          <input
            type="password"
            id="password"
            className="w-full border rounded-lg px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full py-2 text-sm rounded-4">
          Login
        </Button>
      </form>
    </section>
  );
};

export default Login;
