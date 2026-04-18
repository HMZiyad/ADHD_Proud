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

      <div className="relative z-10 px-8 md:px-16 w-full">
        <p className="text-white text-sm md:text-base font-medium mb-4 max-w-sm">
          Defy the norm through urban streetwear and community driven design.
        </p>
        <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-white leading-[0.85] tracking-tight mb-6">
          WIRED DIFFERENT.<br />
          BUILT DIFFERENT.
        </h1>
        <p className="text-white md:text-lg mb-8 max-w-md font-medium text-white/90">
          We bring high-quality, comfortable fashion engineered for all body types,
          focusing on sensory-friendly fabrics.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button className="w-full sm:w-auto px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-colors">
            Shop Collection
          </button>
          <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-[#3b82f6] border-2 border-[#3b82f6] text-white font-semibold hover:bg-blue-600 hover:border-blue-600 transition-colors">
            Order Now
          </button>
        </div>
      </div>
    </section>
  );
}
