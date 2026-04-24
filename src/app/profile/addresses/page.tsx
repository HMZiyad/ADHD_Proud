"use client";

import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ChevronLeft, Plus, Edit, Trash2, Home, Briefcase, MapPin, Loader2 } from "lucide-react";
import { profileService } from "@/services/profile.service";

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const data = await profileService.getAddresses();
      setAddresses(data);
    } catch (error) {
      console.error("Failed to fetch addresses", error);
    } finally {
      setLoading(false);
    }
  };

  const removeAddress = async (id: number) => {
    try {
      await profileService.deleteAddress(id);
      fetchAddresses();
    } catch (error) {
      console.error("Failed to delete address", error);
    }
  };

  const setDefault = async (id: number) => {
    try {
      await profileService.setDefaultAddress(id);
      fetchAddresses();
    } catch (error) {
      console.error("Failed to set default address", error);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar bg="bg-[#808080]" isLoggedIn={true} />
      
      <div className="w-full px-6 md:px-16 py-12 pt-28">
        <a href="/profile" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-12 group w-fit">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Profile
        </a>

        <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-12 shadow-sm mb-24 min-h-[400px]">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl font-bold text-gray-900">Saved Addresses</h1>
            <a href="/profile/addresses/add" className="bg-[#3b82f6] text-white px-6 py-3 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-50">
              <Plus size={18} />
              Add Address
            </a>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
            </div>
          ) : addresses.length === 0 ? (
            <div className="text-center py-20 text-gray-500 font-medium">
              You haven&apos;t saved any addresses yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {addresses.map((address) => (
                <div key={address.id} className={`border ${address.is_default ? 'border-blue-200 bg-blue-50/10' : 'border-gray-100'} rounded-2xl p-8 flex flex-col gap-6 relative group hover:border-blue-100 transition-colors`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-800 capitalize">{address.address_type || "Address"}</h3>
                    {address.is_default && (
                      <span className="bg-blue-500 text-white px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Default</span>
                    )}
                  </div>

                  <div className="space-y-1 text-gray-500 text-sm leading-relaxed">
                    <p className="font-medium text-gray-700">{address.name || address.user?.full_name}</p>
                    <p>{address.street_address}</p>
                    {address.apartment && <p>{address.apartment}</p>}
                    <p>{address.city}, {address.state} {address.postal_code}</p>
                    <p>{address.country}</p>
                    {address.phone_number && <p>Phone: {address.phone_number}</p>}
                  </div>

                  <div className="flex gap-3 mt-auto">
                    <a href={`/profile/addresses/${address.id}/edit`} className="flex-1 flex items-center justify-center gap-2 border border-gray-100 py-3 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                      <Edit size={16} />
                      Edit
                    </a>
                    {!address.is_default && (
                      <button 
                        onClick={() => setDefault(address.id)}
                        className="flex-1 flex items-center justify-center gap-2 border border-blue-100 py-3 rounded-lg text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        Set Default
                      </button>
                    )}
                    <button 
                      onClick={() => removeAddress(address.id)}
                      className="w-12 h-12 flex items-center justify-center border border-red-100 rounded-lg text-red-500 hover:bg-red-50 transition-colors shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
