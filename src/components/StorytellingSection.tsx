import { useState, useEffect, useRef, useCallback } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { DollarSign, TrendingUp, Shield, BookOpen, Brain, Users, Lightbulb, Target } from 'lucide-react';

const StorytellingSection = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const lastScrollTime = useRef(0);
  const scrollVelocity = useRef(0);

  const stories = [
    {
      id: 1,
      title: "The Crisis",
      subtitle: "Only 57% of American adults are financially literate",
      description: "Most students graduate without understanding basic financial concepts like budgeting, investing, or credit scores. This knowledge gap leaves them vulnerable to debt, poor decisions, and financial stress that can last decades.",
      icon: DollarSign,
      images: [
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=800&fit=crop",
      ],
      stats: "43% of students receive zero financial education",
      bgGradient: "from-red-500/20 via-orange-500/10 to-transparent"
    },
    {
      id: 2,
      title: "Student Power",
      subtitle: "Peer-to-peer learning that breaks barriers",
      description: "Students learn better from students. Our peer educators make complex financial concepts relatable and engaging, creating an environment where questions are welcomed and learning feels natural.",
      icon: Users,
      images: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop",
      ],
      stats: "85% improvement in financial confidence",
      bgGradient: "from-blue-500/20 via-indigo-500/10 to-transparent"
    },
    {
      id: 3,
      title: "Real Results",
      subtitle: "Transforming futures, one student at a time",
      description: "Our program graduates show measurably better financial habits: they save more, invest earlier, and make informed decisions about credit and debt. They're building wealth and avoiding common financial pitfalls.",
      icon: TrendingUp,
      images: [
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1200&h=800&fit=crop",
      ],
      stats: "Students save 3x more after our program",
      bgGradient: "from-green-500/20 via-emerald-500/10 to-transparent"
    },
    {
      id: 4,
      title: "Ripple Effect",
      subtitle: "Creating a generation of financial advocates",
      description: "Every student we educate becomes a financial literacy ambassador. They share knowledge with friends, family, and their future children, creating exponential impact that transforms entire communities.",
      icon: Brain,
      images: [
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&h=800&fit=crop",
      ],
      stats: "Expanding to 15+ states by 2025",
      bgGradient: "from-purple-500/20 via-pink-500/10 to-transparent"
    }
  ];

  const updateCanvas = useCallback((progress: number, velocity: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    ctx.scale(dpr, dpr);
    
    canvas.style.width = canvas.offsetWidth + 'px';
    canvas.style.height = canvas.offsetHeight + 'px';

    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    const currentStoryData = stories[currentStory];
    const time = Date.now() * 0.001;
    
    // Animated grid background
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    const gridSize = 50 + Math.sin(time) * 10;
    for (let x = 0; x < canvas.offsetWidth; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.offsetHeight);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.offsetHeight; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.offsetWidth, y);
      ctx.stroke();
    }

    // Dynamic particles with physics
    const particleCount = 50 + Math.floor(velocity * 20);
    for (let i = 0; i < particleCount; i++) {
      const angle = (time + i * 0.1) % (Math.PI * 2);
      const radius = 100 + Math.sin(time + i * 0.2) * 50;
      const x = canvas.offsetWidth * 0.5 + Math.cos(angle) * radius;
      const y = canvas.offsetHeight * 0.5 + Math.sin(angle) * radius * 0.5;
      const size = 1 + Math.sin(time + i) * 2 + velocity * 5;
      const opacity = 0.2 + Math.sin(time + i * 0.3) * 0.3 + velocity * 0.5;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(opacity, 0.8)})`;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // Connecting lines
      if (i % 3 === 0) {
        const nextIndex = (i + 1) % particleCount;
        const nextAngle = (time + nextIndex * 0.1) % (Math.PI * 2);
        const nextX = canvas.offsetWidth * 0.5 + Math.cos(nextAngle) * radius;
        const nextY = canvas.offsetHeight * 0.5 + Math.sin(nextAngle) * radius * 0.5;
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(nextX, nextY);
        ctx.stroke();
      }
    }

    // Floating geometric shapes
    for (let i = 0; i < 8; i++) {
      const shapeTime = time + i * 1.5;
      const x = canvas.offsetWidth * 0.2 + Math.sin(shapeTime * 0.5) * canvas.offsetWidth * 0.6;
      const y = canvas.offsetHeight * 0.2 + Math.cos(shapeTime * 0.3) * canvas.offsetHeight * 0.6;
      const size = 20 + Math.sin(shapeTime) * 15 + velocity * 10;
      const rotation = shapeTime + velocity * 2;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + Math.sin(shapeTime) * 0.1})`;
      
      if (i % 3 === 0) {
        // Triangle
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size * 0.866, size * 0.5);
        ctx.lineTo(-size * 0.866, size * 0.5);
        ctx.closePath();
        ctx.fill();
      } else if (i % 3 === 1) {
        // Square
        ctx.fillRect(-size/2, -size/2, size, size);
      } else {
        // Circle
        ctx.beginPath();
        ctx.arc(0, 0, size/2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      ctx.restore();
    }
  }, [currentStory, stories]);

  const smoothScrollToStory = useCallback((targetStory: number) => {
    if (targetStory < 0 || targetStory >= stories.length) return;
    
    setIsScrollLocked(true);
    setCurrentStory(targetStory);
    
    // Unlock after animation
    setTimeout(() => {
      setIsScrollLocked(false);
    }, 800);
  }, [stories.length]);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (ticking || !scrollRef.current) return;
      
      ticking = true;
      
      requestAnimationFrame(() => {
        const rect = scrollRef.current!.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrollHeight = rect.height;
        
        const rawProgress = Math.max(0, Math.min(1, 
          (viewportHeight - rect.top) / (viewportHeight + scrollHeight)
        ));
        
        // Calculate scroll velocity
        const now = Date.now();
        const deltaTime = now - lastScrollTime.current;
        const deltaProgress = rawProgress - scrollProgress;
        scrollVelocity.current = Math.abs(deltaProgress) / (deltaTime || 1) * 1000;
        lastScrollTime.current = now;
        
        setScrollProgress(rawProgress);
        
        // Enhanced story progression with momentum
        const storyFloat = rawProgress * (stories.length - 0.1);
        const targetStory = Math.max(0, Math.min(stories.length - 1, Math.floor(storyFloat)));
        
        if (targetStory !== currentStory && !isScrollLocked) {
          // Add momentum-based story switching
          if (scrollVelocity.current > 0.5) {
            smoothScrollToStory(targetStory);
          } else {
            setCurrentStory(targetStory);
          }
        }

        updateCanvas(rawProgress, Math.min(scrollVelocity.current, 2));
        ticking = false;
      });
    };

    const animate = () => {
      updateCanvas(scrollProgress, scrollVelocity.current);
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [currentStory, stories.length, scrollProgress, updateCanvas, smoothScrollToStory, isScrollLocked]);

  const currentStoryData = stories[currentStory];
  const storyProgress = (scrollProgress * stories.length) % 1;
  
  // More sophisticated image sequencing
  const totalImages = currentStoryData.images.length;
  const imageProgress = storyProgress * (totalImages - 1);
  const imageIndex = Math.floor(imageProgress);
  const imageBlend = imageProgress - imageIndex;
  const currentImage = currentStoryData.images[imageIndex];
  const nextImage = currentStoryData.images[Math.min(imageIndex + 1, totalImages - 1)];

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black text-white overflow-hidden"
    >
      <div 
        ref={scrollRef}
        className="min-h-[600vh] relative"
      >
        {/* Sticky content container */}
        <div className="sticky top-0 h-screen">
          <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left side - Content with enhanced animations */}
            <div className="relative z-20 flex items-center justify-center lg:justify-start">
              <div className="max-w-lg mx-auto lg:mx-0 lg:ml-16 xl:ml-24 p-8 lg:p-0">
                
                {/* Story indicator with enhanced animation */}
                <div 
                  className="flex items-center space-x-4 mb-8 transition-all duration-1000 ease-out"
                  style={{
                    transform: `translateX(${Math.sin(scrollProgress * Math.PI * 4) * 10}px) scale(${1 + scrollProgress * 0.1})`,
                    filter: `brightness(${1 + Math.sin(scrollProgress * Math.PI * 2) * 0.2})`
                  }}
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700 relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))`,
                      transform: `rotate(${scrollProgress * 360}deg) scale(${1 + Math.sin(scrollProgress * Math.PI * 8) * 0.1})`,
                      boxShadow: `0 0 30px rgba(255,255,255,${0.2 + scrollProgress * 0.3})`
                    }}
                  >
                    <currentStoryData.icon 
                      className="w-8 h-8 text-white transition-all duration-500" 
                      style={{
                        transform: `scale(${1 + Math.sin(scrollProgress * Math.PI * 6) * 0.2})`
                      }}
                    />
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      style={{
                        transform: `translateX(${-100 + scrollProgress * 200}%)`
                      }}
                    />
                  </div>
                  <div 
                    className="text-sm font-semibold uppercase tracking-wider opacity-70 transition-all duration-700"
                    style={{
                      transform: `translateY(${Math.sin(scrollProgress * Math.PI * 3) * 5}px)`
                    }}
                  >
                    Chapter {currentStory + 1} of {stories.length}
                  </div>
                </div>

                {/* Content with sophisticated animations */}
                <div className="space-y-6">
                  <h2 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-1000 ease-out"
                    style={{ 
                      transform: `translateY(${Math.sin(scrollProgress * Math.PI * 2) * 20}px) rotateX(${Math.sin(scrollProgress * Math.PI) * 10}deg)`,
                      opacity: 1,
                      textShadow: `0 0 20px rgba(255,255,255,${0.1 + scrollProgress * 0.2})`
                    }}
                  >
                    {currentStoryData.title}
                  </h2>
                  
                  <h3 
                    className="text-xl md:text-2xl font-semibold leading-relaxed transition-all duration-1000 delay-100 text-primary"
                    style={{ 
                      transform: `translateY(${Math.sin(scrollProgress * Math.PI * 2.5) * 15}px) scale(${1 + Math.sin(scrollProgress * Math.PI * 4) * 0.05})`,
                      opacity: 1
                    }}
                  >
                    {currentStoryData.subtitle}
                  </h3>
                  
                  <p 
                    className="text-lg leading-relaxed opacity-90 transition-all duration-1000 delay-200"
                    style={{ 
                      transform: `translateY(${Math.sin(scrollProgress * Math.PI * 3) * 10}px)`,
                      opacity: 0.9
                    }}
                  >
                    {currentStoryData.description}
                  </p>

                  <div 
                    className="inline-flex items-center px-6 py-3 rounded-full transition-all duration-1000 delay-300 relative overflow-hidden"
                    style={{ 
                      backgroundColor: `hsl(var(--primary) / 0.2)`,
                      border: `1px solid hsl(var(--primary) / 0.4)`,
                      transform: `translateY(${Math.sin(scrollProgress * Math.PI * 4) * 5}px) scale(${1 + Math.sin(scrollProgress * Math.PI * 6) * 0.05})`,
                      boxShadow: `0 0 20px hsl(var(--primary) / ${0.2 + scrollProgress * 0.3})`
                    }}
                  >
                    <TrendingUp 
                      className="w-5 h-5 mr-2 text-primary transition-all duration-300" 
                      style={{
                        transform: `rotate(${scrollProgress * 180}deg)`
                      }}
                    />
                    <span className="font-semibold text-primary">
                      {currentStoryData.stats}
                    </span>
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                      style={{
                        transform: `translateX(${-100 + scrollProgress * 200}%)`
                      }}
                    />
                  </div>
                </div>

                {/* Enhanced progress indicators */}
                <div className="flex space-x-3 mt-12">
                  {stories.map((story, index) => (
                    <div
                      key={index}
                      className="h-1 rounded-full transition-all duration-500 relative overflow-hidden"
                      style={{
                        width: index === currentStory ? '48px' : '12px',
                        backgroundColor: index === currentStory ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.3)',
                        transform: `scale(${index === currentStory ? 1 + Math.sin(scrollProgress * Math.PI * 8) * 0.2 : 1})`,
                        boxShadow: index === currentStory ? `0 0 10px hsl(var(--primary))` : 'none'
                      }}
                    >
                      {index === currentStory && (
                        <div 
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                          style={{
                            transform: `translateX(${-100 + scrollProgress * 200}%)`
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Enhanced scroll progress */}
                <div className="mt-8 w-full bg-white/10 rounded-full h-1 relative overflow-hidden">
                  <div 
                    className="h-1 rounded-full transition-all duration-100 relative"
                    style={{ 
                      width: `${scrollProgress * 100}%`,
                      backgroundColor: 'hsl(var(--primary))',
                      boxShadow: `0 0 10px hsl(var(--primary))`
                    }}
                  >
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
                      style={{
                        transform: `translateX(${-100 + scrollProgress * 200}%)`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Enhanced visual showcase */}
            <div className="relative h-screen overflow-hidden">
              {/* Enhanced canvas with more complex animations */}
              <canvas 
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-30"
                style={{ background: 'transparent' }}
              />
              
              {/* Multi-layered image showcase */}
              <div className="absolute inset-0 z-0">
                {/* Primary image */}
                <div 
                  className="absolute inset-0 transition-all duration-1000 ease-out"
                  style={{
                    transform: `scale(${1 + scrollProgress * 0.2}) rotate(${Math.sin(scrollProgress * Math.PI) * 2}deg) translate3d(${Math.sin(scrollProgress * Math.PI * 2) * 20}px, ${Math.cos(scrollProgress * Math.PI * 2) * 10}px, 0)`,
                    opacity: 1 - imageBlend * 0.3
                  }}
                >
                  <img
                    src={currentImage}
                    alt={currentStoryData.title}
                    className="w-full h-full object-cover"
                    style={{
                      filter: `brightness(${0.8 + Math.sin(scrollProgress * Math.PI) * 0.2}) contrast(${1.2 + Math.sin(scrollProgress * Math.PI * 2) * 0.3}) saturate(${1.1 + Math.sin(scrollProgress * Math.PI * 3) * 0.2})`,
                      transform: `scale(${1.1 + Math.sin(scrollProgress * Math.PI * 4) * 0.1})`
                    }}
                  />
                </div>
                
                {/* Secondary blending image */}
                <div 
                  className="absolute inset-0 transition-all duration-1000 ease-out"
                  style={{
                    transform: `scale(${1.1 + scrollProgress * 0.15}) rotate(${-Math.sin(scrollProgress * Math.PI) * 1.5}deg)`,
                    opacity: imageBlend * 0.7
                  }}
                >
                  <img
                    src={nextImage}
                    alt="Next story"
                    className="w-full h-full object-cover"
                    style={{
                      filter: `brightness(${0.9 + Math.cos(scrollProgress * Math.PI) * 0.1}) contrast(${1.1 + Math.cos(scrollProgress * Math.PI * 2) * 0.2})`,
                      mixBlendMode: 'multiply'
                    }}
                  />
                </div>
                
                {/* Dynamic gradient overlay */}
                <div 
                  className={`absolute inset-0 transition-all duration-1000 bg-gradient-to-br ${currentStoryData.bgGradient}`}
                  style={{
                    opacity: 0.3 + Math.sin(scrollProgress * Math.PI * 2) * 0.2
                  }}
                />
                
                {/* Enhanced parallax elements */}
                {Array.from({ length: 12 }, (_, i) => (
                  <div 
                    key={i}
                    className="absolute rounded-full blur-3xl transition-all duration-1000"
                    style={{
                      width: `${60 + i * 10}px`,
                      height: `${60 + i * 10}px`,
                      backgroundColor: `hsla(${(i * 30 + scrollProgress * 360) % 360}, 70%, 70%, ${0.2 + Math.sin(scrollProgress * Math.PI * (i + 1)) * 0.1})`,
                      left: `${20 + (i % 4) * 20}%`,
                      top: `${20 + Math.floor(i / 4) * 25}%`,
                      transform: `
                        translate(${Math.sin(scrollProgress * Math.PI * (i + 1)) * 50}px, ${Math.cos(scrollProgress * Math.PI * (i + 1.5)) * 30}px) 
                        scale(${0.5 + Math.sin(scrollProgress * Math.PI * (i + 2)) * 0.5})
                        rotate(${scrollProgress * 360 * (i % 2 === 0 ? 1 : -1)}deg)
                      `,
                      animation: `pulse ${2 + i * 0.5}s ease-in-out infinite alternate`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorytellingSection;