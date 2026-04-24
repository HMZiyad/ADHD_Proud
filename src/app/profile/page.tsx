"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, MapPin, LogOut, Package, Heart, Edit, Loader2, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { profileService } from "@/services/profile.service";
import { authService } from "@/services/auth.service";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAvatarMenu, setShowAvatarMenu] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingAvatar(true);
      setShowAvatarMenu(false);
      const formData = new FormData();
      formData.append('avatar', file);
      
      await profileService.updateProfile(formData);
      fetchProfileData();
    } catch (error: any) {
      console.error("Failed to upload avatar", error);
      const backendError = error.response?.data ? JSON.stringify(error.response.data) : error.message;
      alert(`Failed to upload profile picture: ${backendError}`);
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleAvatarDelete = async () => {
    try {
      setUploadingAvatar(true);
      setShowAvatarMenu(false);
      await profileService.updateProfile({ avatar: null }); 
      fetchProfileData();
    } catch (error: any) {
      console.error("Failed to delete avatar", error);
      const backendError = error.response?.data ? JSON.stringify(error.response.data) : error.message;
      alert(`Failed to delete profile picture: ${backendError}`);
    } finally {
      setUploadingAvatar(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const profileData = await profileService.getProfile();
      setProfile(profileData);
      
      const statsData = await profileService.getProfileStats();
      setStats(statsData);
    } catch (error) {
      console.error("Failed to fetch profile data", error);
      // Redirect to login if unauthorized
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
  };

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col bg-white">
        <Navbar bg="bg-[#808080]" isLoggedIn={true} />
        <div className="flex-1 flex items-center justify-center pt-28">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!profile) return null;

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar bg="bg-[#808080]" isLoggedIn={true} />
      
      <div className="w-full px-6 md:px-16 py-16 pt-28">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
            <div className="relative">
              <div className="w-32 h-32 relative rounded-full overflow-hidden border-4 border-gray-100 shadow-sm flex items-center justify-center bg-gray-200">
                {uploadingAvatar ? (
                  <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                ) : profile.avatar ? (
                  <Image 
                    src={profile.avatar} 
                    alt="User Avatar" 
                    fill 
                    className="object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-gray-500">{profile.full_name?.charAt(0) || "U"}</span>
                )}
              </div>
              
              <button 
                onClick={() => setShowAvatarMenu(!showAvatarMenu)}
                className="absolute bottom-1 right-1 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors z-10"
              >
                <Plus size={18} strokeWidth={3} />
              </button>

              {showAvatarMenu && (
                <div className="absolute top-full left-0 md:left-auto right-auto md:-right-4 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20">
                  <label className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors text-sm font-medium text-gray-700">
                    <ImageIcon size={16} className="text-blue-500" />
                    Set Profile Picture
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleAvatarUpload}
                    />
                  </label>
                  {profile.avatar && (
                    <button 
                      onClick={handleAvatarDelete}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 cursor-pointer transition-colors text-sm font-medium text-red-600"
                    >
                      <Trash2 size={16} />
                      Delete Profile Picture
                    </button>
                  )}
                </div>
              )}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{profile.full_name || "User"}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600">
                  <Mail size={16} />
                  <span>{profile.email || "No email"}</span>
                </div>
                {profile.city && (
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600">
                    <MapPin size={16} />
                    <span>{profile.city}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
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
              <h2 className="text-4xl font-bold text-gray-900">{stats?.total_orders || 0}</h2>
            </div>
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <Package size={32} strokeWidth={1.5} />
            </div>
          </a>

          <a href="/profile/wishlist" className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Wishlist</p>
              <h2 className="text-4xl font-bold text-gray-900">{stats?.total_wishlist || 0}</h2>
            </div>
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <Heart size={32} strokeWidth={1.5} />
            </div>
          </a>

          <a href="/profile/addresses" className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">Saved Addresses</p>
              <h2 className="text-4xl font-bold text-gray-900">{stats?.total_addresses || 0}</h2>
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
              <p className="text-lg font-medium text-gray-700">{profile.full_name || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Email</p>
              <p className="text-lg font-medium text-gray-700">{profile.email || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Phone</p>
              <p className="text-lg font-medium text-gray-700">{profile.phone || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-2">Member Since</p>
              <p className="text-lg font-medium text-gray-700">
                {profile.date_joined ? new Date(profile.date_joined).toLocaleDateString() : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
