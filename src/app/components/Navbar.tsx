"use client";

import { ShoppingCart, Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { authService } from "@/services/auth.service";
import { profileService } from "@/services/profile.service";

export default function Navbar({ bg = "transparent", isLoggedIn: propIsLoggedIn }: { bg?: string; isLoggedIn?: boolean }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(propIsLoggedIn !== undefined ? propIsLoggedIn : null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [cartCount, setCartCount] = useState<number>(0);

  const fetchCartCount = async () => {
    try {
      const data = await profileService.getCart();
      const count = data?.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0;
      setCartCount(count);
    } catch (error) {
      console.error("Failed to fetch cart count", error);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const isAuth = authService.isAuthenticated();
      setIsLoggedIn(isAuth);
      if (isAuth) {
        try {
          const profileData = await profileService.getProfile();
          setProfile(profileData);
          await fetchCartCount();
        } catch (error) {
          console.error("Failed to fetch profile for navbar", error);
        }
      }
    };
    initAuth();

    const handleCartUpdate = () => {
      if (authService.isAuthenticated()) fetchCartCount();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
  };

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
        <div className="hidden md:flex items-center gap-6 shrink-0 min-w-[140px] justify-end">
          <a href="/cart" className="relative cursor-pointer hover:text-blue-300 transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </a>

          {isLoggedIn === null ? (
            <div className="w-[140px] h-10 animate-pulse bg-white/10 rounded-full" />
          ) : isLoggedIn ? (
            <div className="flex items-center gap-4">
              <a href="/profile" className="w-10 h-10 rounded-full overflow-hidden border-2 border-white hover:border-blue-300 transition-all shadow-sm flex items-center justify-center bg-gray-200">
                {profile?.avatar ? (
                  <Image src={profile.avatar} alt="Profile" width={40} height={40} className="object-cover w-full h-full" />
                ) : (
                  <span className="text-sm font-bold text-gray-500">{profile?.full_name?.charAt(0) || "U"}</span>
                )}
              </a>
              <button 
                onClick={handleLogout}
                className="text-sm font-semibold border border-white/40 px-5 py-2 rounded-full hover:bg-white/10 transition-all cursor-pointer"
              >
                Logout
              </button>
            </div>
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
          <a href="/cart" className="relative cursor-pointer hover:text-blue-300 transition-colors text-white">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
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
          <div className="flex items-center gap-4 pt-2 border-t border-white/10 min-h-[50px]">
            {isLoggedIn === null ? (
              <div className="w-full h-10 animate-pulse bg-white/10 rounded-full" />
            ) : isLoggedIn ? (
              <div className="flex items-center gap-4">
                <a href="/profile" className="w-10 h-10 rounded-full overflow-hidden border-2 border-white flex items-center justify-center bg-gray-200">
                  {profile?.avatar ? (
                    <Image src={profile.avatar} alt="Profile" width={40} height={40} className="object-cover w-full h-full" />
                  ) : (
                    <span className="text-sm font-bold text-gray-500">{profile?.full_name?.charAt(0) || "U"}</span>
                  )}
                </a>
                <button 
                  onClick={handleLogout}
                  className="text-sm font-semibold border border-white/40 px-5 py-2 rounded-full hover:bg-white/10 transition-all"
                >
                  Logout
                </button>
              </div>
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
