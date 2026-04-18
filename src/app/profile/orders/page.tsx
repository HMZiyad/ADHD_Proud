"use client";

import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ChevronLeft, Package, Clock, CheckCircle } from "lucide-react";

const orders = [
  {
    id: "ORD-2026-001234",
    date: "April 10, 2026",
    status: "Delivered",
    tracking: "USP59485511899223456789012",
    total: "$65.00",
    items: [
      {
        name: "Hyperfocus Hoodie",
        specs: "Size: M • Color: Purple • Qty: 1",
        price: "$65.00",
        image: "/assets/hoodie_black.png",
      }
    ]
  },
  {
    id: "ORD-2026-001198",
    date: "March 28, 2026",
    status: "In-transit",
    tracking: "USP59485511899223456789012",
    total: "$70.00",
    items: [
      {
        name: "Dopamine Rush T-shirt",
        specs: "Size: L • Color: White • Qty: 2",
        price: "$65.00",
        image: "/assets/tshirt_grey.png",
      }
    ]
  },
  {
    id: "ORD-2026-001087",
    date: "March 15, 2026",
    status: "Delivered",
    tracking: "USP59485511899223456789013",
    total: "$70.00",
    items: [
      {
        name: "ADHD Awareness Cap",
        specs: "Size: One size • Color: White • Qty: 1",
        price: "$28.00",
        image: "/assets/cap_white.png",
      },
      {
        name: "ADHD T-shirt",
        specs: "Size: M • Color: White • Qty: 1",
        price: "$42.00",
        image: "/assets/tshirt_blue.png",
      }
    ]
  }
];

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar bg="bg-[#808080]" isLoggedIn={true} />
      
      <div className="w-full px-6 md:px-16 py-12 pt-28">
        <a href="/profile" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-12 group w-fit">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Profile
        </a>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-12 shadow-sm mb-24">
          <h1 className="text-3xl font-bold text-gray-900 mb-12">Order History</h1>
          
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.id} className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Order Header */}
                <div className="bg-gray-50/50 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-bold text-gray-900">Order {order.id}</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock size={14} />
                      {order.date}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-2 uppercase tracking-wider
                      ${order.status === 'Delivered' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                      <CheckCircle size={14} />
                      {order.status}
                    </span>
                    <a href="/profile/track" className="bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-2 rounded text-xs font-bold transition-all uppercase tracking-widest">
                      Track Order
                    </a>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6 space-y-6">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex gap-6 pb-6 border-b border-gray-50 last:border-0 last:pb-0">
                      <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-2">
                        <Image src={item.image} alt={item.name} width={60} height={60} className="object-contain" />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-gray-800">{item.name}</h4>
                          <span className="font-bold text-gray-900">{item.price}</span>
                        </div>
                        <p className="text-xs text-gray-400">{item.specs}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="bg-white px-6 py-4 flex flex-col md:flex-row md:items-center justify-between border-t border-gray-100 text-sm">
                  <div className="text-gray-400">
                    Tracking: <span className="font-medium text-gray-600">{order.tracking}</span>
                  </div>
                  <div className="font-bold text-gray-900 mt-2 md:mt-0">
                    Total: <span className="text-xl">{order.total}</span>
                  </div>
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
