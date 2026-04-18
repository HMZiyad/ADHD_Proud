"use client";

import { ShoppingCart, Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar({ bg = "transparent", isLoggedIn: propIsLoggedIn }: { bg?: string; isLoggedIn?: boolean }) {
  const [isLoggedIn, setIsLoggedIn] = useState(propIsLoggedIn || false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (propIsLoggedIn !== undefined) {
      setIsLoggedIn(propIsLoggedIn);
      return;
    }
    const status = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(status);
  }, [propIsLoggedIn]);

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-black/40 backdrop-blur-xl border-b border-white/5">
      {/* Main bar */}
      <div className="flex items-center justify-between px-6 md:px-16 py-4 text-white">
        <a href="/" className="shrink-0">
          <Image
            src="/assets/logo.png"
            alt="ADHD PROUD"
            width={82}
            height={53}
            className="h-10 w-auto object-contain brightness-0 invert"
          />
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-10 text-[15px] font-medium">
          <a href="/" className="hover:text-blue-300 transition-colors">Home</a>
          <a href="/shop" className="hover:text-blue-300 transition-colors">Shop</a>
          <a href="/blogs" className="hover:text-blue-300 transition-colors">Blogs</a>
          <a href="/about" className="hover:text-blue-300 transition-colors">About Us</a>
          <a href="/contact" className="hover:text-blue-300 transition-colors">Contact Us</a>
        </div>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-6 shrink-0">
          <a href="/cart" className="relative cursor-pointer hover:text-blue-300 transition-colors">
            <ShoppingCart className="w-6 h-6" />
          </a>

          {isLoggedIn ? (
            <a href="/profile" className="w-10 h-10 rounded-full overflow-hidden border-2 border-white hover:border-blue-300 transition-all shadow-sm">
              <Image src="/assets/hero.png" alt="Profile" width={40} height={40} className="object-cover" />
            </a>
          ) : (
            <div className="flex items-center gap-4">
              <a href="/login" className="text-sm font-semibold border border-white/40 px-6 py-2.5 rounded-full hover:bg-white/10 transition-all">Log in</a>
              <a href="/signup" className="bg-[#3b82f6] text-white px-7 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">
                Sign up
              </a>
            </div>
          )}
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="flex md:hidden items-center gap-4">
          <a href="/cart" className="cursor-pointer hover:text-blue-300 transition-colors text-white">
            <ShoppingCart className="w-6 h-6" />
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl px-6 pb-6 flex flex-col gap-4 text-white text-[15px] font-medium border-t border-white/10">
          <a href="/" onClick={() => setMenuOpen(false)} className="pt-4 hover:text-blue-300 transition-colors">Home</a>
          <a href="/shop" onClick={() => setMenuOpen(false)} className="hover:text-blue-300 transition-colors">Shop</a>
          <a href="/blogs" onClick={() => setMenuOpen(false)} className="hover:text-blue-300 transition-colors">Blogs</a>
          <a href="/about" onClick={() => setMenuOpen(false)} className="hover:text-blue-300 transition-colors">About Us</a>
          <a href="/contact" onClick={() => setMenuOpen(false)} className="hover:text-blue-300 transition-colors">Contact Us</a>
          <div className="flex items-center gap-4 pt-2 border-t border-white/10">
            {isLoggedIn ? (
              <a href="/profile" className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <Image src="/assets/hero.png" alt="Profile" width={40} height={40} className="object-cover" />
              </a>
            ) : (
              <>
                <a href="/login" className="text-sm font-semibold border border-white/40 px-6 py-2.5 rounded-full hover:bg-white/10 transition-all">Log in</a>
                <a href="/signup" className="bg-[#3b82f6] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-600 transition-all">Sign up</a>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
