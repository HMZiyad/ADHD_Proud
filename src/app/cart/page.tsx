"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Minus, Trash2, Heart, ChevronRight, ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { profileService } from "@/services/profile.service";
import { orderService } from "@/services/order.service";

type Step = "cart" | "checkout" | "confirmed";

export default function CartPage() {
  const [step, setStep] = useState<Step>("cart");
  const [cartData, setCartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await profileService.getCart();
      setCartData(data);
    } catch (error) {
      console.error("Failed to fetch cart", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id: number, currentQuantity: number, delta: number) => {
    const newQuantity = Math.max(1, currentQuantity + delta);
    if (newQuantity === currentQuantity) return;
    
    try {
      setUpdatingId(id);
      const data = await profileService.updateCartItem(id, newQuantity);
      // Data returns updated item, we should refresh cart to get new totals
      await fetchCart();
    } catch (error) {
      console.error("Failed to update quantity", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const removeItem = async (id: number) => {
    try {
      setUpdatingId(id);
      await profileService.removeCartItem(id);
      await fetchCart();
    } catch (error) {
      console.error("Failed to remove item", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCheckout = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      setCheckoutLoading(true);
      const data = await orderService.createCheckoutSession({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address,
        city,
        state,
        zip_code: zipCode,
        country,
        order_notes: orderNotes
      });
      // Redirect to Stripe Checkout
      if (data.session_url) {
        window.location.href = data.session_url;
      }
    } catch (error: any) {
      console.error("Checkout failed", error);
      let errorMsg = "Checkout failed. Please ensure all fields are filled correctly.";
      if (error.response?.data) {
        const data = error.response.data;
        if (typeof data === 'object') {
          errorMsg = Object.values(data).map(v => Array.isArray(v) ? v[0] : v).join(" ");
        }
      }
      alert(errorMsg);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const renderProgressBar = () => (
    <div className="flex flex-col items-center mb-16 px-4">
      <div className="flex justify-between w-full max-w-4xl mb-4 relative">
        <div className="flex flex-col items-center z-10">
          <div className={`w-6 h-6 rounded-full border-4 ${step === "cart" || step === "checkout" || step === "confirmed" ? "bg-blue-500 border-blue-200" : "bg-white border-gray-200"}`}></div>
          <span className={`text-xs mt-2 font-medium ${step === "cart" ? "text-gray-900" : "text-gray-400"}`}>Shopping Cart</span>
        </div>
        <div className="flex flex-col items-center z-10">
          <div className={`w-6 h-6 rounded-full border-4 ${step === "checkout" || step === "confirmed" ? "bg-blue-500 border-blue-200" : "bg-white border-gray-200"}`}></div>
          <span className={`text-xs mt-2 font-medium ${step === "checkout" ? "text-gray-900" : "text-gray-400"}`}>Checkout</span>
        </div>
        <div className="flex flex-col items-center z-10">
          <div className={`w-6 h-6 rounded-full border-4 ${step === "confirmed" ? "bg-blue-500 border-blue-200" : "bg-white border-gray-200"}`}></div>
          <span className={`text-xs mt-2 font-medium ${step === "confirmed" ? "text-gray-900" : "text-gray-400"}`}>Order Confirmed</span>
        </div>
        
        {/* Background Line */}
        <div className="absolute top-3 left-[10%] right-[10%] h-[2px] bg-gray-100 -z-0"></div>
        {/* Active Line */}
        <div className={`absolute top-3 left-[10%] h-[2px] bg-blue-400 transition-all duration-500 -z-0`} 
             style={{ width: step === "cart" ? "0%" : step === "checkout" ? "40%" : "80%" }}></div>
      </div>
    </div>
  );

  const renderCartStep = () => {
    if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-10 h-10 animate-spin text-blue-500" /></div>;
    if (!cartData || cartData.items.length === 0) return <div className="text-center py-20 text-xl font-bold">Your cart is empty.</div>;

    return (
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Items List */}
        <div className="flex-1 space-y-6">
          {cartData.items.map((item: any) => (
            <div key={item.id} className={`bg-white border border-gray-100 rounded-xl p-6 flex gap-6 shadow-sm hover:shadow-md transition-shadow relative ${updatingId === item.id ? 'opacity-50' : ''}`}>
              <div className="w-40 h-40 bg-[#f8f9fb] rounded-lg overflow-hidden flex items-center justify-center p-4">
                <Image src={item.product?.primary_image || "/assets/placeholder.png"} alt={item.product?.name || "Product"} width={120} height={120} className="object-contain" />
              </div>
              <div className="flex-1 flex flex-col justify-between py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4">{item.product?.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Color:</span>
                        <span className="font-bold text-gray-900 capitalize">{item.color}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <span>Size: </span>
                        <span className="font-bold text-gray-900">{item.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => removeItem(item.id)} disabled={updatingId === item.id} className="text-gray-300 hover:text-red-500 transition-colors disabled:opacity-50"><Trash2 size={20} /></button>
                  </div>
                </div>
                
                <div className="flex justify-between items-end">
                  <span className="text-2xl font-bold text-blue-500">${item.total_price}</span>
                  <div className="flex items-center border border-gray-100 rounded-lg overflow-hidden">
                    <button disabled={updatingId === item.id} onClick={() => updateQuantity(item.id, item.quantity, -1)} className="p-2 hover:bg-gray-50 text-gray-400 border-r border-gray-100 disabled:opacity-50"><Minus size={16} /></button>
                    <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
                    <button disabled={updatingId === item.id} onClick={() => updateQuantity(item.id, item.quantity, 1)} className="p-2 hover:bg-gray-50 text-gray-400 border-l border-gray-100 disabled:opacity-50"><Plus size={16} /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Order details</h2>
            <div className="space-y-6 mb-8 text-[15px]">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">${cartData.subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="font-medium text-gray-900">Calculated at checkout</span>
              </div>
              <div className="pt-6 border-t border-gray-100 flex justify-between">
                <span className="font-bold text-gray-900">Estimated Total</span>
                <span className="font-bold text-gray-900">${cartData.total}</span>
              </div>
            </div>

            <button 
              onClick={() => setStep("checkout")}
              className="w-full bg-blue-500 text-white font-bold py-4 rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-50 mb-6"
            >
              Proceed to Checkout
            </button>
            <a href="/shop" className="block text-center text-sm font-medium text-blue-500 hover:underline">Continue Shopping</a>
          </div>
        </div>
      </div>
    );
  };

  const renderCheckoutStep = () => (
    <form onSubmit={handleCheckout} className="flex flex-col lg:flex-row gap-12">
      {/* Form */}
      <div className="flex-1 space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Billing & Shipping</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">First Name</label>
              <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700">E - Mail Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700">Country / Region</label>
              <input type="text" value={country} onChange={e => setCountry(e.target.value)} required className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700">Street Address</label>
              <input type="text" value={address} onChange={e => setAddress(e.target.value)} required placeholder="House Number and street name" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Town / City</label>
              <input type="text" value={city} onChange={e => setCity(e.target.value)} required className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">State / Province</label>
              <input type="text" value={state} onChange={e => setState(e.target.value)} required className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Zip / postcode</label>
              <input type="text" value={zipCode} onChange={e => setZipCode(e.target.value)} required className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Additional information</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Order Notes ( Optional )</label>
            <textarea value={orderNotes} onChange={e => setOrderNotes(e.target.value)} placeholder="Notes about your order, e.g. special notes for delivery." rows={4} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 resize-none" />
          </div>
        </section>
      </div>

      {/* Summary Card */}
      <div className="w-full lg:w-[400px]">
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Your Order Summary</h2>
          
          <div className="space-y-6 mb-12">
            <h3 className="text-red-500 font-medium">Payment</h3>
            <div className="border border-gray-100 rounded-lg p-6 flex justify-center mb-8">
              <div className="text-blue-600 font-bold text-3xl">stripe</div>
            </div>
            
            <div className="space-y-4">
              {cartData?.items.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-4">
                    <span>{item.quantity}x</span>
                    <span className="line-clamp-1">{item.product?.name}</span>
                  </span>
                  <span className="font-bold text-gray-900">${item.total_price}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-gray-100">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">${cartData?.subtotal}</span>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-100">
              <span className="font-bold text-gray-900">Estimated Total</span>
              <span className="font-bold text-gray-900">${cartData?.total}</span>
            </div>
          </div>

          <button 
            type="submit"
            disabled={checkoutLoading}
            className="w-full bg-blue-500 text-white font-bold py-4 rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-50 mb-6 disabled:opacity-50 flex justify-center items-center"
          >
            {checkoutLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Pay with Stripe"}
          </button>
          
          <button 
            type="button"
            onClick={() => setStep("cart")}
            className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Cart
          </button>
        </div>
      </div>
    </form>
  );

  const renderConfirmedStep = () => (
    <div className="text-center py-24 space-y-6">
      <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>
      <h2 className="text-4xl font-heading font-black text-gray-900 uppercase">Order Confirmed!</h2>
      <p className="text-gray-500 max-w-md mx-auto">
        Your order has been placed successfully. We&apos;ll send you a confirmation email with your order details shortly.
      </p>
      <div className="pt-8">
        <a href="/shop" className="bg-blue-500 text-white font-bold px-10 py-4 rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-50">
          Back to Shop
        </a>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-white">
      <Navbar bg="bg-[#808080]" />

      <div className="w-full px-6 md:px-16 py-12 pt-28">
        {/* Breadcrumbs */}
        <nav className="flex text-sm text-gray-500 mb-8 items-center gap-2">
          <span>Home</span>
          <ChevronRight size={14} />
          <span className="text-blue-500 font-medium">Shopping Cart</span>
        </nav>

        <h1 className="text-5xl font-heading font-black text-gray-900 uppercase tracking-tight mb-16">
          SHOPPING CART
        </h1>

        {renderProgressBar()}

        {step === "cart" && renderCartStep()}
        {step === "checkout" && renderCheckoutStep()}
        {step === "confirmed" && renderConfirmedStep()}
      </div>

      <Footer />
    </main>
  );
}
