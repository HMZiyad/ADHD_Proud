"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Tag, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { blogService } from "@/services/blog.service";

export default function Blogs() {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [activeCategory]);

  const fetchInitialData = async () => {
    try {
      const cats = await blogService.getCategories();
      setCategories(cats);
    } catch (error) {
      console.error("Error fetching initial blog data", error);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (activeCategory) {
        params.category__slug = activeCategory;
      }
      const data = await blogService.getPosts(params);
      setPosts(data);
    } catch (error) {
      console.error("Error fetching blog posts", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar bg="bg-[#808080]" />
      
      <div className="w-full px-6 md:px-16 py-16 pt-28">
        <div className="mb-12 flex flex-col items-center text-center">
          <h1 className="font-heading text-5xl font-bold uppercase tracking-wide text-black mb-4">
            ADHD PROUD BLOG
          </h1>
          <p className="text-gray-700 text-[15px]">
            Stories, insights, and resources for the neurodivergent community.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-16">
          <button 
            onClick={() => setActiveCategory(null)}
            className={`${!activeCategory ? 'bg-[#3b82f6] text-white' : 'border border-gray-300 text-gray-700 hover:border-gray-400'} px-6 py-2 rounded-full text-sm font-medium transition-colors`}
          >
            All Blogs
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`${activeCategory === cat.slug ? 'bg-[#3b82f6] text-white' : 'border border-gray-300 text-gray-700 hover:border-gray-400'} px-6 py-2 rounded-full text-sm font-medium transition-colors`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl font-bold mb-2">No posts found</p>
            <p>Try selecting a different category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {posts.map((post) => (
              <Link href={`/blogs/${post.slug || post.id}`} key={post.id} className="flex flex-col border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-white pb-2 group">
                <div className="aspect-[4/3] w-full relative bg-gray-100">
                  <Image
                    src={post.image || "/assets/placeholder.png"}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  {post.category && (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                      <Tag className="w-3.5 h-3.5 text-[#3b82f6] fill-[#3b82f6]" strokeWidth={1} />
                      <span className="text-[11px] font-semibold text-gray-800 tracking-wide uppercase">{post.category.name}</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-gray-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs font-medium">{new Date(post.created_at || post.published_date || post.date).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-semibold text-black text-[17px] mb-3 leading-snug group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-[13px] leading-relaxed mb-6 flex-1 line-clamp-3">
                    {post.excerpt || post.description}
                  </p>
                  <div className="flex items-center gap-1 text-[#3b82f6] text-sm w-fit font-medium transition-colors mt-auto">
                    Read more <ArrowRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
