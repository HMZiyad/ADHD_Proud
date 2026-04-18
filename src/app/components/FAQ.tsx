"use client";

import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "How long is shipping usually?",
    answer: "Given the nature of the brand moving towards more sustainable packaging and processes, orders typically ship within 5-7 business days."
  },
  {
    question: "What is the return policy?",
    answer: "We offer a 30-day return policy for unmatched satisfaction."
  },
  {
    question: "How can I contact support?",
    answer: "You can reach out via our contact page or email us directly at support@adhdproud.com"
  },
  {
    question: "Can I change or cancel my order?",
    answer: "If you act within 24 hours of placing it, we can usually accommodate request changes."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="w-full bg-white py-24 px-6 md:px-16">
      <div className="w-full flex flex-col items-center">
        <h2 className="font-heading text-4xl md:text-5xl text-black tracking-tight text-center mb-4">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <p className="text-gray-500 font-medium text-center mb-16 max-w-xl">
          We bring high-quality, comfortable fashion engineered for all body types, focusing on sensory-friendly fabrics.
        </p>

        <div className="w-full space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="border-b border-gray-200 pb-4">
                <button 
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between py-2 text-left font-bold text-black"
                >
                  {faq.question}
                  {isOpen ? <Minus className="w-5 h-5 text-black" /> : <Plus className="w-5 h-5 text-black" />}
                </button>
                {isOpen && (
                  <p className="text-gray-500 text-sm font-medium mt-2 leading-relaxed pr-8">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
