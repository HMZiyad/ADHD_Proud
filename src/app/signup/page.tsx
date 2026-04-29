"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { authService } from "@/services/auth.service";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get("email");
      if (emailParam) {
        setEmail(emailParam);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(false);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      await authService.register({ 
        email, 
        password,
        confirm_password: confirmPassword
      });
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Registration failed:", err);
      const errorData = err.response?.data;
      const firstError = errorData ? Object.values(errorData)[0] : "Registration failed. Please try again.";
      setError(Array.isArray(firstError) ? firstError[0] : firstError);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen flex flex-col bg-gray-50">
        <Navbar bg="bg-[#808080]" />
        <div className="flex-1 flex items-center justify-center p-6 py-12 pt-[88px]">
          <div className="w-full max-w-[500px] bg-white rounded-xl border border-gray-100 shadow-sm p-8 md:p-16 flex flex-col items-center text-center">
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

            <div className="mb-6 flex justify-center">
              <CheckCircle className="text-green-500 w-16 h-16" />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">Account Created Successfully!</h1>
            <p className="text-gray-400 text-sm mb-10 max-w-[280px]">Your account has been created successfully! You can sign in now.</p>

            <a 
              href="/login" 
              className="w-full bg-[#3b82f6] text-white font-bold py-3.5 rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-50 text-center"
            >
              Sign in
            </a>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

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
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Create an Account</h1>
            <p className="text-gray-400 text-sm">Create your account to manage your panel</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"} 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="**********" 
                  required
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors placeholder:text-gray-300 pr-12"
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-sm text-gray-400">
              Already have Account? <a href="/login" className="text-blue-500 font-medium hover:underline ml-1">Sign in</a>
            </p>
          </div>
        </div>
      </div>


      <Footer />
    </main>
  );
}
