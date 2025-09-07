import React, { useEffect, useRef } from 'react';
import { ArrowRight, Zap, Users, TrendingUp } from 'lucide-react';

interface HeroProps {
  onRegisterClick: (type: 'seller' | 'influencer') => void;
}

export default function Hero({ onRegisterClick }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Neural network animation
    const nodes: Array<{x: number; y: number; vx: number; vy: number; brightness: number}> = [];
    const connections: Array<{from: number; to: number; opacity: number}> = [];

    // Initialize nodes
    for (let i = 0; i < 50; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        brightness: Math.random()
      });
    }

    // Initialize connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() < 0.1) {
          connections.push({
            from: i,
            to: j,
            opacity: Math.random() * 0.3
          });
        }
      }
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Move nodes
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Mouse interaction
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          node.brightness = Math.min(1, 0.5 + (100 - distance) / 100);
        } else {
          node.brightness = Math.max(0.2, node.brightness - 0.01);
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${node.brightness})`;
        ctx.fill();
      });

      // Draw connections
      connections.forEach(conn => {
        const from = nodes[conn.from];
        const to = nodes[conn.to];
        
        // Mouse interaction with connections
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const dx = mouseX - midX;
        const dy = mouseY - midY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let opacity = conn.opacity;
        if (distance < 150) {
          opacity = Math.min(0.8, conn.opacity + (150 - distance) / 150 * 0.5);
        }

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = `rgba(20, 184, 166, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-teal-400 bg-clip-text text-transparent leading-tight">
              Automate Your Influencer Marketing with Web3 Trust on Aptos
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Sellers set smart goals. Influencers get auto-matched. Payments flow securely.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            <button
              onClick={() => onRegisterClick('seller')}
              className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 transform"
            >
              <div className="flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Register as Seller
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
            
            <button
              onClick={() => onRegisterClick('influencer')}
              className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl text-white font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25 hover:scale-105 transform"
            >
              <div className="flex items-center justify-center gap-2">
                <Users className="w-5 h-5" />
                Register as Influencer
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-16">
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span className="text-lg">Automated Matching</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <Users className="w-6 h-6 text-blue-400" />
              <span className="text-lg">Smart Contracts</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-gray-300">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <span className="text-lg">Guaranteed ROI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}