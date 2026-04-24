"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ChevronLeft, Search, Package, CheckCircle, Truck, Clock, Loader2 } from "lucide-react";
import { orderService } from "@/services/order.service";

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async () => {
    if (!trackingNumber.trim()) return;
    try {
      setLoading(true);
      setError("");
      setOrderStatus(null);
      const data = await orderService.trackOrder(trackingNumber);
      setOrderStatus(data);
    } catch (err) {
      console.error("Failed to track order", err);
      setError("Order not found or invalid tracking number.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50/30">
      <Navbar bg="bg-[#808080]" isLoggedIn={true} />
      
      <div className="max-w-6xl mx-auto px-8 py-12 pt-28">
        <a href="/profile/orders" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-12 group w-fit">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Orders
        </a>

        <div className="max-w-4xl mx-auto space-y-10 mb-24 min-h-[400px]">
          <div className="text-center space-y-4">
            <h1 className="text-5xl font-heading font-black text-gray-900 uppercase italic tracking-tighter">
              TRACK YOUR ORDER
            </h1>
            <p className="text-gray-500 text-sm">
              Enter your tracking number to see the latest update on your order.
            </p>
          </div>

          {/* Search Box */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                placeholder="Search tracking id"
                className="w-full bg-white border border-gray-100 shadow-sm rounded-lg py-4 pl-12 pr-4 outline-none focus:border-blue-500 transition-colors text-sm"
              />
            </div>
            <button 
              onClick={handleTrack}
              disabled={loading}
              className="bg-blue-600 text-white font-bold px-10 py-4 rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-50 disabled:opacity-50 flex items-center justify-center min-w-[160px]"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Track Order"}
            </button>
          </div>

          {error && (
            <div className="text-center text-red-500 font-medium py-4">
              {error}
            </div>
          )}

          {/* Current Status Card */}
          {orderStatus && (
            <>
              <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg ${orderStatus.status === 'delivered' ? 'bg-green-500 shadow-green-100' : 'bg-blue-600 shadow-blue-100'}`}>
                    <Package size={32} />
                  </div>
                  <div className="space-y-1 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-gray-900">Order Status</h2>
                    <div className="text-sm font-medium text-gray-500">
                      Tracking #: <span className="text-gray-900">{orderStatus.tracking_number}</span>
                    </div>
                    <div className="text-xs font-semibold text-gray-400 mt-2 uppercase tracking-wide">
                      Last Updated: <span className="text-gray-900">{new Date(orderStatus.updated_at || orderStatus.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className={`${orderStatus.status === 'delivered' ? 'bg-green-500 shadow-green-100' : 'bg-blue-500 shadow-blue-100'} text-white px-8 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-md`}>
                  {orderStatus.status}
                </div>
              </div>

              {/* Tracking History Timeline */}
              <div className="bg-white border border-gray-100 rounded-2xl p-10 md:p-12 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 mb-10">Tracking History</h3>
                
                <div className="relative pl-10 space-y-12">
                  {/* Vertical line connecting the steps */}
                  <div className="absolute left-[3px] top-4 bottom-4 w-[2px] bg-blue-100"></div>

                  {/* Steps */}
                  <div className="relative">
                    {/* Dot */}
                    <div className={`absolute -left-[10px] top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-sm ring-1 ring-gray-100 bg-blue-500`}>
                    </div>
                    
                    <div className="space-y-1 text-gray-900">
                      <h4 className="font-bold text-[17px] capitalize">Status: {orderStatus.status}</h4>
                      <p className="text-sm font-medium">System Update</p>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                        {new Date(orderStatus.updated_at || orderStatus.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute -left-[10px] top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-sm ring-1 ring-gray-100 bg-gray-300">
                    </div>
                    
                    <div className="space-y-1 text-gray-400">
                      <h4 className="font-bold text-[17px] capitalize">Order Placed</h4>
                      <p className="text-sm font-medium">Checkout Completed</p>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                        {new Date(orderStatus.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Help Section */}
          <div className="bg-gray-100/50 rounded-2xl p-10 flex flex-col items-center text-center gap-4 mt-12">
            <h3 className="text-2xl font-bold text-gray-800">Need Help?</h3>
            <p className="text-sm text-gray-500 max-w-[400px]">
              If you have any questions about your order, please contact our support team.
            </p>
            <a href="mailto:support@adhdproud.com" className="text-blue-600 font-bold hover:underline">
              support@adhdproud.com
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
