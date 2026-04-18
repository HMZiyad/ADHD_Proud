"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, MapPin, LogOut, Package, Heart, Edit } from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar bg="bg-[#808080]" isLoggedIn={true} />
      
      <div className="w-full px-6 md:px-16 py-16 pt-28">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-gray-100 shadow-sm">
              <Image 
                src="/assets/hero.png" 
                alt="User Avatar" 
                fill 
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Sarena Parker</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600">
                  <Mail size={16} />
                  <span>alex.rivera@email.com</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600">
                  <MapPin size={16} />
                  <span>Los Angeles, CA</span>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              window.location.href = "/";
            }}
            className="flex items-center gap-2 bg-[#d90000] text-white px-8 py-3 rounded-md font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-50 self-center md:self-end mb-4"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <a href="/profile/orders" className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Total Orders</p>
              <h2 className="text-4xl font-bold text-gray-900">3</h2>
            </div>
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <Package size={32} strokeWidth={1.5} />
            </div>
          </a>

          <a href="/profile/wishlist" className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Wishlist</p>
              <h2 className="text-4xl font-bold text-gray-900">4</h2>
            </div>
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <Heart size={32} strokeWidth={1.5} />
            </div>
          </a>

          <a href="/profile/addresses" className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Saved Addresses</p>
              <h2 className="text-4xl font-bold text-gray-900">2</h2>
            </div>
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <MapPin size={32} strokeWidth={1.5} />
            </div>
          </a>
        </div>

        {/* Account Information Card */}
        <div className="bg-white border border-gray-100 rounded-2xl p-10 md:p-12 shadow-sm mb-24">
          <div className="flex items-center justify-between mb-12 border-b border-gray-50 pb-8">
            <h2 className="text-2xl font-bold text-gray-900">Account Information</h2>
            <button className="flex items-center gap-2 text-blue-500 font-bold text-sm hover:underline">
              <Edit size={18} />
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-12">
            <div>
              <p className="text-sm text-gray-400 mb-2">Full Name</p>
              <p className="text-lg font-medium text-gray-700">Alex Rivera</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Email</p>
              <p className="text-lg font-medium text-gray-700">alex.rivera@email.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Phone</p>
              <p className="text-lg font-medium text-gray-700">+1 (555) 123-4567</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Member Since</p>
              <p className="text-lg font-medium text-gray-700">January 15, 2025</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
