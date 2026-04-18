import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center pt-[72px]">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/assets/hero1.png"
          alt="Group of friends walking and laughing"
          fill
          className="object-cover"
          priority

        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/80"></div>
        {/* Subtle overlay so text is readable */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="relative z-10 px-6 md:px-16 w-full pt-16">
        {/* Tagline Pill */}
        <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shadow-[0_0_8px_#3b82f6]" />
          <p className="text-white/80 text-xs md:text-sm font-medium tracking-wide">
            Designed for minds that move differently.
          </p>
        </div>

        <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl text-white font-black leading-[0.85] tracking-tight mb-8">
          WIRED DIFFERENT.
          BUILT DIFFERENT.
        </h1>

        <p className="text-white/90 text-sm md:text-lg mb-10 max-w-xl font-medium leading-relaxed">
          ADHD Proud is a streetwear brand celebrating neurodivergent creativity,
          individuality, and community.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button className="px-8 py-3.5 rounded-full border border-white/30 bg-white/5 backdrop-blur-md text-white font-bold text-sm tracking-wide hover:bg-white/10 transition-all">
            Explore Our Story
          </button>
          <button className="px-8 py-3.5 rounded-full bg-[#3b82f6] text-white font-bold text-sm tracking-wide hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">
            Shop Collection
          </button>
        </div>
      </div>
    </section>
  );
}
