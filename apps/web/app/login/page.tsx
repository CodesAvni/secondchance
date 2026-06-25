"use client";
import Cookies from "js-cookie";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

    
      alert("Login Successful");

      const user = response.data.user;
Cookies.set(
"token",
response.data.token
);
Cookies.set(
"role",
response.data.user.role
);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      window.dispatchEvent(new Event("storage"));

      if (user.role.toUpperCase() === "EMPLOYER") {
        router.push("/employer/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.log(error);
      console.log(error.response);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex justify-center items-center text-slate-800 font-sans antialiased relative px-4"
      style={{ backgroundImage: "linear-gradient(to right top, #e4e9ed, #cbdcec, #b3ceec, #9fbfec, #8eb0eb)" }}
    >
      {/* Soft Ambient Overlay */}
      <div className="absolute top-0 right-0 w-full h-full bg-white/10 pointer-events-none" />

      <div className="w-full max-w-md p-8 bg-white/40 backdrop-blur-xl rounded-3xl shadow-xl shadow-slate-400/20 border border-white/60 relative z-10">

        <h1 className="text-3xl font-black mb-6 text-center text-slate-900 tracking-tight">
          Login
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-white/70 border border-slate-300/60 focus:border-blue-400/80 focus:ring-2 focus:ring-blue-400/20 p-3 rounded-xl text-sm font-medium transition outline-none placeholder-slate-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-white/70 border border-slate-300/60 focus:border-blue-400/80 focus:ring-2 focus:ring-blue-400/20 p-3 rounded-xl text-sm font-medium transition outline-none placeholder-slate-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white p-3 rounded-xl text-sm font-bold tracking-wide transition shadow-md duration-200 mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

      </div>
    </div>
  );
}