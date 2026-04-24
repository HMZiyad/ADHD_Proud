"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, Filter, Sparkles, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { shopService } from "@/services/shop.service";

const StarRating = ({ rating, count }: { rating: number, count: number }) => (
  <div className="flex gap-1 text-[#fbbf24] items-center">
    {'★★★★★'.split('').map((star, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-[#fbbf24]' : 'text-gray-300'}`} style={{ letterSpacing: '-0.1em' }}>★</span>
    ))}
    <span className="text-[13px] text-gray-500 ml-1">({count} Reviews)</span>
  </div>
);

export default function Shop() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, activeCategory]);

  const fetchInitialData = async () => {
    try {
      const cats = await shopService.getCategories();
      setCategories(cats);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (searchTerm) params.search = searchTerm;
      if (activeCategory) params.category = activeCategory;
      
      const data = await shopService.getProducts(params);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar bg="bg-[#808080]" />

      <div className="w-full px-6 md:px-16 py-16 pt-28">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-heading text-5xl font-bold uppercase tracking-wide text-black mb-2">
            SHOP COLLECTION
          </h1>
          <p className="text-gray-800 text-[15px] mb-12">
            Streetwear made for neurodivergent minds.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 w-full">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <button 
              onClick={() => setActiveCategory(null)}
              className={`${!activeCategory ? 'bg-[#3b82f6] text-white' : 'border border-gray-300 text-gray-700 hover:border-gray-400'} px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap`}
            >
              All Items
            </button>
            {categories.map((cat) => (
              <button 
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`${activeCategory === cat.slug ? 'bg-[#3b82f6] text-white' : 'border border-gray-300 text-gray-700 hover:border-gray-400'} px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Item"
                className="border border-gray-300 rounded-full pl-10 pr-4 py-2 text-sm w-full md:w-[280px] focus:outline-none focus:border-[#3b82f6]"
              />
            </div>
            <button className="border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4 text-gray-500" strokeWidth={2} />
            </button>
            <button className="bg-[#2454a8] text-white px-6 py-2 rounded-full text-sm font-medium flex items-center gap-2 ml-4">
              <Sparkles className="w-4 h-4" /> AI Suggestion
            </button>
          </div>
        </div>

        {loading && products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#3b82f6] animate-spin mb-4" />
            <p className="text-gray-500">Loading collection...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-xl text-gray-400 mb-2 font-medium">No products found</p>
            <p className="text-gray-500 text-sm">Try adjusting your search or category filters</p>
            <button 
              onClick={() => {setSearchTerm(""); setActiveCategory(null);}}
              className="mt-6 text-blue-500 hover:underline font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-12 mb-20">
            {products.map((product) => (
              <div key={product.id} className="group flex flex-col bg-white rounded-2xl p-3 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/60 hover:-translate-y-2 border border-transparent hover:border-gray-100">
                <Link href={`/products/${product.slug}`} className="aspect-[4/5] w-full bg-gray-50 rounded-xl relative mb-4 flex items-center justify-center p-6 overflow-hidden">
                  <Image
                    src={product.primary_image || "/assets/placeholder.png"}
                    alt={product.name}
                    fill
                    className="object-contain p-6 mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                </Link>
                <div className="flex flex-col gap-1.5 px-1">
                  <Link href={`/products/${product.slug}`} className="hover:text-blue-600 transition-colors">
                    <h3 className="font-medium text-black text-[15px] line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <StarRating rating={product.average_rating} count={product.review_count} />
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl font-bold text-black">${product.price}</span>
                    {product.old_price && (
                      <span className="text-sm text-gray-400 line-through">${product.old_price}</span>
                    )}
                  </div>
                  <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Link href={`/products/${product.slug}`} className="flex-1 py-1.5 text-xs font-semibold rounded-full border border-gray-300 hover:border-black transition-colors text-center flex items-center justify-center">
                      View Details
                    </Link>
                    <button className="flex-1 py-2 text-sm font-bold rounded-md bg-[#3b82f6] text-white hover:bg-blue-600 transition-all shadow-sm active:scale-95">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-center gap-2 mb-24">
          <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-sm bg-[#3b82f6] text-white font-medium text-sm">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}

