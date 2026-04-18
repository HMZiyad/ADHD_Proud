"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  FileText, 
  ShieldCheck, 
  Share2, 
  Eye, 
  Mail, 
  CheckCircle,
  Clock,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white font-inter">
      <Navbar bg="bg-[#808080]" />
      
      {/* Header */}
      <div className="max-w-4xl mx-auto px-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-heading font-black text-gray-900 uppercase tracking-tight mb-6">
          PRIVACY POLICY
        </h1>
        <p className="text-gray-500 font-bold text-sm tracking-widest uppercase mb-12">
          Your privacy is important to us. Learn more about how we handle your data.
        </p>
        <p className="text-gray-600 text-[15px] leading-relaxed max-w-2xl mx-auto">
          ADHD Proud is committed to protecting your privacy. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from ADHD Proud.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-8 space-y-24 mb-32">
        
        {/* Section 1: Information We Collect */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
              <FileText size={22} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-8">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                Personal Information You Provide
              </h3>
              <ul className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <span><strong className="text-gray-900">Contact Information:</strong> Name, email address, phone number, and shipping/billing addresses for order processing and newsletters.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <span><strong className="text-gray-900">Account Information:</strong> Login credentials and profile details if you create an account.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <span><strong className="text-gray-900">Payment Information:</strong> Credit card details (handled by secure third-party payment processors).</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                  <span><strong className="text-gray-900">Communications:</strong> Information shared when you contact our support team.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-8">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                Information We Collect Automatically
              </h3>
              <p className="text-sm text-gray-500 mb-6">When you visit our site, we automatically collect certain information:</p>
              <ul className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 shrink-0" />
                  <span><strong className="text-gray-900">Device Information:</strong> Browser type, IP address, operating system, and time zone.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 shrink-0" />
                  <span><strong className="text-gray-900">Usage Data:</strong> Pages you view, products you click on, and referring websites.</span>
                </li>
                <li className="flex gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 shrink-0" />
                  <span><strong className="text-gray-900">Cookies:</strong> Identifiers used to enhance your experience and analyze platform performance.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: How We Use Your Information */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-purple-50 text-purple-500 rounded-lg flex items-center justify-center">
              <Eye size={22} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Order Fulfillment", desc: "Processing payments, arranging for shipping, and providing invoices." },
              { title: "Personalization", desc: "Tailoring product recommendations and website experience." },
              { title: "Customer Support", desc: "Responding to inquiries and resolving issues with orders." },
              { title: "Marketing", desc: "Sending promotional materials (with your consent)." },
              { title: "Analytics", desc: "Monitoring platform performance and improving our services." },
              { title: "Legal Compliance", desc: "Ensuring safety and security of our platform and users." }
            ].map((item, idx) => (
              <div key={idx} className="border border-gray-100 rounded-xl p-6 hover:border-blue-100 transition-colors">
                <h4 className="font-bold text-blue-600 text-sm uppercase tracking-wide mb-2">{item.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Information Sharing */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-pink-50 text-pink-500 rounded-lg flex items-center justify-center">
              <Share2 size={22} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Information Sharing</h2>
          </div>
          
          <div className="space-y-8 text-[15px] text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Service Providers:</h3>
              <p>We share your information with third-party service providers who assist us in operating our business and providing services to you (e.g., shipping partners, payment processors).</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Legal Requirements:</h3>
              <p>We may share your information to comply with applicable laws and regulations, in response to a subpoena, or for other lawful requests for information.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Business Transfers:</h3>
              <p>In the event of a merger, acquisition, or sale of assets, your personal information may be transferred to the third party.</p>
            </div>
          </div>
        </section>

        {/* Section 4: Data Security */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
              <ShieldCheck size={22} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
          </div>
          
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-10">
            <p className="text-sm text-gray-500 mb-8 font-medium">We implement technical measures and policies to help protect your personal information:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
              {[
                "Encryption for sensitive data transmission",
                "Regular security auditing through internal and external processes",
                "Password requirements and secure storage",
                "Limited access to personal information on a need-to-know basis"
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-600">
                  <CheckCircle size={18} className="text-blue-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section 5: Your Privacy Rights */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Your Privacy Rights</h2>
          </div>
          
          <p className="text-sm text-gray-500 mb-10">Depending on your location, you may have the following rights:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { title: "Access", desc: "Request a copy of the personal information we hold about you." },
              { title: "Correction", desc: "Request that we correct or update any inaccurate information." },
              { title: "Deletion", desc: "Request that we delete your information from our records." },
              { title: "Objection", desc: "Object to the processing of your data in certain circumstances." },
              { title: "Portability", desc: "Request a transfer of your data to another organization." },
              { title: "Withdrawal", desc: "Withdraw your consent for processing at any time." }
            ].map((item, idx) => (
              <div key={idx} className="border border-gray-50 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-bold text-gray-900 text-sm mb-2">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-500 italic">To exercise these rights, please contact us directly at <a href="mailto:privacy@adhdproud.com" className="text-blue-500 font-bold hover:underline">privacy@adhdproud.com</a>.</p>
        </section>

        {/* Section 6 & 7: Cookies and Changes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookies and Tracking</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-6">We use cookies to enhance your experience. You can choose to disable cookies through your browser settings, though some features may not function correctly.</p>
            <div className="bg-gray-50 p-6 rounded-xl space-y-4">
              <div className="text-xs">
                <span className="font-bold block mb-1">Types of Cookies We Use:</span>
                <p className="text-gray-500">Essential, Analytical, Support, and Marketing cookies for platform performance and personalized user experience.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to This Policy</h2>
            <p className="text-[15px] text-gray-600 leading-relaxed mb-6">We may update this policy periodically to reflect changes in our practices or for other operational or legal reasons. Your continued use of the platform after updates indicates acceptance of the changes.</p>
          </section>
        </div>

        {/* Section 8: Contact Us */}
        <section className="bg-blue-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="flex items-center gap-4 mb-10">
            <Mail size={24} />
            <h2 className="text-3xl font-heading font-black uppercase">Contact Us</h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-12 items-start md:items-center">
            <div className="flex-1 space-y-4 text-white/90">
              <p className="text-[15px] leading-relaxed">If you have any questions or concerns about this Privacy Policy or our data practices, please reach out to us:</p>
              <div className="space-y-1 font-bold">
                <p>Email: privacy@adhdproud.com</p>
                <p>Address: 5005 Collins Avenue, Miami Beach, FL 33140</p>
              </div>
            </div>
            
            <button className="bg-white text-blue-600 font-bold px-10 py-4 rounded-lg hover:bg-gray-100 transition-all shadow-xl shadow-blue-800/20 text-sm uppercase tracking-widest flex items-center gap-2">
              Contact Support
            </button>
          </div>
        </section>

      </div>

      <Footer />
    </main>
  );
}
