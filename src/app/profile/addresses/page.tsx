"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ChevronLeft, Plus, Edit, Trash2, Home, Briefcase, MapPin } from "lucide-react";

const addresses = [
  {
    id: 1,
    label: "Home",
    isDefault: true,
    name: "Alex Rivera",
    street: "123 Neurodivergent Lane",
    city: "Austin, TX 78701",
    country: "United States"
  },
  {
    id: 2,
    label: "Work",
    isDefault: false,
    name: "Alex Rivera",
    street: "456 Creative Blvd, Suite 200",
    city: "Austin, TX 78702",
    country: "United States"
  }
];

export default function AddressesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar bg="bg-[#808080]" isLoggedIn={true} />
      
      <div className="w-full px-6 md:px-16 py-12 pt-28">
        <a href="/profile" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-12 group w-fit">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Profile
        </a>

        <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-12 shadow-sm mb-24">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl font-bold text-gray-900">Saved Addresses</h1>
            <a href="/profile/addresses/add" className="bg-[#3b82f6] text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-50">
              <Plus size={18} />
              Add Address
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {addresses.map((address) => (
              <div key={address.id} className="border border-gray-100 rounded-2xl p-8 flex flex-col gap-6 relative group hover:border-blue-100 transition-colors">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">{address.label}</h3>
                  {address.isDefault && (
                    <span className="bg-blue-500 text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Default</span>
                  )}
                </div>

                <div className="space-y-1 text-gray-500 text-sm leading-relaxed">
                  <p className="font-medium text-gray-700">{address.name}</p>
                  <p>{address.street}</p>
                  <p>{address.city}</p>
                  <p>{address.country}</p>
                </div>

                <div className="flex gap-3 mt-auto">
                  <a href="/profile/addresses/add" className="flex-1 flex items-center justify-center gap-2 border border-gray-100 py-3 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                    <Edit size={16} />
                    Edit
                  </a>
                  <button className="w-12 h-12 flex items-center justify-center border border-red-100 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
