import Image from "next/image";
import { Rss, Share2, Globe, MessagesSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full text-white pt-24 pb-8 px-6 md:px-16 bg-gradient-to-t from-black via-[#5634A3] to-[#5634A3]">
      <div className="w-full flex flex-col">

        <div className="w-full flex flex-col md:flex-row justify-between mb-16 gap-12">

          <div className="max-w-xs flex flex-col gap-6">
            <div className="relative h-16 w-32">
              <Image
                src="/assets/logo.png"
                alt="ADHD PROUD"
                fill
                className="object-contain object-left brightness-0 invert"
              />
            </div>
            <p className="text-white/80 text-sm font-medium">
              We bring high-quality, comfortable fashion engineered for all body types, focusing on sensory-friendly fabrics.
            </p>
            <p className="text-white/60 text-xs font-semibold">
              &copy; {new Date().getFullYear()} ADHD PROUD, All Rights Reserved.
            </p>
          </div>

          <div className="flex gap-16 flex-wrap">
            <div className="flex flex-col gap-4">
              <h4 className="font-heading text-xl uppercase tracking-widest text-white">QUICK LINKS</h4>
              <ul className="space-y-3 text-sm text-white/80 font-medium">
                <li><a href="#" className="hover:text-blue-300 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Shop</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Contact Us</a></li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-heading text-xl uppercase tracking-widest text-white">SHOP</h4>
              <ul className="space-y-3 text-sm text-white/80 font-medium">
                <li><a href="#" className="hover:text-blue-300 transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">T-Shirts</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Outerwear</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Accessories</a></li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-heading text-xl uppercase tracking-widest text-white">CONTACT US</h4>
              <ul className="space-y-3 text-sm text-white/80 font-medium">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  contact@adhdproud.com
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center gap-2 mt-4">
                  <a href="#" className="bg-white text-[#3c2463] w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors">
                    <Rss className="w-4 h-4 fill-current" />
                  </a>
                  <a href="#" className="bg-white text-[#3c2463] w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors">
                    <Share2 className="w-4 h-4 fill-current" />
                  </a>
                  <a href="#" className="bg-white text-[#3c2463] w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors">
                    <Globe className="w-4 h-4 fill-current" />
                  </a>
                  <a href="#" className="bg-white text-[#3c2463] w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors">
                    <MessagesSquare className="w-4 h-4 fill-current" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full border-t border-white/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-white/60">
          <p>Made with love by the ADHD PROUD team.</p>
          <div className="flex gap-6">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
