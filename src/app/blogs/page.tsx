import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Tag, Calendar, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    tag: "ADHD Awareness",
    date: "25 Aug 2021",
    title: "Living with ADHD in a Neurotypical World",
    description: "Navigating daily life when the world isn&apos;t built for your brain.",
    image: "/assets/blogs/1.png",
  },
  {
    id: 2,
    tag: "Community Stories",
    date: "25 Aug 2021",
    title: "The Power of Hyperfocus",
    description: "Hyperfocus is one of ADHD&apos;s superpowers. Learn how to harness it for creative and productive work.",
    image: "/assets/blogs/2.png",
  },
  {
    id: 3,
    tag: "Community Stories",
    date: "25 Aug 2021",
    title: "Creativity and ADHD: A Unique Advantage",
    description: "How to harness your most intense focus for creative breakthroughs.",
    image: "/assets/blogs/3.png",
  },
  {
    id: 4,
    tag: "Mental Health",
    date: "25 Aug 2021",
    title: "Building Confidence with ADHD",
    description: "Confidence comes from understanding and accepting who you are. Here&apos;s how to build self-esteem with ADHD.",
    image: "/assets/blogs/4.png",
  },
];

const allPosts = [...blogPosts, ...blogPosts.map(post => ({ ...post, id: post.id + 4 }))];

export default function Blogs() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar bg="bg-[#808080]" />
      
      <div className="w-full px-6 md:px-16 py-16 pt-28">
        <div className="mb-12">
          <h1 className="font-heading text-5xl font-bold uppercase tracking-wide text-black mb-4">
            ADHD PROUD BLOG
          </h1>
          <p className="text-gray-700 text-[15px]">
            Stories, insights, and resources for the neurodivergent community.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-16">
          <button className="bg-[#3b82f6] text-white px-6 py-2 rounded-full text-sm font-medium">All Blogs</button>
          <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">ADHD Awareness</button>
          <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">Community Stories</button>
          <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">Creativity & Productivity</button>
          <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-full text-sm font-medium hover:border-gray-400 transition-colors">Mental Health</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {allPosts.map((post) => (
            <div key={post.id} className="flex flex-col border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white pb-2">
              <div className="aspect-[4/3] w-full relative">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <Tag className="w-3.5 h-3.5 text-[#3b82f6] fill-[#3b82f6]" strokeWidth={1} />
                  <span className="text-[11px] font-semibold text-gray-800 tracking-wide uppercase">{post.tag}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-gray-500 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-medium">{post.date}</span>
                </div>
                <h3 className="font-semibold text-black text-[17px] mb-3 leading-snug">
                  {post.title}
                </h3>
                <p className="text-gray-500 text-[13px] leading-relaxed mb-6 flex-1 line-clamp-3">
                  {post.description}
                </p>
                <a href={`/blogs/${post.id}`} className="flex items-center gap-1 text-[#3b82f6] hover:text-blue-700 text-sm w-fit font-medium transition-colors mt-auto group">
                  Read more <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
