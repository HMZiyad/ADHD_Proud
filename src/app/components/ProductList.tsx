import Image from "next/image";
import Link from "next/link";
import { shopService } from "@/services/shop.service";

const StarRating = ({ rating, count }: { rating: number; count: number }) => (
  <div className="flex gap-1 text-orange-400 items-center">
    {[0, 1, 2, 3, 4].map((i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? "text-[#fbbf24]" : "text-gray-300"}`}>
        ★
      </span>
    ))}
    <span className="text-xs text-gray-400 ml-1">({count} reviews)</span>
  </div>
);

export default async function ProductList() {
  let products = [];
  try {
    const data = await shopService.getProducts({});
    products = data.slice(0, 4); // Get the 4 most recent products
  } catch (error) {
    console.error("Failed to fetch products for ProductList:", error);
  }

  return (
    <section className="w-full bg-white py-24 px-6 md:px-16">
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-200 pb-4 mb-12 gap-4">
          <h2 className="font-heading text-4xl md:text-5xl text-black tracking-tight">
            FEATURED PRODUCTS
          </h2>
          <Link href="/shop" className="flex items-center text-sm font-semibold hover:text-blue-500 transition-colors uppercase tracking-widest text-gray-500">
            View All &gt;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <div key={product.id} className="flex flex-col group">
              <Link href={`/products/${product.slug}`} className="relative aspect-[4/5] w-full bg-zinc-50 rounded-md overflow-hidden mb-4 flex items-center justify-center border border-transparent hover:border-gray-200 transition-colors">
                <Image
                  src={product.primary_image || "/assets/placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-contain p-6 mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div className="flex flex-col gap-2 px-1">
                <Link href={`/products/${product.slug}`} className="hover:text-blue-600 transition-colors">
                  <h3 className="font-semibold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <StarRating rating={product.average_rating || 5} count={product.review_count || 0} />
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-black">${product.price}</span>
                  {product.old_price && (
                    <span className="text-sm text-gray-400 line-through">${product.old_price}</span>
                  )}
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="relative flex-1 group/quickview">
                    <button className="w-full py-1.5 text-xs font-semibold rounded-full border border-gray-300 hover:border-black transition-colors">
                      Quick View
                    </button>
                    {/* Glassmorphism Hover Details */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-48 p-4 bg-white/60 backdrop-blur-lg border border-white/50 shadow-2xl rounded-2xl opacity-0 invisible group-hover/quickview:opacity-100 group-hover/quickview:visible transition-all duration-300 z-20 pointer-events-none translate-y-2 group-hover/quickview:translate-y-0">
                      <p className="text-xs text-gray-900 font-bold leading-tight mb-1.5">{product.name}</p>
                      <p className="text-[11px] text-gray-600 leading-snug">
                        {product.description ? product.description.substring(0, 60) + "..." : "Premium quality apparel with an exclusive design."} Click to view details.
                      </p>
                    </div>
                  </div>
                  <Link href={`/products/${product.slug}`} className="flex-1">
                    <button className="w-full py-1.5 text-xs font-semibold rounded-full bg-[#3b82f6] text-white hover:bg-blue-600 transition-colors shadow-sm">
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <p className="text-gray-500 py-10 col-span-full text-center">No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
