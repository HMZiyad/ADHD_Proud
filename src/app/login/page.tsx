"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { authService } from "@/services/auth.service";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await authService.login({ email, password });
      window.location.href = "/";
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.response?.data?.detail || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar bg="bg-[#808080]" />
      
      <div className="flex-1 flex items-center justify-center p-6 py-12 pt-[88px]">
        <div className="w-full max-w-[500px] bg-white rounded-xl border border-gray-100 shadow-sm p-8 md:p-12">
          <div className="flex justify-center mb-12">
            <Image 
              src="/assets/logo_black.png" 
              alt="ADHD PROUD" 
              width={200} 
              height={100} 
              className="h-20 w-auto object-contain"
              priority
            />
          </div>

          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Login to Account</h1>
            <p className="text-gray-400 text-sm">Please enter your email and password to continue</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form 
            className="space-y-6" 
            onSubmit={handleSubmit}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="esteban_schiller@gmail.com" 
                required
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors placeholder:text-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="**********" 
                  required
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors placeholder:text-gray-300 pr-12"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
                <span className="text-sm text-gray-500">Remember Password</span>
              </label>
              <a href="/forgot-password" className="text-sm text-blue-500 hover:underline">Forget Password?</a>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#3b82f6] text-white font-bold py-3.5 rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-400">
              Don&apos;t have any account? <a href="/signup" className="text-blue-500 font-medium hover:underline ml-1">Create an Account</a>
            </p>
          </div>
        </div>
      </div>


      <Footer />
    </main>
  );
}
