"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Star, Plus, Minus, ThumbsUp, ThumbsDown, ArrowRight, ChevronRight, Loader2, Check, ShoppingBag, X } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { shopService } from "@/services/shop.service";
import { profileService } from "@/services/profile.service";

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
  const params = useParams();
  const slug = params.id as string;

  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  
  const [addingToCart, setAddingToCart] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchProductData();
    }
  }, [slug]);

  const fetchProductData = async () => {
    try {
      setLoading(true);
      const data = await shopService.getProductBySlug(slug);
      setProduct(data);
      if (data) {
        setActiveImage(data.primary_image);
        // Set defaults
        if (data.sizes?.length > 0) setSelectedSize(data.sizes[0].size);
        if (data.colors?.length > 0) setSelectedColor(data.colors[0].color_hex);
        
        // Fetch reviews
        const reviewData = await shopService.getProductReviews(slug);
        setReviews(reviewData);
      }
    } catch (error) {
      console.error("Failed to fetch product", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      setAddingToCart(true);
      await profileService.addToCart({
        product_id: product.id,
        size: selectedSize || (product.sizes?.[0]?.size || ""),
        color: selectedColor || (product.colors?.[0]?.color_hex || ""),
        quantity: quantity
      });
      setShowCartModal(true);
    } catch (error) {
      console.error("Failed to add to cart", error);
      alert("Please login to add to cart.");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    try {
      setSubmittingReview(true);
      await shopService.submitProductReview(slug, {
        rating: reviewRating,
        comment: reviewText
      });
      setReviewText("");
      // Refresh reviews
      const reviewData = await shopService.getProductReviews(slug);
      setReviews(reviewData);
      alert("Review submitted successfully");
    } catch (error) {
      console.error("Failed to submit review", error);
      alert("Failed to submit review. Are you logged in?");
    } finally {
      setSubmittingReview(false);
    }
  };

  const selectedSizeData = product?.sizes?.find((s: any) => s.size === selectedSize);
  const isOutOfStock = product && (
    (product.stock_quantity !== undefined && product.stock_quantity !== null && product.stock_quantity <= 0) || 
    (selectedSize && selectedSizeData && (selectedSizeData.stock === undefined || selectedSizeData.stock === null || selectedSizeData.stock <= 0))
  );

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col bg-white">
        <Navbar bg="bg-[#808080]" />
        <div className="flex-1 flex items-center justify-center pt-28">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen flex flex-col bg-white">
        <Navbar bg="bg-[#808080]" />
        <div className="flex-1 flex flex-col items-center justify-center pt-28">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <a href="/shop" className="text-blue-500 hover:underline">Return to Shop</a>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar bg="bg-[#808080]" />

      <div className="w-full px-6 md:px-16 py-8 pt-28">
        {/* Breadcrumbs */}
        <nav className="flex text-xs text-gray-500 mb-8 items-center gap-2">
          <span>Shop</span>
          <ChevronRight size={12} />
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Gallery - Left */}
          <div className="md:col-span-6">
            <div className="bg-[#f8f9fb] rounded-lg aspect-square relative mb-6 overflow-hidden flex items-center justify-center p-12">
              <Image 
                src={activeImage || product.primary_image || "/assets/placeholder.png"} 
                alt={product.name} 
                fill
                className="object-contain"
              />
            </div>
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img: any, i: number) => (
                  <div 
                    key={i} 
                    onClick={() => setActiveImage(img.image)}
                    className={`bg-[#f8f9fb] rounded-lg aspect-square relative cursor-pointer transition-all flex items-center justify-center p-4 border-2 
                      ${activeImage === img.image ? "border-blue-500 shadow-sm" : "border-transparent hover:border-gray-300"}`}
                  >
                    <Image 
                      src={img.image || "/assets/placeholder.png"} 
                      alt={`Thumbnail ${i}`} 
                      fill 
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info - Right */}
          <div className="md:col-span-6">
            <div className="mb-2">
              <span className={`text-xs font-bold uppercase ${isOutOfStock ? "text-red-500" : "text-green-500"}`}>
                {isOutOfStock ? "Out of Stock" : "In Stock"}
              </span>
            </div>
            <h1 className="text-4xl font-heading font-black tracking-tight text-gray-900 mb-2 uppercase">
              {product.name}
            </h1>
            <p className="text-sm text-gray-500 mb-6 italic">{product.category?.name || "Apparel"}</p>
            
            <p className="text-gray-600 text-[15px] mb-8 leading-relaxed max-w-xl">
              {product.short_description || product.description || "A stylish piece designed to elevate your look with a modern fit and cool, confident feel."}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-bold font-heading text-gray-900">${product.price}</span>
              {product.old_price && <span className="text-lg text-gray-400 line-through font-heading">${product.old_price}</span>}
            </div>

            <div className="mb-10">
              <StarRating rating={product.average_rating || 5.0} count={product.review_count || 0} />
            </div>

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Available Size</h3>
              <div className="flex gap-3">
                {product.sizes?.map((item: any) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSize(item.size)}
                    disabled={item.stock <= 0}
                    className={`w-12 h-10 flex items-center justify-center text-xs font-bold rounded transition-all border-2 
                      ${item.stock <= 0 ? "bg-gray-50 border-gray-100 text-gray-300 cursor-not-allowed line-through" : 
                        selectedSize === item.size ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-100" : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"}`}
                  >
                    {item.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-10">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Colors</h3>
              <div className="flex gap-4">
                {product.colors?.map((item: any) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedColor(item.color_hex)}
                    className={`w-8 h-8 rounded-full border-2 transition-all p-0.5
                      ${selectedColor === item.color_hex ? "border-blue-600" : "border-transparent"}`}
                  >
                    <div 
                      className="w-full h-full rounded-full" 
                      style={{ backgroundColor: item.color_hex }}
                    ></div>
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

              {isOutOfStock ? (
                <button 
                  disabled
                  className="bg-gray-200 text-gray-500 font-bold py-4 px-8 rounded-md cursor-not-allowed w-full md:w-fit min-w-[280px]"
                >
                  Out of Stock
                </button>
              ) : (
                <button 
                  onClick={handleAddToCart}
                  disabled={addingToCart}
                  className="bg-blue-600 text-white font-bold py-4 px-8 rounded-md hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 w-full md:w-fit min-w-[280px] disabled:opacity-50"
                >
                  {addingToCart ? "Adding..." : "Add to cart"}
                </button>
              )}

              <p className="text-gray-900 italic font-medium">
                {isOutOfStock ? "Sign up to be notified when this item is back in stock" : "Limited stock available — grab yours now"}
              </p>
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
                <p>{product.description}</p>
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

              {/* Add Review Form */}
              <form onSubmit={handleSubmitReview} className="mb-12 bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="font-bold mb-4">Write a Review</h3>
                <div className="flex gap-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button type="button" key={star} onClick={() => setReviewRating(star)}>
                      <Star size={24} fill={star <= reviewRating ? "#fbbf24" : "none"} color={star <= reviewRating ? "#fbbf24" : "#9ca3af"} />
                    </button>
                  ))}
                </div>
                <textarea 
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full border border-gray-200 p-3 rounded-lg outline-none focus:border-blue-500 mb-4" 
                  rows={3} 
                  placeholder="Share your thoughts..."
                  required
                />
                <button 
                  type="submit" 
                  disabled={submittingReview}
                  className="bg-blue-600 text-white px-6 py-2 rounded-md font-bold disabled:opacity-50"
                >
                  {submittingReview ? "Submitting..." : "Submit Review"}
                </button>
              </form>

              <div className="space-y-10">
                {reviews.length > 0 ? reviews.map((review: any) => (
                  <div key={review.id} className="flex gap-6 border-b border-gray-100 pb-10 last:border-0">
                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 relative bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xl">
                      {review.user?.full_name?.charAt(0) || "U"}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-1">{review.user?.full_name || "Anonymous User"}</h4>
                      <div className="mb-4">
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="text-gray-500 text-[15px] leading-relaxed mb-4 max-w-2xl">
                        {review.comment}
                      </p>
                      <div className="text-xs text-gray-400">
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                )) : (
                  <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Cart Success Modal */}
      {showCartModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 ease-out">
            <div className="relative p-8 flex flex-col items-center text-center">
              <button 
                onClick={() => setShowCartModal(false)}
                className="absolute top-6 right-6 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-400" />
              </button>

              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 relative">
                <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20" />
                <Check size={40} className="text-green-500" strokeWidth={3} />
              </div>

              <h2 className="text-2xl font-heading font-black text-gray-900 mb-2">ADDED TO CART!</h2>
              <p className="text-gray-500 mb-8">
                The <span className="font-bold text-gray-900">"{product.name}"</span> has been successfully added to your shopping bag.
              </p>

              <div className="flex flex-col w-full gap-3">
                <button 
                  onClick={() => window.location.href = "/cart"}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 active:scale-[0.98]"
                >
                  <ShoppingBag size={20} />
                  View Shopping Bag
                </button>
                <button 
                  onClick={() => setShowCartModal(false)}
                  className="w-full bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-600 py-4 rounded-2xl font-bold transition-all active:scale-[0.98]"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
