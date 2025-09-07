import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

interface CallToActionProps {
  onRegisterClick: (type: 'seller' | 'influencer') => void;
}

export default function CallToAction({ onRegisterClick }: CallToActionProps) {
  return (
    <section className="py-24 bg-gradient-to-r from-purple-900 via-gray-900 to-teal-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-teal-500 shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Revolutionize Your Influence?
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Join thousands of sellers and influencers who trust AptoFluence for automated, 
            secure, and profitable partnerships.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-xl mx-auto">
            <button
              onClick={() => onRegisterClick('seller')}
              className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 transform"
            >
              <div className="flex items-center justify-center gap-2">
                Start Selling Smart
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
            
            <button
              onClick={() => onRegisterClick('influencer')}
              className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25 hover:scale-105 transform"
            >
              <div className="flex items-center justify-center gap-2">
                Start Influencing
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}