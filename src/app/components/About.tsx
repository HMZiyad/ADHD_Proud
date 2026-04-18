import Image from "next/image";

export default function About() {
  return (
    <section className="w-full bg-white py-24 px-6 md:pl-100 md:pr-16 overflow-hidden">
      <div className="w-full flex flex-col md:flex-row items-center gap-8 lg:gap-16">
        <div className="shrink-0 relative flex justify-center md:justify-start">
          <div className="relative w-full max-w-[440px]">
            {/* Board effect in bottom-right corner */}
            <div className="absolute -bottom-6 -right-10 w-1/3 h-1/3 bg-gray-200/80 rounded-2xl z-0"></div>

            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/assets/community.png"
                alt="Community gathering"
                width={440}
                height={350}
                className="object-cover w-full h-auto"
              />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h2 className="font-heading text-4xl md:text-5xl text-black tracking-tight mb-8">
            MORE THAN JUST CLOTHING
          </h2>
          <p className="text-gray-800 text-[15px] mb-10 leading-relaxed max-w-xl">
            This community is built for people who feel like they experience
            life a little more intensely more ideas, more energy, more creativity.
            ADHD Proud is where those experiences are not overwhelming, but inspiring.
            A space where your thoughts are valued, your creativity is encouraged,
            and your differences are what connect you with others.
          </p>
          <button className="bg-[#3b82f6] text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">
            Read our story
          </button>
        </div>
      </div>
    </section>
  );
}
