import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: "What if I'm new to Web3?",
      answer: "Don't worry! We handle all the blockchain complexity for you. You can start using AptoFluence with just your email - no crypto knowledge required. Our platform manages wallets, smart contracts, and payments automatically."
    },
    {
      question: "How does the automatic influencer matching work?",
      answer: "Our AI-powered system continuously monitors your sales data and triggers smart contracts when performance dips below your set thresholds. It then automatically finds and engages influencers who match your criteria (location, follower count, niche, etc.)."
    },
    {
      question: "Are payments really guaranteed?",
      answer: "Yes! All payments are secured by Aptos smart contracts. Funds are escrowed when campaigns start and automatically released to influencers upon completion of agreed milestones. No disputes, no delays."
    },
    {
      question: "What happens if an influencer doesn't deliver results?",
      answer: "Our tiered system automatically escalates to more credible influencers if results don't improve. Smart contracts protect both parties - influencers are paid for work completed, and sellers only pay for verified performance."
    },
    {
      question: "How much does AptoFluence cost?",
      answer: "We charge a small percentage of successful transactions. There are no upfront fees - you only pay when our platform successfully connects you with influencers and drives results."
    },
    {
      question: "Can I set custom performance triggers?",
      answer: "Absolutely! You can set multiple performance thresholds (e.g., 10% drop = 5K follower influencer, 20% drop = 20K+ follower influencer) with custom budgets and requirements for each tier."
    }
  ];

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300">
            Everything you need to know about AptoFluence
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl border border-gray-700 transition-all duration-300 hover:border-purple-500/30"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between focus:outline-none group"
              >
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">
                  {faq.question}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-6">
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}