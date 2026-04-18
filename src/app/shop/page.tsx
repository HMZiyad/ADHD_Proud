import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, Filter, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

const products = [
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
  {
    id: 5,
    name: "Powered By ADHD Unisex T-shirt",
    price: "$280.00",
    originalPrice: "$390.00",
    reviews: 29,
    image: "/assets/tshirt_blue.png",
  },
  {
    id: 6,
    name: "Hold On Let Me premium hat",
    price: "$280.00",
    originalPrice: "$390.00",
    reviews: 29,
    image: "/assets/tshirt_grey.png",
  },
  {
    id: 7,
    name: "Powered By ADHD Unisex T-shirt",
    price: "$280.00",
    originalPrice: "$390.00",
    reviews: 29,
    image: "/assets/hoodie_black.png",
  },
  {
    id: 8,
    name: "Hold On Let Me premium hat",
    price: "$280.00",
    originalPrice: "$390.00",
    reviews: 29,
    image: "/assets/cap_white.png",
  },
];

const StarRating = () => (
  <div className="flex gap-1 text-[#fbbf24] items-center">
    {'★★★★★'.split('').map((star, i) => (
      <span key={i} className="text-sm" style={{ letterSpacing: '-0.1em' }}>{star}</span>
    ))}
    <span className="text-[13px] text-gray-500 ml-1">(29 Reviews)</span>
  </div>
);

export default function Shop() {
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
          <div className="flex items-center gap-2">
            <button className="bg-[#3b82f6] text-white px-6 py-2 rounded-full text-sm font-medium">All Items</button>
            <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">T-Shirts</button>
            <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">Pants</button>
            <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">Hats</button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-12 mb-20">
          {products.map((product) => (
            <div key={product.id} className="group flex flex-col bg-white rounded-2xl p-3 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/60 hover:-translate-y-2 border border-transparent hover:border-gray-100">
              <a href={`/products/${product.id}`} className="aspect-[4/5] w-full bg-gray-50 rounded-xl relative mb-4 flex items-center justify-center p-6 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={400}
                  className="object-contain h-full w-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out"
                />
              </a>
              <div className="flex flex-col gap-1.5 px-1">
                <a href={`/products/${product.id}`} className="hover:text-blue-600 transition-colors">
                  <h3 className="font-medium text-black text-[15px] line-clamp-1">
                    {product.name}
                  </h3>
                </a>
                <StarRating />
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xl font-bold text-black">{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                </div>
                <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <a href={`/products/${product.id}`} className="flex-1 py-1.5 text-xs font-semibold rounded-full border border-gray-300 hover:border-black transition-colors text-center">
                    View Details
                  </a>
                  <button className="flex-1 py-2 text-sm font-bold rounded-md bg-[#3b82f6] text-white hover:bg-blue-600 transition-all shadow-sm active:scale-95">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mb-24">
          <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-sm bg-[#3b82f6] text-white font-medium text-sm">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-sm text-gray-600 hover:bg-gray-100 font-medium text-sm transition-colors cursor-pointer">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-sm text-gray-600 hover:bg-gray-100 font-medium text-sm transition-colors cursor-pointer">
            3
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
