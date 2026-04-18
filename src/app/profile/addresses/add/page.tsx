"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { ChevronLeft, Home, Briefcase, MoreHorizontal } from "lucide-react";

export default function AddAddressPage() {
  const [label, setLabel] = useState("Home");

  return (
    <main className="min-h-screen bg-white">
      <Navbar bg="bg-[#808080]" isLoggedIn={true} />
      
      <div className="max-w-6xl mx-auto px-8 py-12">
        <a href="/profile/addresses" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-12 group w-fit">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Profile
        </a>

        <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-12 shadow-sm max-w-3xl mx-auto mb-24">
          <form className="space-y-8">
            {/* Address Label Selector */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-gray-700">Address Label</label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: "Home", icon: Home },
                  { id: "Work", icon: Briefcase },
                  { id: "Other", icon: MoreHorizontal }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLabel(item.id)}
                    className={`flex flex-col items-center justify-center py-4 px-6 rounded-xl border-2 transition-all gap-2
                      ${label === item.id 
                        ? 'border-purple-500 bg-purple-50 text-purple-600' 
                        : 'border-gray-50 bg-white text-gray-400 hover:border-gray-100'}`}
                  >
                    <item.icon size={20} />
                    <span className="text-sm font-medium">{item.id}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  className="w-full bg-white border border-gray-100 rounded-lg p-4 text-sm outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Street Address <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="123 Main Street" 
                  className="w-full bg-white border border-gray-100 rounded-lg p-4 text-sm outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Apartment, Suite, etc. (Optional)</label>
                <input 
                  type="text" 
                  placeholder="Apt 4B" 
                  className="w-full bg-white border border-gray-100 rounded-lg p-4 text-sm outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">City <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    placeholder="Austin" 
                    className="w-full bg-white border border-gray-100 rounded-lg p-4 text-sm outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">State <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    className="w-full bg-white border border-gray-100 rounded-lg p-4 text-sm outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">ZIP Code <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    placeholder="78701" 
                    className="w-full bg-white border border-gray-100 rounded-lg p-4 text-sm outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Country <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    className="w-full bg-white border border-gray-100 rounded-lg p-4 text-sm outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number (Optional)</label>
                <input 
                  type="text" 
                  placeholder="+1 (555) 123-4567" 
                  className="w-full bg-white border border-gray-100 rounded-lg p-4 text-sm outline-none focus:border-blue-500 transition-colors"
                />
                <p className="text-[11px] text-gray-400 mt-1">Used for delivery updates</p>
              </div>
            </div>

            {/* Set Default Toggle */}
            <div className="bg-gray-50 border border-gray-50 p-6 rounded-xl flex items-center gap-4">
              <div className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-800">Set as default address</span>
                <span className="text-xs text-gray-400">This address will be used as your primary shipping address</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <button 
                type="submit"
                className="bg-[#3b82f6] text-white py-4 rounded-lg font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-50"
              >
                Save Address
              </button>
              <a 
                href="/profile/addresses"
                className="bg-gray-100 text-gray-600 py-4 rounded-lg font-bold hover:bg-gray-200 transition-all text-center flex items-center justify-center"
              >
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
