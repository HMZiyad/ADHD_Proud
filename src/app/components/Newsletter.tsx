"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      router.push(`/signup?email=${encodeURIComponent(email)}`);
    }
  };

  return (
    <section className="relative w-full py-32 px-8 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/assets/hero_bottom.jpg"
          alt="Community background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        <h2 className="font-heading text-4xl md:text-5xl text-white tracking-tight text-center mb-4">
          STAY CONNECTED WITH THE ADHD PROUD COMMUNITY.
        </h2>
        <p className="text-white/90 font-medium text-center mb-8">
          Type your email down below and be young wild generation
        </p>

        <form className="w-full relative flex items-center" onSubmit={handleSubscribe}>
          <div className="w-full bg-white rounded-full flex items-center p-1">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email Here ..." 
              className="flex-1 min-w-0 w-full py-3.5 pl-4 md:pl-6 bg-transparent outline-none text-black font-medium placeholder:text-gray-400 rounded-l-full [&:-webkit-autofill]:shadow-[0_0_0_30px_white_inset] text-sm md:text-base"
              required
            />
            <button 
              type="submit" 
              className="bg-[#3b82f6] text-white px-5 md:px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition-colors shadow-sm shrink-0 text-sm md:text-base"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
