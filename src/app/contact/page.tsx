"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail } from "lucide-react";
import { useState } from "react";

// Inline SVG for Instagram
const Instagram = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

// Inline SVG for Twitter (X)
const Twitter = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contact Form: Message from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.location.href = `mailto:elnatanrudolph@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar bg="bg-[#808080]" />

      <div className="w-full px-6 md:px-16 py-16 pt-28">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-5xl font-bold uppercase tracking-widest text-black mb-6">
            CONTACT US
          </h1>
          <p className="text-gray-600 text-sm max-w-2xl mx-auto leading-relaxed">
            We're here to listen. Whether you have a question, an idea, or just want to share your experience, ADHD Proud is a space where your voice matters. Reach out and be part of a community that understands you.
          </p>
        </div>

        {/* Main Contact Container */}
        <div className="bg-[#f3f4f6] rounded-2xl p-8 md:p-12 flex flex-col lg:flex-row gap-12 lg:gap-24 mb-24">
          
          {/* Left Side: Message Form */}
          <div className="flex-1 bg-white rounded-2xl p-8 md:p-10 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Send us a Message</h2>
            <p className="text-gray-400 text-sm text-center mb-8">Fill out the form and our team will respond within 24 hours.</p>
            
            <form className="space-y-6" onSubmit={handleContactSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name" 
                  required
                  className="w-full bg-gray-50 border border-transparent rounded-lg px-4 py-3 text-sm focus:bg-white focus:border-[#3b82f6] outline-none transition-all placeholder:text-gray-300"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com" 
                  required
                  className="w-full bg-gray-50 border border-transparent rounded-lg px-4 py-3 text-sm focus:bg-white focus:border-[#3b82f6] outline-none transition-all placeholder:text-gray-300"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message" 
                  required
                  className="w-full bg-gray-50 border border-transparent rounded-lg px-4 py-3 text-sm focus:bg-white focus:border-[#3b82f6] outline-none transition-all placeholder:text-gray-300 resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-[#3b82f6] text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-colors shadow-sm"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Side: Contact Info */}
          <div className="flex-1 py-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Get in touch</h2>
            
            {/* Email Section */}
            <div className="flex items-start gap-4 mb-10">
              <div className="w-12 h-12 shrink-0 bg-[#3b82f6] rounded-full flex items-center justify-center text-white shadow-md">
                <Mail className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Email</h3>
                <a href="mailto:elnatanrudolph@gmail.com" className="text-[#3b82f6] font-medium hover:underline text-base">
                  elnatanrudolph@gmail.com
                </a>
                <p className="text-gray-500 text-xs mt-1 font-medium">We typically respond within 24-48 hours</p>
              </div>
            </div>

            {/* Follow Us Section */}
            <div className="mb-10">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex items-center gap-4 mb-6">
                <a href="#" className="w-10 h-10 bg-[#3b82f6] rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                  <Instagram />
                </a>
                <a href="#" className="w-10 h-10 bg-[#3b82f6] rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                  <Twitter />
                </a>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed max-w-sm">
                Stay connected with our community on social media for updates, stories, and inspiration.
              </p>
            </div>

            {/* Business Hours Section */}
            <div className="bg-[#e5e7eb]/50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Business Hours</h3>
              <ul className="space-y-2 text-sm font-medium text-gray-600">
                <li className="flex justify-between">
                  <span>Monday - Friday: 9:00 AM - 6:00 PM EST</span>
                </li>
                <li>
                  <span>Saturday - Sunday: Closed</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
