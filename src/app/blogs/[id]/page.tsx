"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { User, Calendar, Share2, ArrowLeft, ArrowRight, ChevronLeft, Loader2 } from "lucide-react";
import { blogService } from "@/services/blog.service";

const Facebook = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const Twitter = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const Linkedin = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function BlogPost() {
  const params = useParams();
  const slug = params.id as string;
  
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const data = await blogService.getPostBySlug(slug);
      setPost(data);
    } catch (error) {
      console.error("Failed to fetch blog post", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col bg-gray-50">
        <Navbar bg="bg-[#808080]" />
        <div className="flex-1 flex items-center justify-center pt-28">
          <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!post) {
    return (
      <main className="min-h-screen flex flex-col bg-gray-50">
        <Navbar bg="bg-[#808080]" />
        <div className="flex-1 flex flex-col items-center justify-center pt-28 gap-4">
          <h1 className="text-3xl font-bold">Blog Post Not Found</h1>
          <a href="/blogs" className="text-blue-500 hover:underline flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Blogs
          </a>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar bg="bg-[#808080]" />
      
      {/* Hero Banner */}
      <div className="relative w-full h-[450px] bg-gray-200">
        <Image 
          src={post.image || "/assets/blogs/hero.png"} 
          alt={post.title} 
          fill 
          className="object-cover" 
          priority
        />
        <div className="absolute top-8 left-6 md:left-12">
          <a href="/blogs" className="flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-md text-sm hover:bg-white/30 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Blogs
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 relative -mt-32 mb-24">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12 lg:p-16">
          
          {post.category && (
            <span className="inline-block bg-[#d90b8b] text-white px-3 py-1 rounded-sm text-[11px] font-medium tracking-wide mb-8 uppercase">
              {post.category.name}
            </span>
          )}

          <h1 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-wide text-black mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-gray-500 text-sm mb-6 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-500" strokeWidth={1.5} /> 
              <span>{post.author_name || "Admin"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" strokeWidth={1.5} />
              <span>{new Date(post.published_date || post.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-gray-600 text-sm mb-12 pb-6 border-b border-gray-100">
            <span className="flex items-center gap-2 whitespace-nowrap"><Share2 className="w-3.5 h-3.5" strokeWidth={1.5} /> Share :</span>
            <div className="flex items-center gap-2">
              <a href="#" className="text-purple-600 hover:opacity-80 transition-opacity"><Facebook className="w-4 h-4" strokeWidth={1.5} /></a>
              <a href="#" className="text-purple-600 hover:opacity-80 transition-opacity"><Twitter className="w-4 h-4" strokeWidth={1.5} /></a>
              <a href="#" className="text-purple-600 hover:opacity-80 transition-opacity"><Linkedin className="w-4 h-4" strokeWidth={1.5} /></a>
            </div>
          </div>

          <article className="prose prose-lg max-w-none text-gray-800">
            {/* 
              If the backend sends raw HTML in content, you would use dangerouslySetInnerHTML.
              Since we are unsure, we will just render it as text, or if it's rich text we can safely inject it.
            */}
            {post.content ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} className="font-light leading-relaxed text-[15px]" />
            ) : (
              <p className="mb-6 font-light leading-relaxed text-[15px]">
                {post.excerpt || post.description || "No content available for this post."}
              </p>
            )}
          </article>

          <div className="flex items-center justify-between mt-20 pt-8 border-t border-gray-100">
            <a href="/blogs" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors text-sm font-medium">
              <ArrowLeft className="w-4 h-4" strokeWidth={1.5} /> Back to Blogs
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
