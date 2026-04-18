import { Smile, Users, Heart } from "lucide-react";

export default function Features() {
  return (
    <section className="w-full bg-[#fdfaf5] py-24 px-6 md:px-16">
      <div className="w-full flex flex-col items-center">
        <h2 className="font-heading text-4xl md:text-5xl text-black tracking-tight text-center mb-4">
          MADE FOR NEURODIVERGENT MINDS
        </h2>
        <p className="text-gray-500 font-medium text-center mb-16 max-w-xl">
          We bring high-quality, comfortable fashion engineered for all body types.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="bg-white p-8 rounded-xl flex flex-col items-start shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div className="bg-blue-100 p-4 rounded-xl mb-6">
              <Smile className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg text-black mb-2">Self Expression</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              We bring high-quality, comfortable fashion engineered for all body types.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl flex flex-col items-start shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div className="bg-blue-100 p-4 rounded-xl mb-6">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg text-black mb-2">Community Driven</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              We bring high-quality, comfortable fashion engineered for all body types.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl flex flex-col items-start shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
            <div className="bg-blue-100 p-4 rounded-xl mb-6">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg text-black mb-2">Comfort & Quality</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              We bring high-quality, comfortable fashion engineered for all body types.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
