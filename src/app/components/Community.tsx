import Image from "next/image";

export default function Community() {
  return (
    <section className="w-full bg-zinc-950 py-24 relative overflow-hidden">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00ffcc]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
            <Image
              src="/assets/community.png"
              alt="Adverse Community"
              fill
              className="object-cover opacity-90 saturate-50 hover:saturate-100 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#dbff00]/20 to-transparent mix-blend-overlay"></div>
          </div>
          
          <div className="order-1 lg:order-2 space-y-8">
            <div>
              <div className="inline-block px-3 py-1 rounded-sm bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-black tracking-widest uppercase mb-6">
                Our Culture
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.9]">
                More Than <br />
                <span className="text-[#dbff00]">Aptitude.</span> <br />
                It&apos;s Attitude.
              </h2>
            </div>
            
            <p className="text-zinc-400 text-lg md:text-xl font-medium tracking-wide max-w-lg">
              We aren&apos;t just selling clothes. We&apos;re building a movement of creatives, rebels, and visionaries redefining the streets. Join the collective.
            </p>
            
            <div className="pt-4">
              <button className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-[#dbff00] transition-colors">
                Read The Manifesto
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-zinc-800/50 mt-8">
               <div>
                  <div className="text-3xl font-black text-white">50K+</div>
                  <div className="text-sm font-medium text-zinc-500 uppercase tracking-widest mt-1">Members</div>
               </div>
               <div>
                  <div className="text-3xl font-black text-white">24</div>
                  <div className="text-sm font-medium text-zinc-500 uppercase tracking-widest mt-1">Cities</div>
               </div>
               <div>
                  <div className="text-3xl font-black text-[#dbff00]">ONE</div>
                  <div className="text-sm font-medium text-zinc-500 uppercase tracking-widest mt-1">Vision</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
