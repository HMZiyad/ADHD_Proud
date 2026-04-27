"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Search, Filter, Sparkles, ChevronLeft, ChevronRight, Loader2, X, Send, Bot, ArrowRight } from "lucide-react";
import { shopService } from "@/services/shop.service";

/* ─── Star Rating ─────────────────────────────────────────────────────────── */
const StarRating = ({ rating, count }: { rating: number; count: number }) => (
  <div className="flex gap-1 text-[#fbbf24] items-center">
    {[0, 1, 2, 3, 4].map((i) => (
      <span
        key={i}
        className={`text-sm ${i < Math.floor(rating) ? "text-[#fbbf24]" : "text-gray-300"}`}
        style={{ letterSpacing: "-0.1em" }}
      >
        ★
      </span>
    ))}
    <span className="text-[13px] text-gray-500 ml-1">({count} Reviews)</span>
  </div>
);

/* ─── Product Card (shared between grid & AI results) ─────────────────────── */
const ProductCard = ({ product, compact = false }: { product: any; compact?: boolean }) => (
  <div className={`group flex flex-col bg-white rounded-2xl ${compact ? "p-2" : "p-3"} transition-all duration-300 hover:shadow-2xl hover:shadow-gray-200/60 hover:-translate-y-1 border border-transparent hover:border-gray-100`}>
    <Link
      href={`/products/${product.slug}`}
      className={`${compact ? "aspect-square" : "aspect-[4/5]"} w-full bg-gray-50 rounded-xl relative mb-3 flex items-center justify-center overflow-hidden`}
    >
      <Image
        src={product.primary_image || "/assets/placeholder.png"}
        alt={product.name}
        fill
        className="object-contain p-4 mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out"
      />
    </Link>
    <div className="flex flex-col gap-1 px-1">
      <Link href={`/products/${product.slug}`} className="hover:text-blue-600 transition-colors">
        <h3 className={`font-medium text-black ${compact ? "text-[13px]" : "text-[15px]"} line-clamp-1`}>
          {product.name}
        </h3>
      </Link>
      <StarRating rating={product.average_rating} count={product.review_count} />
      <div className="flex items-center gap-2 mt-1">
        <span className={`font-bold text-black ${compact ? "text-base" : "text-xl"}`}>${product.price}</span>
        {product.old_price && (
          <span className={`text-gray-400 line-through ${compact ? "text-xs" : "text-sm"}`}>${product.old_price}</span>
        )}
      </div>
      {!compact && (
        <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 py-1.5 text-xs font-semibold rounded-full border border-gray-300 hover:border-black transition-colors text-center flex items-center justify-center"
          >
            View Details
          </Link>
          <button className="flex-1 py-2 text-sm font-bold rounded-md bg-[#3b82f6] text-white hover:bg-blue-600 transition-all shadow-sm active:scale-95">
            Add to Cart
          </button>
        </div>
      )}
    </div>
  </div>
);

/* ─── Animated Orb ────────────────────────────────────────────────────────── */
const Orb = ({ className }: { className: string }) => (
  <div className={`absolute rounded-full blur-3xl opacity-20 animate-pulse pointer-events-none ${className}`} />
);

