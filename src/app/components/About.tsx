import Image from "next/image";

export default function About() {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-16 overflow-hidden">
      <div className="w-full flex flex-col md:flex-row items-center gap-12 lg:gap-16">
        <div className="w-full md:w-1/2 relative">
          <div className="absolute top-4 left-4 w-full h-full bg-gray-200 rounded-xl"></div>
          <Image
             src="/assets/community.png"
             alt="Community gathering"
             width={600}
             height={400}
             className="relative z-10 rounded-xl object-cover"
          />
        </div>
        
        <div className="w-full md:w-1/2">
          <h2 className="font-heading text-4xl md:text-5xl text-black tracking-tight mb-6">
            MORE THAN JUST CLOTHING
          </h2>
          <p className="text-gray-500 font-medium mb-8 leading-relaxed">
            We bring high-quality, comfortable fashion engineered for all body types. 
            We aim to empower individuals to feel confident and authentic in how they 
            represent themselves everyday. By removing sensory barriers through our selections, 
            we bring a brand experience that truly welcomes everyone, from fit out, 
            to feel, down to the community we build.
          </p>
          <button className="bg-[#3b82f6] text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition-colors">
            Read Our Story
          </button>
        </div>
      </div>
    </section>
  );
}
