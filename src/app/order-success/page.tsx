"use client";

import { useEffect, useState, Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    setOrderId(searchParams.get("order"));
  }, [searchParams]);

  return (
    <div className="w-full px-6 md:px-16 py-12 pt-28 flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
        <CheckCircle size={48} strokeWidth={2.5} />
      </div>
      
      <h1 className="text-5xl font-heading font-black text-gray-900 uppercase tracking-tight mb-4">
        Payment Successful!
      </h1>
      
      <p className="text-gray-500 max-w-md mx-auto text-lg mb-8">
        Thank you for your purchase. Your order has been placed successfully.
      </p>

      {orderId && (
        <div className="bg-gray-50 border border-gray-100 rounded-xl px-8 py-4 mb-12 shadow-sm inline-block">
          <p className="text-sm text-gray-500 mb-1">Order Reference</p>
          <p className="text-xl font-bold text-gray-900">{orderId}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Link 
          href="/profile/orders" 
          className="bg-blue-500 text-white font-bold px-8 py-3.5 rounded-full hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2"
        >
          <Package size={18} />
          View My Orders
        </Link>
        <Link 
          href="/shop" 
          className="bg-white border-2 border-gray-200 text-gray-700 font-bold px-8 py-3 rounded-full hover:border-gray-300 hover:bg-gray-50 transition-all flex items-center gap-2"
        >
          Continue Shopping <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <Navbar bg="bg-[#808080]" isLoggedIn={true} />
      
      <div className="flex-1 flex items-center justify-center">
        <Suspense fallback={<div className="py-32 text-center text-gray-400 font-medium">Loading...</div>}>
          <OrderSuccessContent />
        </Suspense>
      </div>

      <Footer />
    </main>
  );
}
