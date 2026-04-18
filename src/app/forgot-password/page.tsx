"use client";

import { useState } from "react";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Step = "email" | "otp" | "reset";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("email");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar bg="bg-[#808080]" />
      
      <div className="flex-1 flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-[500px] bg-white rounded-xl border border-gray-100 shadow-sm p-8 md:p-12">
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-10 text-center">
            <div className="font-heading text-3xl font-black tracking-tighter leading-none mb-1">
              ADHD <br /> PROUD
            </div>
            <div className="text-[10px] font-bold tracking-[0.2em] text-gray-900 border-t border-black pt-1 mt-1 uppercase">
              Different by Design
            </div>
          </div>

          {step === "email" && (
            <div className="animate-in fade-in duration-500">
              <div className="text-center mb-10">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Forget Password?</h1>
                <p className="text-gray-400 text-sm">Please enter your email to get verification code</p>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setStep("otp"); }}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email address</label>
                  <input 
                    type="email" 
                    placeholder="esteban_schiller@gmail.com" 
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors placeholder:text-gray-300"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#3b82f6] text-white font-bold py-3.5 rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-50"
                >
                  Sign in
                </button>
              </form>
            </div>
          )}

          {step === "otp" && (
            <div className="animate-in fade-in duration-500">
              <div className="text-center mb-10">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Check your email</h1>
                <p className="text-gray-400 text-sm max-w-[300px] mx-auto">
                  We sent a code to your email address. Please check your email for the 5 digit code.
                </p>
              </div>

              <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); setStep("reset"); }}>
                <div className="flex justify-between gap-2 px-2">
                  {[2, 8, 4, "", "", ""].map((val, i) => (
                    <input 
                      key={i}
                      type="text" 
                      defaultValue={val}
                      maxLength={1}
                      className="w-12 h-12 md:w-14 md:h-14 text-center border border-gray-100 rounded-lg text-lg font-bold outline-none focus:border-blue-500 transition-colors bg-gray-50/50"
                    />
                  ))}
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#3b82f6] text-white font-bold py-3.5 rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-50"
                >
                  Verify
                </button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  You have not received the email? <button type="button" className="text-blue-500 font-medium hover:underline">Resend</button>
                </p>
              </div>
            </div>
          )}

          {step === "reset" && (
            <div className="animate-in fade-in duration-500">
              <div className="text-center mb-10">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Set a new password</h1>
                <p className="text-gray-400 text-sm max-w-[320px] mx-auto leading-relaxed">
                  Create a new password. Ensure it differs from previous ones for security
                </p>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); window.location.href = "/login"; }}>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">New Password</label>
                  <div className="relative">
                    <input 
                      type={showPass ? "text" : "password"} 
                      placeholder="**********" 
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors placeholder:text-gray-300 pr-12"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                  <div className="relative">
                    <input 
                      type={showConfirmPass ? "text" : "password"} 
                      placeholder="**********" 
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors placeholder:text-gray-300 pr-12"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowConfirmPass(!showConfirmPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-[#3b82f6] text-white font-bold py-3.5 rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-50"
                >
                  Confirm
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
