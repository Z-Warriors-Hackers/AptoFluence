import React, { useEffect, useRef, useState } from 'react';
import { Target, Search, CreditCard } from 'lucide-react';

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate steps one by one
            setTimeout(() => setVisibleSteps([0]), 200);
            setTimeout(() => setVisibleSteps([0, 1]), 600);
            setTimeout(() => setVisibleSteps([0, 1, 2]), 1000);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      icon: Target,
      title: "Set Smart Goals",
      description: "Sellers define sales targets, budget, and performance conditions in a secure smart contract.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Search,
      title: "Auto-Match & Trigger",
      description: "Our platform monitors sales in real-time. If projections dip, it automatically finds and engages the perfect influencer from our network.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: CreditCard,
      title: "Guarantee Payments",
      description: "Influencers are paid instantly and automatically by the contract upon task completion. No delays, no disputes, just trust.",
      color: "from-teal-500 to-green-500"
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Our automated system ensures perfect influencer matches and guaranteed results
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <svg className="w-full h-24" viewBox="0 0 800 100" fill="none">
              <path
                d="M200 50 L600 50"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeDasharray="5,5"
                className={`transition-all duration-1000 ${
                  visibleSteps.length > 1 ? 'opacity-60' : 'opacity-0'
                }`}
              >
                <animate
                  attributeName="stroke-dashoffset"
                  values="10;0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative transform transition-all duration-700 ${
                  visibleSteps.includes(index)
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${step.color} mb-6 shadow-lg`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {index + 1}. {step.title}
                  </h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}