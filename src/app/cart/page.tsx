"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, Trash2, Heart, ChevronRight, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Step = "cart" | "checkout" | "confirmed";

const cartItems = [
  {
    id: 1,
    name: "The Architecht Premium T-Shirt",
    color: "Grey",
    size: "L",
    price: 129.29,
    image: "/assets/tshirt_grey.png",
  },
  {
    id: 2,
    name: "The Architecht Premium T-Shirt",
    color: "Blue",
    size: "L",
    price: 129.29,
    image: "/assets/tshirt_blue.png",
  },
  {
    id: 3,
    name: "The Architecht Premium T-Shirt",
    color: "Grey",
    size: "L",
    price: 129.29,
    image: "/assets/cap_white.png", // Using cap as placeholder for 3rd item in screenshot
  },
];

export default function CartPage() {
  const [step, setStep] = useState<Step>("cart");
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({
    1: 1,
    2: 1,
    3: 1,
  });

  const updateQuantity = (id: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, prev[id] + delta),
    }));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * quantities[item.id], 0);
  const shipping = 5.00;
  const tax = 10.99;
  const total = subtotal + shipping + tax;

  const ProgressBar = () => (
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

  const CartStep = () => (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Items List */}
      <div className="flex-1 space-y-6">
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white border border-gray-100 rounded-xl p-6 flex gap-6 shadow-sm hover:shadow-md transition-shadow relative">
            <div className="w-40 h-40 bg-[#f8f9fb] rounded-lg overflow-hidden flex items-center justify-center p-4">
              <Image src={item.image} alt={item.name} width={120} height={120} className="object-contain" />
            </div>
            <div className="flex-1 flex flex-col justify-between py-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{item.name}</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Color:</span>
                      <div className="w-4 h-4 rounded-sm bg-gray-400"></div>
                    </div>
                    <div className="text-sm text-gray-500">
                      <span>Size: </span>
                      <span className="font-bold text-gray-900">{item.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="text-gray-300 hover:text-red-400 transition-colors"><Heart size={20} /></button>
                  <button className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                </div>
              </div>
              
              <div className="flex justify-between items-end">
                <span className="text-2xl font-bold text-blue-500">${item.price}</span>
                <div className="flex items-center border border-gray-100 rounded-lg overflow-hidden">
                  <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-gray-50 text-gray-400 border-r border-gray-100"><Minus size={16} /></button>
                  <span className="w-10 text-center font-bold text-gray-900">{quantities[item.id]}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-gray-50 text-gray-400 border-l border-gray-100"><Plus size={16} /></button>
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
              <span className="font-medium text-gray-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span className="font-medium text-gray-900">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Tax</span>
              <span className="font-medium text-gray-900">${tax.toFixed(2)}</span>
            </div>
            <div className="pt-6 border-t border-gray-100 flex justify-between">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-4">Do you have a promo code?</p>
          <div className="flex gap-2 mb-8">
            <input 
              type="text" 
              placeholder="Enter your code" 
              className="flex-1 bg-gray-50 border border-gray-100 rounded-lg px-4 py-3 text-sm focus:bg-white outline-none"
            />
            <button className="bg-blue-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">Apply</button>
          </div>

          <button 
            onClick={() => setStep("checkout")}
            className="w-full bg-blue-500 text-white font-bold py-4 rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-50 mb-6"
          >
            Checkout
          </button>
          <a href="/shop" className="block text-center text-sm font-medium text-blue-500 hover:underline">Continue Shopping</a>
        </div>
      </div>
    </div>
  );

  const CheckoutStep = () => (
    <div className="flex flex-col lg:flex-row gap-12">
      {/* Form */}
      <div className="flex-1 space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Billing & Shipping</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">First Name</label>
              <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <input type="tel" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700">E - Mail Address</label>
              <input type="email" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700">Country / Region</label>
              <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700">Street Address</label>
              <input type="text" placeholder="House Number and street name" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Town / City</label>
              <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">State / Country</label>
              <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Zip / postcode</label>
              <input type="text" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Additional information</h2>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Order Notes ( Optional )</label>
            <textarea placeholder="Notes about your order, e.g. special notes for delivery." rows={4} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 resize-none" />
          </div>
        </section>

        <div className="flex items-center gap-3">
          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500" />
          <span className="text-sm text-gray-500">Save your information for your next order</span>
        </div>
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
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-4">
                    <span>{quantities[item.id]}x</span>
                    <span>T-Shirt</span>
                  </span>
                  <span className="font-bold text-gray-900">$100.00</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-gray-100">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span className="font-bold text-gray-900">$300.00</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span className="font-bold text-gray-900">$15.00</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Tax</span>
                <span className="font-bold text-gray-900">$10.00</span>
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-100">
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-gray-900">$325.00</span>
            </div>
          </div>

          <button 
            onClick={() => setStep("confirmed")}
            className="w-full bg-blue-500 text-white font-bold py-4 rounded-lg hover:bg-blue-600 transition-all shadow-lg shadow-blue-50 mb-6"
          >
            Pay with Stripe
          </button>
          
          <button 
            onClick={() => setStep("cart")}
            className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Cart
          </button>
        </div>
      </div>
    </div>
  );

  const ConfirmedStep = () => (
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

        <ProgressBar />

        {step === "cart" && <CartStep />}
        {step === "checkout" && <CheckoutStep />}
        {step === "confirmed" && <ConfirmedStep />}
      </div>

      <Footer />
    </main>
  );
}