/* ─── AI Panel ────────────────────────────────────────────────────────────── */
function AISuggestionPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [aiProducts, setAiProducts] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typewriterRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Typewriter effect */
  useEffect(() => {
    if (!aiMessage) return;
    setDisplayedMessage("");
    let i = 0;
    if (typewriterRef.current) clearInterval(typewriterRef.current);
    typewriterRef.current = setInterval(() => {
      setDisplayedMessage(aiMessage.slice(0, i + 1));
      i++;
      if (i >= aiMessage.length) clearInterval(typewriterRef.current!);
    }, 18);
    return () => { if (typewriterRef.current) clearInterval(typewriterRef.current); };
  }, [aiMessage]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim() || loading) return;
    setLoading(true);
    setHasSearched(true);
    setAiMessage("");
    setDisplayedMessage("");
    setAiProducts([]);
    try {
      const data = await shopService.aiSuggest(query.trim());
      setAiMessage(data.message || "");
      setAiProducts(data.products || []);
    } catch (err) {
      setAiMessage("Sorry, I couldn't connect to the AI right now. Please try again shortly.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const SUGGESTIONS = [
    "Casual summer beach outfit under $60",
    "Minimal streetwear for a date night",
    "Cozy winter layers for cold weather",
    "Bold graphic tees for festivals",
  ];

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Blurred backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div
        className="relative w-full md:max-w-2xl max-h-[92vh] md:max-h-[85vh] flex flex-col rounded-t-3xl md:rounded-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(15,15,30,0.97) 0%, rgba(10,10,25,0.99) 100%)",
          border: "1px solid rgba(99,102,241,0.25)",
          boxShadow: "0 0 80px rgba(99,102,241,0.15), 0 40px 120px rgba(0,0,0,0.6)",
        }}
      >
        {/* Animated background orbs */}
        <Orb className="w-80 h-80 bg-indigo-500 -top-20 -left-20" />
        <Orb className="w-64 h-64 bg-violet-600 top-10 -right-10" />
        <Orb className="w-48 h-48 bg-blue-500 bottom-10 left-1/4" />

        {/* Grid overlay texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Header */}
        <div className="relative flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            {/* Pulsing AI badge */}
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-indigo-500/30 animate-ping" />
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
              >
                <Bot size={18} className="text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">AI Style Assistant</h2>
              <p className="text-indigo-300/70 text-xs">Powered by Gemini</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content scroll area */}
        <div className="relative flex-1 overflow-y-auto px-6 py-5 space-y-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">

          {/* Intro / Quick Suggestions (shown before first search) */}
          {!hasSearched && (
            <div className="space-y-4">
              <p className="text-white/60 text-sm leading-relaxed">
                Describe what you're looking for — occasion, style, budget, vibe — and I'll match you with the perfect items from our collection.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="text-left px-4 py-3 rounded-xl text-sm text-indigo-200/80 transition-all duration-200 hover:text-white group"
                    style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)" }}
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles size={13} className="text-indigo-400 shrink-0 group-hover:text-violet-300 transition-colors" />
                      {s}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading shimmer */}
          {loading && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                  <Bot size={14} className="text-white" />
                </div>
                <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-tl-sm" style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.15)" }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
              {/* Skeleton cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-2xl overflow-hidden animate-pulse" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div className="aspect-square bg-white/5" />
                    <div className="p-3 space-y-2">
                      <div className="h-3 bg-white/10 rounded w-3/4" />
                      <div className="h-3 bg-white/10 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Response */}
          {!loading && hasSearched && (
            <div className="space-y-5">
              {/* Message bubble */}
              {displayedMessage && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
                    <Bot size={14} className="text-white" />
                  </div>
                  <div
                    className="flex-1 px-4 py-3 rounded-2xl rounded-tl-sm text-sm text-white/85 leading-relaxed"
                    style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.18)" }}
                  >
                    {displayedMessage}
                    {displayedMessage.length < aiMessage.length && (
                      <span className="inline-block w-0.5 h-4 bg-indigo-400 ml-0.5 animate-pulse align-middle" />
                    )}
                  </div>
                </div>
              )}

              {/* Product results */}
              {aiProducts.length > 0 ? (
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-widest mb-3 font-medium">Suggested for you</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {aiProducts.map((product) => (
                      <div
                        key={product.id}
                        className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                      >
                        <Link href={`/products/${product.slug}`} className="block relative aspect-square overflow-hidden bg-white/5">
                          <Image
                            src={product.primary_image || "/assets/placeholder.png"}
                            alt={product.name}
                            fill
                            className="object-contain p-3 hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                        <div className="p-3 space-y-1">
                          <Link href={`/products/${product.slug}`}>
                            <h4 className="text-white/90 text-xs font-semibold line-clamp-1 hover:text-indigo-300 transition-colors">{product.name}</h4>
                          </Link>
                          <p className="text-indigo-300 font-bold text-sm">${product.price}</p>
                          <Link
                            href={`/products/${product.slug}`}
                            className="flex items-center gap-1 text-[11px] text-indigo-400/80 hover:text-indigo-300 transition-colors mt-1.5"
                          >
                            View item <ArrowRight size={11} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                !loading && hasSearched && aiMessage && (
                  <p className="text-white/40 text-sm text-center py-4">No matching products found in our current collection.</p>
                )
              )}

              {/* Search again nudge */}
              <button
                onClick={() => { setHasSearched(false); setQuery(""); setAiMessage(""); setAiProducts([]); }}
                className="text-xs text-indigo-400/60 hover:text-indigo-300 transition-colors underline underline-offset-2"
              >
                Start a new search
              </button>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="relative px-5 pb-5 pt-3 border-t border-white/5">
          <form onSubmit={handleSubmit} className="relative flex items-end gap-3">
            <div
              className="flex-1 rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(99,102,241,0.3)",
                boxShadow: "0 0 20px rgba(99,102,241,0.05) inset",
              }}
            >
              <textarea
                ref={textareaRef}
                rows={2}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. casual summer outfit under $80..."
                className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-white/25 resize-none focus:outline-none leading-relaxed"
                style={{ maxHeight: "120px" }}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-200 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
            >
              {loading ? <Loader2 size={18} className="text-white animate-spin" /> : <Send size={16} className="text-white" />}
            </button>
          </form>
          <p className="text-white/20 text-[11px] mt-2 text-center">Press Enter to send · Shift+Enter for new line</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Shop Page ──────────────────────────────────────────────────────── */
export default function Shop() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showAI, setShowAI] = useState(false);

  useEffect(() => { fetchInitialData(); }, []);

  useEffect(() => {
    const delay = setTimeout(() => fetchProducts(), 500);
    return () => clearTimeout(delay);
  }, [searchTerm, activeCategory]);

  const fetchInitialData = async () => {
    try {
      const cats = await shopService.getCategories();
      setCategories(cats);
    } catch (error) {
      console.error("Error fetching categories:", error);
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
    <>
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

          {/* Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 w-full">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              <button
                onClick={() => setActiveCategory(null)}
                className={`${!activeCategory ? "bg-[#3b82f6] text-white" : "border border-gray-300 text-gray-700 hover:border-gray-400"} px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap`}
              >
                All Items
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`${activeCategory === cat.slug ? "bg-[#3b82f6] text-white" : "border border-gray-300 text-gray-700 hover:border-gray-400"} px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap`}
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

              {/* AI Button */}
              <button
                onClick={() => setShowAI(true)}
                className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ml-2 transition-all hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-105 active:scale-95 group"
              >
                {/* Shimmer sweep */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <Sparkles className="w-4 h-4" />
                AI Suggestion
              </button>
            </div>
          </div>

          {/* Product Grid */}
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
                onClick={() => { setSearchTerm(""); setActiveCategory(null); }}
                className="mt-6 text-blue-500 hover:underline font-medium"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-12 mb-20">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
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

      {/* AI Suggestion Panel (portal-style overlay) */}
      {showAI && <AISuggestionPanel onClose={() => setShowAI(false)} />}
    </>
  );
}
