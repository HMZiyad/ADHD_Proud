"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ChevronLeft, Star, Trash2, ShoppingCart, Loader2 } from "lucide-react";
import { profileService } from "@/services/profile.service";

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const data = await profileService.getWishlist();
      setWishlistItems(data);
    } catch (error) {
      console.error("Failed to fetch wishlist", error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: number) => {
    try {
      await profileService.removeFromWishlist(productId);
      fetchWishlist();
    } catch (error) {
      console.error("Failed to remove from wishlist", error);
    }
  };

  const addToCart = async (productId: number) => {
    try {
      await profileService.addToCart({
        product_id: productId,
        quantity: 1
      });
      alert("Added to cart!");
    } catch (error) {
      console.error("Failed to add to cart", error);
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

        <div className="mb-16">
          <h1 className="text-6xl font-heading font-black text-gray-900 uppercase tracking-tighter mb-4">
            MY WISHLIST
          </h1>
          <p className="text-gray-500 font-medium">Keep track of the pieces you love.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="text-center py-20 text-gray-500 font-medium min-h-[300px]">
            Your wishlist is empty.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {wishlistItems.map((item) => (
              <div key={item.id} className="flex flex-col group">
                <div className="relative aspect-square w-full bg-[#f8f9fb] rounded-xl overflow-hidden mb-6 flex items-center justify-center p-10 transition-all hover:bg-gray-100">
                  <Image
                    src={item.product?.primary_image || "/assets/placeholder.png"}
                    alt={item.product?.name || "Product"}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <button 
                    onClick={() => removeFromWishlist(item.product?.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 shadow-sm transition-all opacity-0 group-hover:opacity-100 z-10"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex flex-col gap-2 px-1">
                  <h3 className="font-bold text-gray-900 line-clamp-1 text-[15px]">
                    {item.product?.name}
                  </h3>
                  <div className="flex text-orange-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < (item.product?.average_rating || 5) ? "currentColor" : "none"} />
                    ))}
                    <span className="text-gray-400 text-xs ml-2 font-medium">({item.product?.review_count || 0} reviews)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-900">${item.product?.price}</span>
                    {item.product?.old_price && (
                      <span className="text-sm text-gray-300 line-through font-medium">${item.product?.old_price}</span>
                    )}
                  </div>
                  <button 
                    onClick={() => addToCart(item.product?.id)}
                    className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white font-bold py-3 mt-4 rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-50 text-xs uppercase tracking-widest"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
