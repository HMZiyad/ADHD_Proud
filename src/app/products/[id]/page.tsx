"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Plus, Minus, ThumbsUp, ThumbsDown, ArrowRight, ChevronRight } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

// Similar products data
const similarProducts = [
  {
    id: 1,
    name: "Powered By ADHD Unisex T-shirt",
    price: "$280.00",
    originalPrice: "$390.00",
    reviews: 29,
    image: "/assets/tshirt_blue.png",
  },
  {
    id: 2,
    name: "Hold On Let Me premium hat",
    price: "$280.00",
    originalPrice: "$390.00",
    reviews: 29,
    image: "/assets/tshirt_grey.png",
  },
  {
    id: 3,
    name: "Powered By ADHD Unisex T-shirt",
    price: "$280.00",
    originalPrice: "$390.00",
    reviews: 29,
    image: "/assets/tshirt_grey.png",
  },
  {
    id: 4,
    name: "Hold On Let Me premium hat",
    price: "$280.00",
    originalPrice: "$390.00",
    reviews: 29,
    image: "/assets/cap_white.png",
  },
];

const reviews = [
  {
    id: 1,
    user: "William Davis",
    rating: 5,
    text: "Absolutely love this T-shirt! The fabric is soft and premium, and it fits perfectly. I wear it everywhere, great quality for the price!",
    avatar: "/assets/community.png", // Using existing as placeholder
  },
  {
    id: 2,
    user: "Lucas Kie",
    rating: 5,
    text: "Excellent craftsmanship! Fabric quality is really good. Perfect for daily wear. It looks even better in person.",
    avatar: "/assets/hero.png", // Using existing as placeholder
  },
  {
    id: 3,
    user: "Lian Jual",
    rating: 5,
    text: "Great value for money. The shirt is warm and feels sturdy... definitely worth every cent! It fits well.",
    avatar: "/assets/community.png", // Using existing as placeholder
  },
];

const StarRating = ({ rating, count }: { rating: number, count?: number }) => (
  <div className="flex items-center gap-1">
    <div className="flex text-orange-400">
      {[...Array(5)].map((_, i) => (
        <Star key={i} size={16} fill={i < rating ? "currentColor" : "none"} />
      ))}
    </div>
    {count !== undefined && <span className="text-gray-400 text-sm ml-2">({count} Reviews)</span>}
    {count === undefined && rating > 0 && <span className="text-gray-900 font-bold ml-1">{rating.toFixed(1)}</span>}
  </div>
);

