"use client";

import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ChevronLeft, Star, Trash2, ShoppingCart } from "lucide-react";

const wishlistItems = [
  {
    id: 1,
    name: "Powered By ADHD Unisex T-shirt",
    price: "$280.00",
    originalPrice: "$390.00",
    image: "/assets/tshirt_blue.png",
  },
  {
    id: 2,
    name: "Hold On Let Me premium hat",
    price: "$280.00",
    originalPrice: "$390.00",
    image: "/assets/cap_white.png",
  },
  {
    id: 3,
    name: "Dopamine Rush Hoodie",
    price: "$280.00",
    originalPrice: "$390.00",
    image: "/assets/hoodie_black.png",
  },
  {
    id: 4,
    name: "ADHD Proud Graphic T-Shirt",
    price: "$280.00",
    originalPrice: "$390.00",
    image: "/assets/tshirt_grey.png",
  },
];

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar bg="bg-[#808080]" isLoggedIn={true} />
      
      <div className="w-full px-6 md:px-16 py-12 pt-28">
        <a href="/profile" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-12 group w-fit">
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Profile
        </a>

        <div className="mb-16">
          <h1 className="text-6xl font-heading font-black text-gray-900 uppercase tracking-tighter mb-4">
            MY WISHLIST
          </h1>
          <p className="text-gray-500 font-medium">Keep track of the pieces you love.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {wishlistItems.map((product) => (
            <div key={product.id} className="flex flex-col group">
              <div className="relative aspect-square w-full bg-[#f8f9fb] rounded-xl overflow-hidden mb-6 flex items-center justify-center p-10 transition-all hover:bg-gray-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={220}
                  height={220}
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 shadow-sm transition-all opacity-0 group-hover:opacity-100">
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="flex flex-col gap-2 px-1">
                <h3 className="font-bold text-gray-900 line-clamp-1 text-[15px]">
                  {product.name}
                </h3>
                <div className="flex text-orange-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                  <span className="text-gray-400 text-xs ml-2 font-medium">(29 reviews)</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-900">{product.price}</span>
                  <span className="text-sm text-gray-300 line-through font-medium">{product.originalPrice}</span>
                </div>
                <button className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white font-bold py-3 mt-4 rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-50 text-xs uppercase tracking-widest">
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
