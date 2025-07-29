import { useState, useEffect, useRef, useCallback } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const AppleStyleStorySection = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const sections = [
    {
      id: 0,
      title: "The Crisis",
      subtitle: "Only 57% of American adults are financially literate",
      description: "In a world where financial decisions shape our future, most people lack the basic knowledge to make informed choices about money, credit, and investing.",
      stats: "2 out of 3 Americans can't pass a basic financial literacy test",
      visual: "crisis"
    },
    {
      id: 1,
      title: "The Youth Gap",
      subtitle: "Only 21 states require financial education",
      description: "Young people graduate without understanding budgeting, investing, or credit - leaving them vulnerable to debt and poor financial decisions that can last decades.",
      stats: "43% of students receive zero financial education in school",
      visual: "youth"
    },
    {
      id: 2,
      title: "Middle School Matters",
      subtitle: "Ages 11-14 are critical for financial habits",
      description: "Research shows that financial habits are largely formed by age 7, but middle school is our last chance to make a lasting impact on money mindset and behavior.",
      stats: "Financial habits are 80% formed by age 14",
      visual: "middle"
    },
    {
      id: 3,
      title: "Our Solution",
      subtitle: "Peer-to-peer financial education that works",
      description: "Students teaching students creates authentic connections and real understanding. Our approach makes financial literacy engaging, relatable, and accessible to all.",
      stats: "85% improvement in financial confidence after our programs",
      visual: "solution"
    }
  ];

  // WebGL particle system
  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      hue: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        hue: Math.random() * 60 + 200 // Blue to purple range
      });
    }

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      // Update section-based colors
      const sectionColors = [
        { hue: 0, sat: 70 }, // Red for crisis
        { hue: 30, sat: 80 }, // Orange for youth gap
        { hue: 220, sat: 70 }, // Blue for middle school
        { hue: 120, sat: 60 } // Green for solution
      ];
      
      const currentColor = sectionColors[currentSection];
      const nextColor = sectionColors[Math.min(currentSection + 1, sectionColors.length - 1)];
      const sectionProgress = (scrollProgress * sections.length) % 1;
      
      // Interpolate colors
      const hue = currentColor.hue + (nextColor.hue - currentColor.hue) * sectionProgress;
      const sat = currentColor.sat + (nextColor.sat - currentColor.sat) * sectionProgress;

      // Update and draw particles
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.offsetWidth;
        if (particle.x > canvas.offsetWidth) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.offsetHeight;
        if (particle.y > canvas.offsetHeight) particle.y = 0;
        
        // Add some wave motion based on scroll
        const waveX = Math.sin(time * 0.001 + index * 0.1) * 20 * scrollProgress;
        const waveY = Math.cos(time * 0.001 + index * 0.1) * 10 * scrollProgress;
        
        // Draw particle
        const alpha = particle.opacity * (0.3 + scrollProgress * 0.7);
        ctx.fillStyle = `hsla(${hue}, ${sat}%, 70%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(
          particle.x + waveX, 
          particle.y + waveY, 
          particle.size * (0.5 + scrollProgress * 0.5), 
          0, 
          Math.PI * 2
        );
        ctx.fill();
        
        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
          if (otherIndex <= index) return;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const connectionAlpha = (1 - distance / 100) * 0.1 * scrollProgress;
            ctx.strokeStyle = `hsla(${hue}, ${sat}%, 70%, ${connectionAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x + waveX, particle.y + waveY);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      // Add floating geometric shapes
      for (let i = 0; i < 5; i++) {
        const shapeTime = time * 0.0005 + i * 2;
        const x = canvas.offsetWidth * 0.2 + Math.sin(shapeTime) * canvas.offsetWidth * 0.6;
        const y = canvas.offsetHeight * 0.2 + Math.cos(shapeTime * 0.7) * canvas.offsetHeight * 0.6;
        const size = 30 + Math.sin(shapeTime * 2) * 20;
        const rotation = shapeTime;
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        
        const shapeAlpha = 0.05 + Math.sin(shapeTime) * 0.05;
        ctx.fillStyle = `hsla(${hue}, ${sat}%, 80%, ${shapeAlpha * scrollProgress})`;
        
        if (i % 2 === 0) {
          // Triangle
          ctx.beginPath();
          ctx.moveTo(0, -size);
          ctx.lineTo(size * 0.866, size * 0.5);
          ctx.lineTo(-size * 0.866, size * 0.5);
          ctx.closePath();
          ctx.fill();
        } else {
          // Circle
          ctx.beginPath();
          ctx.arc(0, 0, size * 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [scrollProgress, currentSection, sections.length]);

  useEffect(() => {
    const cleanup = initWebGL();
    return cleanup;
  }, [initWebGL]);

  // Scroll handling with smooth section transitions
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (ticking || !containerRef.current) return;
      
      ticking = true;
      
      requestAnimationFrame(() => {
        const rect = containerRef.current!.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        if (rect.top <= 0 && rect.bottom >= viewportHeight) {
          const progress = Math.abs(rect.top) / (rect.height - viewportHeight);
          const clampedProgress = Math.max(0, Math.min(1, progress));
          
          setScrollProgress(clampedProgress);
          
          // Smooth section transitions
          const sectionProgress = clampedProgress * (sections.length - 1);
          const newSection = Math.round(sectionProgress);
          setCurrentSection(Math.max(0, Math.min(sections.length - 1, newSection)));
        }
        
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections.length]);

  const currentSectionData = sections[currentSection];
  const sectionTransition = (scrollProgress * sections.length) % 1;

  return (
    <section 
      ref={containerRef}
      className="relative bg-black text-white overflow-hidden"
      style={{ height: `${sections.length * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        {/* WebGL Canvas Background */}
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ mixBlendMode: 'screen' }}
        />
        
        {/* Gradient overlay for depth */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 50% 50%, 
              hsla(${200 + currentSection * 60}, 70%, 50%, 0.3) 0%, 
              transparent 70%)`
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
          {/* Section indicator */}
          <div className="mb-12">
            <div className="flex justify-center space-x-3 mb-6">
              {sections.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-700 ${
                    index === currentSection 
                      ? 'w-16 bg-white shadow-lg' 
                      : index < currentSection 
                        ? 'w-8 bg-white/60' 
                        : 'w-4 bg-white/20'
                  }`}
                />
              ))}
            </div>
            <p className="text-white/50 text-sm font-medium tracking-[0.2em] uppercase">
              {String(currentSection + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
            </p>
          </div>

          {/* Main content with enhanced animations */}
          <div 
            className="transition-all duration-1000 ease-out"
            style={{
              transform: `translateY(${Math.sin(scrollProgress * Math.PI) * 15}px) scale(${0.95 + scrollProgress * 0.05})`,
              opacity: 1
            }}
          >
            <h1 
              className="text-5xl md:text-8xl lg:text-9xl font-bold mb-8 leading-[0.9]"
              style={{
                background: `linear-gradient(135deg, 
                  hsl(${200 + currentSection * 60}, 70%, 80%) 0%, 
                  hsl(${220 + currentSection * 40}, 80%, 90%) 50%, 
                  white 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 0 40px rgba(255,255,255,0.1)'
              }}
            >
              {currentSectionData.title}
            </h1>
            
            <h2 className="text-2xl md:text-4xl font-light mb-10 text-white/80 max-w-4xl mx-auto leading-relaxed">
              {currentSectionData.subtitle}
            </h2>
            
            <p className="text-lg md:text-2xl leading-relaxed mb-16 max-w-4xl mx-auto text-white/60 font-light">
              {currentSectionData.description}
            </p>

            {/* Enhanced stats display */}
            <div 
              className="inline-flex items-center px-10 py-6 rounded-full backdrop-blur-xl border border-white/10 relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, 
                  rgba(255,255,255,0.05) 0%, 
                  rgba(255,255,255,0.1) 50%, 
                  rgba(255,255,255,0.05) 100%)`,
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-4 h-4 rounded-full animate-pulse"
                  style={{
                    background: `hsl(${200 + currentSection * 60}, 70%, 60%)`,
                    boxShadow: `0 0 20px hsl(${200 + currentSection * 60}, 70%, 60%)`
                  }}
                />
                <span className="text-xl md:text-2xl font-semibold tracking-wide">
                  {currentSectionData.stats}
                </span>
              </div>
              
              {/* Animated background */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  background: `linear-gradient(90deg, 
                    transparent 0%, 
                    hsl(${200 + currentSection * 60}, 70%, 60%) 50%, 
                    transparent 100%)`,
                  transform: `translateX(${-100 + scrollProgress * 200}%)`
                }}
              />
            </div>
          </div>

          {/* Enhanced scroll indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-14 border-2 border-white/20 rounded-full flex justify-center backdrop-blur-sm">
              <div 
                className="w-1.5 bg-white/60 rounded-full mt-3 transition-all duration-500"
                style={{ 
                  height: `${16 + Math.sin(scrollProgress * Math.PI * 4) * 4}px`,
                  opacity: 0.4 + Math.sin(scrollProgress * Math.PI * 2) * 0.3,
                  boxShadow: '0 0 10px rgba(255,255,255,0.5)'
                }}
              />
            </div>
            <p className="text-white/30 text-xs mt-3 tracking-wider">SCROLL</p>
          </div>
        </div>

        {/* Floating elements with physics */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 30 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${4 + (i % 3) * 2}px`,
                height: `${4 + (i % 3) * 2}px`,
                left: `${5 + (i % 6) * 15}%`,
                top: `${10 + Math.floor(i / 6) * 15}%`,
                background: `hsl(${200 + currentSection * 60 + i * 10}, 70%, 70%)`,
                transform: `
                  translate(
                    ${Math.sin(scrollProgress * Math.PI * 2 + i * 0.5) * 100}px, 
                    ${Math.cos(scrollProgress * Math.PI * 1.5 + i * 0.3) * 60}px
                  ) 
                  scale(${0.3 + Math.sin(scrollProgress * Math.PI * 3 + i) * 0.7})
                  rotate(${scrollProgress * 360 + i * 30}deg)
                `,
                opacity: 0.1 + Math.sin(scrollProgress * Math.PI * 2 + i) * 0.2,
                transition: 'transform 0.1s ease-out',
                boxShadow: `0 0 20px hsl(${200 + currentSection * 60 + i * 10}, 70%, 70%)`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppleStyleStorySection;