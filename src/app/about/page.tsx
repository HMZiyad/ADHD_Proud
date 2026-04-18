import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar bg="bg-[#808080]" />
      
      {/* Header Section */}
      <div className="px-6 md:px-16 pt-28 pb-16 flex flex-col items-center text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-wide text-black mb-4">
          ABOUT ADHD PROUD
        </h1>
        <p className="text-gray-800 text-[15px]">
          Discover how ADHD Proud started and what we stand for.
        </p>
      </div>

      {/* Proudly Different Section */}
      <div className="px-6 md:px-16 py-4 flex flex-col md:flex-row items-center gap-12 lg:gap-24 mb-16">
        <div className="flex-1 order-2 md:order-1">
          <h2 className="font-heading text-[28px] md:text-3xl font-bold uppercase text-[#3b82f6] mb-8 tracking-wide">
            PROUDLY DIFFERENT
          </h2>
          <div className="text-black text-[14px] leading-[1.8] space-y-6">
            <p>
              ADHD Proud started with a simple idea: to create something meaningful for
              people who have always felt a little different. For those whose minds move
              fast, jump between ideas, and see the world in their own unique way.
              What began as a vision has grown into a brand that represents creativity,
              individuality, and self-expression.
            </p>
            <p>
              We wanted to build more than just clothing. We wanted to create a space
              where people feel seen, understood, and proud of who they are. With a
              passion for creativity and community, Sarena continues to shape ADHD Proud
              into a space that empowers others to be themselves.
            </p>
          </div>
        </div>
        <div className="flex-1 order-1 md:order-2 w-full h-[320px] md:h-[380px] relative rounded-xl overflow-hidden shadow-sm">
          <Image 
            src="/assets/community.png" 
            alt="Proudly Different Community" 
            fill 
            className="object-cover" 
          />
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="bg-[#fff9f0] w-full py-20 mb-24">
        <div className="px-6 md:px-16 flex flex-col md:flex-row items-center gap-12 lg:gap-24">
          <div className="flex-1 w-full h-[320px] md:h-[380px] relative rounded-xl overflow-hidden shadow-sm">
            {/* Using hero1.png as requested by instructions to stick to existing assets */}
            <Image 
              src="/assets/hero1.png" 
              alt="Our Mission" 
              fill 
              className="object-cover" 
            />
          </div>
          <div className="flex-1">
            <h2 className="font-heading text-[28px] md:text-3xl font-bold uppercase text-[#3b82f6] mb-8 tracking-wide">
              OUR MISSION
            </h2>
            <div className="text-black text-[14px] leading-[1.8] space-y-6">
              <p>
                Our mission is to empower neurodivergent individuals to embrace their
                identity and express themselves without fear. We believe that ADHD is not
                something to hide; it's a different way of thinking that brings creativity, energy,
                and new perspectives.
              </p>
              <p>
                Through our designs and our community, we aim to turn differences into
                confidence and confidence into something powerful.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Meet Our Founder Section */}
      <div className="px-6 md:px-16 mb-32 w-full">
        <div className="bg-[#2968d9] rounded-2xl w-full flex flex-col items-center text-center px-6 py-16 md:py-20 text-white shadow-md">
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase mb-12 tracking-wider">
            MEET OUR FOUNDER
          </h2>
          
          <div className="w-36 h-36 relative rounded-full overflow-hidden mb-10 shadow-lg border-[3px] border-white/20">
            {/* Using community.png as fallback for avatar */}
            <Image 
              src="/assets/owner.jpg" 
              alt="Sarena" 
              fill 
              className="object-cover object-[center_top]" 
            />
          </div>
          
          <div className="max-w-3xl text-[15px] italic leading-[1.8] mb-10 text-white/95 font-light">
            &quot;I created ADHD Proud because I wanted to see a brand that truly represented me—a place where my
            ADHD wasn&apos;t something to hide, but something to celebrate. I hope our clothing helps others feel the
            same pride and confidence in who they are.&quot;
          </div>
          
          <div className="font-bold text-[17px] tracking-wide">
            — Sarena, Founder & Creative Director
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
