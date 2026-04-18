import Image from "next/image";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { User, Calendar, Share2, ArrowLeft, ArrowRight, ChevronLeft } from "lucide-react";

const Facebook = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Twitter = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const Linkedin = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function BlogPost() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar bg="bg-[#808080]" />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[450px]">
        <Image 
          src="/assets/blogs/hero.png" 
          alt="Blog Hero" 
          fill 
          className="object-cover" 
          priority
        />
        <div className="absolute top-8 left-6 md:left-12">
          <a href="/blogs" className="flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-md text-sm hover:bg-white/30 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Blogs
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 relative -mt-32 mb-24">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 lg:p-16">
          
          <span className="inline-block bg-[#d90b8b] text-white px-3 py-1 rounded-sm text-[11px] font-medium tracking-wide mb-8">
            ADHD Awareness
          </span>

          <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-wide text-black mb-8 leading-tight">
            LIVING WITH ADHD IN A NEUROTYPICAL WORLD
          </h1>

          <div className="flex items-center gap-6 text-gray-500 text-sm mb-6 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-500" strokeWidth={1.5} /> 
              <span>Sarena</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" strokeWidth={1.5} />
              <span>April 1, 2026</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-600 text-sm mb-12 pb-6 border-b border-gray-100">
            <span className="flex items-center gap-2 whitespace-nowrap"><Share2 className="w-3.5 h-3.5" strokeWidth={1.5} /> Share :</span>
            <div className="flex items-center gap-2">
              <a href="#" className="text-purple-600 hover:opacity-80 transition-opacity"><Facebook className="w-4 h-4" strokeWidth={1.5} /></a>
              <a href="#" className="text-purple-600 hover:opacity-80 transition-opacity"><Twitter className="w-4 h-4" strokeWidth={1.5} /></a>
              <a href="#" className="text-purple-600 hover:opacity-80 transition-opacity"><Linkedin className="w-4 h-4" strokeWidth={1.5} /></a>
            </div>
          </div>

          <article className="prose prose-lg max-w-none text-gray-800">
            <p className="mb-6 font-light leading-relaxed text-[15px]">
              Living with ADHD in a neurotypical world requires resilience, creativity, and self-compassion. 
              Every day presents unique challenges, from managing time and tasks to navigating social 
              situations that weren&apos;t designed with neurodivergent minds in mind.
            </p>
            <p className="mb-14 font-light leading-relaxed text-[15px]">
              But here&apos;s the thing: having ADHD isn&apos;t a deficit, it&apos;s a different way of experiencing and 
              interacting with the world. While neurotypical structures can feel restrictive, they&apos;ve also pushed 
              many of us to develop innovative coping strategies and unique perspectives.
            </p>

            <h2 className="text-[26px] font-normal text-blue-500 mb-6 tracking-wide">
              Understanding the Challenges
            </h2>
            
            <p className="mb-6 font-light leading-relaxed text-[15px]">
              The modern workplace, educational systems, and even social norms were largely built for 
              neurotypical brains. This can make simple tasks feel overwhelming:
            </p>

            <ul className="mb-14 space-y-4 font-light leading-relaxed text-[15px]">
              <li><span className="text-blue-500 font-normal">Time blindness:</span> makes punctuality and deadlines feel like moving targets</li>
              <li><span className="text-blue-500 font-normal">Executive dysfunction:</span> can turn a simple to-do list into an insurmountable mountain</li>
              <li><span className="text-blue-500 font-normal">Sensory sensitivities:</span> mean that open offices and fluorescent lights aren&apos;t just uncomfortable - they&apos;re genuinely debilitating</li>
            </ul>

            <p className="mb-8 font-light leading-relaxed text-[15px]">
              Remember: you&apos;re not broken, and you don&apos;t need to be fixed. You need understanding, support, 
              and the freedom to work with your brain, not against it.
            </p>
          </article>

          <div className="flex items-center justify-between mt-20 pt-8 border-t border-gray-100">
            <a href="#" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Previous Blog
            </a>
            
            <a href="#" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors text-sm font-medium">
              Previous Blog <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
