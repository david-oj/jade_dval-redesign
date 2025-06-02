// pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components";
import { AUTH_TOKEN_KEY } from "@/hooks/useAuthGuard";
import {sha256} from 'js-sha256';

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const hash = sha256(password);

    if (hash === import.meta.env.VITE_ADMIN_PASSWORD_HASH) {
      localStorage.setItem(AUTH_TOKEN_KEY, Date.now().toString());
      navigate("/dashboard", { replace: true });
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <section className="max-w-md mx-auto p-6 my-20 border rounded-xl shadow-sm">
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
