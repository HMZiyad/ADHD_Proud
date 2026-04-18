import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Focus On My Path Blue T-Shirt",
    originalPrice: "$45.00",
    price: "$280.00",
    reviews: 5,
    image: "/assets/tshirt_blue.png",
  },
  {
    id: 2,
    name: "ADHD Proud Graphic T-Shirt",
    originalPrice: "$60.00",
    price: "$49.99",
    reviews: 5,
    image: "/assets/tshirt_grey.png",
  },
  {
    id: 3,
    name: "Focus On My Path Blue T-Shirt",
    originalPrice: "$45.00",
    price: "$280.00",
    reviews: 5,
    image: "/assets/hoodie_black.png",
  },
  {
    id: 4,
    name: "ADHD Proud Graphic Trucker",
    originalPrice: "$45.00",
    price: "$280.00",
    reviews: 5,
    image: "/assets/cap_white.png",
  },
];

const StarRating = () => (
  <div className="flex gap-1 text-orange-400">
    {'★★★★★'.split('').map((star, i) => (
      <span key={i} className="text-sm">{star}</span>
    ))}
    <span className="text-xs text-gray-400 ml-1">(24 reviews)</span>
  </div>
);

export default function ProductList() {
  return (
    <section className="w-full bg-white py-24 px-6 md:px-16">
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-4 mb-12 gap-4">
          <h2 className="font-heading text-4xl md:text-5xl text-black tracking-tight">
            FEATURED PRODUCTS
          </h2>
          <a href="#" className="flex items-center text-sm font-semibold hover:text-blue-500 transition-colors uppercase tracking-widest text-gray-500">
            View All &gt;
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="flex flex-col group">
              <a href={`/products/${product.id}`} className="relative aspect-square w-full bg-zinc-50 rounded-md overflow-hidden mb-4 flex items-center justify-center p-6 border border-transparent hover:border-gray-200 transition-colors">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
                />
              </a>
              <div className="flex flex-col gap-2">
                <a href={`/products/${product.id}`} className="hover:text-blue-600 transition-colors">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                </a>
                <StarRating />
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-black">{product.price}</span>
                  <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="flex-1 py-1.5 text-xs font-semibold rounded-full border border-gray-300 hover:border-black transition-colors">
                    Quick View
                  </button>
                  <button className="flex-1 py-1.5 text-xs font-semibold rounded-full bg-[#3b82f6] text-white hover:bg-blue-600 transition-colors">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