export default function ProductPage() {
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("XS");
  const [selectedColor, setSelectedColor] = useState("navy");

  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = [
    { name: "navy", class: "bg-[#1e293b]" },
    { name: "beige", class: "bg-[#d4c3b3]" },
    { name: "black", class: "bg-black" },
    { name: "purple", class: "bg-[#6b21a8]" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar bg="bg-[#808080]" />

      <div className="w-full px-6 md:px-16 py-8 pt-28">
        {/* Breadcrumbs */}
        <nav className="flex text-xs text-gray-500 mb-8 items-center gap-2">
          <span>Categories</span>
          <ChevronRight size={12} />
          <span>Men</span>
          <ChevronRight size={12} />
          <span className="text-gray-900">T-Shirt</span>
        </nav>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Gallery - Left */}
          <div className="md:col-span-6">
            <div className="bg-[#f8f9fb] rounded-lg aspect-square relative mb-6 overflow-hidden flex items-center justify-center p-12">
              <Image 
                src="/assets/tshirt_blue.png" 
                alt="Product Image" 
                width={500} 
                height={500} 
                className="object-contain"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#f8f9fb] rounded-lg aspect-square relative cursor-pointer hover:border-gray-300 border-2 border-transparent transition-all flex items-center justify-center p-4">
                  <Image 
                    src="/assets/tshirt_blue.png" 
                    alt={`Thumbnail ${i}`} 
                    width={150} 
                    height={150} 
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info - Right */}
          <div className="md:col-span-6">
            <div className="mb-2">
              <span className="text-xs text-gray-400 font-medium">In Stock</span>
            </div>
            <h1 className="text-4xl font-heading font-black tracking-tight text-gray-900 mb-2 uppercase">
              URBAN CLASSIC PREMIUM COTTON T-SHIRT
            </h1>
            <p className="text-sm text-gray-500 mb-6 italic">Drop Shoulder T-shirt</p>
            
            <p className="text-gray-600 text-[15px] mb-8 leading-relaxed max-w-xl">
              A stylish Drop Shoulder T-shirt designed to elevate your look with a modern fit and cool, confident feel.
            </p>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-bold font-heading text-gray-900">$280.00</span>
              <span className="text-lg text-gray-400 line-through font-heading">$390.00</span>
            </div>

            <div className="mb-10">
              <StarRating rating={5.0} count={245} />
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Available Size</h3>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-10 flex items-center justify-center text-xs font-bold rounded transition-all border-2 
                      ${selectedSize === size ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100" : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-10">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Colors</h3>
              <div className="flex gap-4">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all p-0.5
                      ${selectedColor === color.name ? "border-blue-600" : "border-transparent"}`}
                  >
                    <div className={`w-full h-full rounded-full ${color.class}`}></div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-4">Quantity</h3>
                <div className="flex items-center w-fit border-2 border-gray-100 rounded-lg h-12 overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-full flex items-center justify-center text-gray-400 hover:bg-gray-50 border-r-2 border-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-14 h-full flex items-center justify-center font-bold text-gray-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-full flex items-center justify-center text-gray-400 hover:bg-gray-50 border-l-2 border-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <button className="bg-blue-600 text-white font-bold py-4 px-8 rounded-md hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 w-full md:w-fit min-w-[280px]">
                Add to cart
              </button>

              <p className="text-gray-900 italic font-medium">Limited stock available — grab yours now</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-12">
          <div className="flex justify-center border-b border-gray-100">
            <button
              onClick={() => setActiveTab("details")}
              className={`pb-4 px-8 text-sm font-medium transition-all relative
                ${activeTab === "details" ? "text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
            >
              Product Details
              {activeTab === "details" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />}
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`pb-4 px-8 text-sm font-medium transition-all relative
                ${activeTab === "reviews" ? "text-blue-600 space-x-2" : "text-gray-400 hover:text-gray-600"}`}
            >
              Review and Ratings
              {activeTab === "reviews" && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-32">
          {activeTab === "details" ? (
            <div className="w-full">
              <h2 className="text-4xl font-heading font-black mb-8 text-gray-900 uppercase">Description</h2>
              <div className="text-gray-600 space-y-6 text-[15px] leading-relaxed mb-12">
                <p>
                  Step into your bold side with the Urban Classic Premium Cotton T-Shirt — designed for those who think differently and express it fearlessly. This piece blends everyday comfort with standout design, making it perfect for creative minds and streetwear lovers.
                </p>
                <p>
                  Whether you&apos;re out with friends or deep in your own creative zone, this t-shirt keeps you comfortable while letting your style speak loud and clear.
                </p>
              </div>

              <div className="mb-12">
                <h3 className="font-bold text-gray-900 mb-6">Why You&apos;ll Love It</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-3 text-[15px]">
                  <li>Soft, breathable premium cotton for all-day comfort</li>
                  <li>Relaxed fit for a modern streetwear look</li>
                  <li>Eye-catching graphic design that stands out</li>
                  <li>Durable print that won&apos;t fade easily</li>
                  <li>Perfect for casual wear, hangouts, or creative sessions</li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-6">Product Details</h3>
                <ul className="text-gray-600 space-y-3 text-[15px]">
                  <li><span className="font-medium text-gray-900">Fabric:</span> 100% Premium Cotton</li>
                  <li><span className="font-medium text-gray-900">Fit:</span> Regular / Relaxed Fit</li>
                  <li><span className="font-medium text-gray-900">Neck:</span> Round Neck</li>
                  <li><span className="font-medium text-gray-900">Sleeve:</span> Short Sleeve</li>
                  <li><span className="font-medium text-gray-900">Print Type:</span> High-quality graphic print</li>
                  <li><span className="font-medium text-gray-900">Gender:</span> Unisex</li>
                  <li><span className="font-medium text-gray-900">Season:</span> All-season wear</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-4xl font-heading font-black text-gray-900 uppercase">Reviews</h2>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-gray-500">Sort by</span>
                  <select className="border-none bg-transparent font-bold text-gray-900 outline-none cursor-pointer">
                    <option>Newest</option>
                    <option>Top Rated</option>
                  </select>
                </div>
              </div>

              <div className="space-y-10">
                {reviews.map((review) => (
                  <div key={review.id} className="flex gap-6 border-b border-gray-100 pb-10 last:border-0">
                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 relative">
                      <Image 
                        src={review.avatar} 
                        alt={review.user} 
                        fill 
                        className="object-cover" 
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">{review.user}</h4>
                      <div className="mb-4">
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-gray-500 text-[15px] leading-relaxed mb-4 max-w-2xl">
                        {review.text}
                      </p>
                      <div className="flex items-center gap-6">
                        <button className="text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors uppercase tracking-widest">Reply</button>
                        <div className="flex items-center gap-4 text-gray-400">
                          <button className="hover:text-blue-600 transition-colors"><ThumbsUp size={16} /></button>
                          <button className="hover:text-red-600 transition-colors"><ThumbsDown size={16} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Similar Products */}
        <div className="mb-32">
          <h2 className="text-5xl font-heading font-black text-gray-900 uppercase text-center mb-16">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {similarProducts.map((product) => (
              <div key={product.id} className="flex flex-col group">
                <a href={`/products/${product.id}`} className="relative aspect-square w-full bg-[#f8f9fb] rounded-lg overflow-hidden mb-6 flex items-center justify-center p-10 transition-all group-hover:bg-[#f1f3f7]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={220}
                    height={220}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </a>
                <div className="flex flex-col gap-2">
                  <a href={`/products/${product.id}`} className="hover:text-blue-600 transition-colors">
                    <h3 className="font-bold text-gray-900 line-clamp-1 text-[15px]">
                      {product.name}
                    </h3>
                  </a>
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
                  <div className="flex gap-3 mt-4 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                    <button className="flex-1 py-2 text-xs font-bold rounded border border-gray-200 hover:border-gray-900 transition-all uppercase tracking-widest">
                      Add to Cart
                    </button>
                    <button className="flex-1 py-2 text-xs font-bold rounded bg-blue-600 text-white hover:bg-blue-700 transition-all uppercase tracking-widest shadow-md shadow-blue-50">
                      Buy Now
                    </button>
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
