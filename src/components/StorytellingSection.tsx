import { useState, useEffect, useRef, useCallback } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { DollarSign, TrendingUp, Shield, BookOpen, PiggyBank, Target, Lightbulb } from 'lucide-react';

const StorytellingSection = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const stories = [
    {
      id: 1,
      title: "The Crisis",
      subtitle: "Only 57% of American adults are financially literate",
      description: "Most students graduate without understanding basic financial concepts like budgeting, investing, or credit scores. This knowledge gap leaves them vulnerable to debt, poor decisions, and financial stress that can last decades.",
      icon: DollarSign,
      color: "#ef4444",
      accent: "#fca5a5",
      images: [
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop",
      ],
      stats: "43% of students receive zero financial education"
    },
    {
      id: 2,
      title: "Student Power",
      subtitle: "Peer-to-peer learning that breaks barriers",
      description: "Students learn better from students. Our peer educators make complex financial concepts relatable and engaging, creating an environment where questions are welcomed and learning feels natural.",
      icon: BookOpen,
      color: "#3b82f6",
      accent: "#93c5fd",
      images: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?w=1200&h=800&fit=crop",
      ],
      stats: "85% improvement in financial confidence"
    },
    {
      id: 3,
      title: "Real Results",
      subtitle: "Transforming futures, one student at a time",
      description: "Our program graduates show measurably better financial habits: they save more, invest earlier, and make informed decisions about credit and debt. They're building wealth and avoiding common financial pitfalls.",
      icon: TrendingUp,
      color: "#10b981",
      accent: "#6ee7b7",
      images: [
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=1200&h=800&fit=crop",
      ],
      stats: "Students save 3x more after our program"
    },
    {
      id: 4,
      title: "Ripple Effect",
      subtitle: "Creating a generation of financial advocates",
      description: "Every student we educate becomes a financial literacy ambassador. They share knowledge with friends, family, and their future children, creating exponential impact that transforms entire communities.",
      icon: Shield,
      color: "#8b5cf6",
      accent: "#c4b5fd",
      images: [
        "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop",
      ],
      stats: "Expanding to 15+ states by 2025"
    }
  ];

  const updateCanvas = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * window.devicePixelRatio;
    canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    
    canvas.style.width = canvas.offsetWidth + 'px';
    canvas.style.height = canvas.offsetHeight + 'px';

    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    // Create dynamic background based on story
    const currentStoryData = stories[currentStory];
    const nextStoryIndex = (currentStory + 1) % stories.length;
    const nextStoryData = stories[nextStoryIndex];
    
    // Smooth story transition
    const storyProgress = (progress * stories.length) % 1;
    
    // Create gradient background
    const gradient = ctx.createRadialGradient(
      canvas.offsetWidth * 0.7, 
      canvas.offsetHeight * 0.3, 
      0,
      canvas.offsetWidth * 0.7, 
      canvas.offsetHeight * 0.3, 
      canvas.offsetWidth * 0.8
    );
    
    gradient.addColorStop(0, `${currentStoryData.color}20`);
    gradient.addColorStop(0.6, `${currentStoryData.accent}10`);
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    // Animated particles
    const time = Date.now() * 0.001;
    for (let i = 0; i < 20; i++) {
      const x = (canvas.offsetWidth * 0.8) + Math.sin(time + i * 0.5) * 100;
      const y = (canvas.offsetHeight * 0.5) + Math.cos(time + i * 0.7) * 150;
      const radius = 2 + Math.sin(time + i) * 1;
      const opacity = 0.3 + Math.sin(time + i * 0.3) * 0.2;
      
      ctx.fillStyle = `${currentStoryData.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Floating icons
    const IconComponent = currentStoryData.icon;
    ctx.fillStyle = `${currentStoryData.color}40`;
    ctx.fillRect(canvas.offsetWidth * 0.75, canvas.offsetHeight * 0.25, 80, 80);
  }, [currentStory, stories]);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;

      const rect = scrollRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollHeight = rect.height;
      
      // More precise progress calculation
      const rawProgress = Math.max(0, Math.min(1, 
        (viewportHeight - rect.top) / (viewportHeight + scrollHeight)
      ));
      
      setScrollProgress(rawProgress);
      
      // Smoother story transitions
      const storyIndex = Math.max(0, Math.min(stories.length - 1, 
        Math.floor(rawProgress * stories.length)
      ));
      
      if (storyIndex !== currentStory) {
        setCurrentStory(storyIndex);
      }

      updateCanvas(rawProgress);
    };

    const animate = () => {
      updateCanvas(scrollProgress);
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
  }, [currentStory, stories.length, scrollProgress, updateCanvas]);

  const currentStoryData = stories[currentStory];
  const storyProgress = (scrollProgress * stories.length) % 1;
  const imageIndex = Math.floor(storyProgress * currentStoryData.images.length);
  const currentImage = currentStoryData.images[imageIndex];

  return (
    <section 
      ref={sectionRef}
      className="relative bg-black text-white overflow-hidden"
    >
      <div 
        ref={scrollRef}
        className="min-h-[500vh] relative"
      >
        {/* Sticky content container */}
        <div className="sticky top-0 h-screen">
          <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left side - Content with sticky text */}
            <div className="relative z-20 flex items-center justify-center lg:justify-start">
              <div className="max-w-lg mx-auto lg:mx-0 lg:ml-16 xl:ml-24 p-8 lg:p-0">
                
                {/* Story indicator */}
                <div className="flex items-center space-x-4 mb-8">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-700"
                    style={{ 
                      background: `linear-gradient(135deg, ${currentStoryData.color}, ${currentStoryData.accent})` 
                    }}
                  >
                    <currentStoryData.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm font-semibold uppercase tracking-wider opacity-70">
                    Chapter {currentStory + 1} of {stories.length}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <h2 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-700"
                    style={{ 
                      transform: `translateY(${(1 - storyProgress) * 20}px)`,
                      opacity: Math.max(0.3, 1 - Math.abs(storyProgress - 0.5) * 2)
                    }}
                  >
                    {currentStoryData.title}
                  </h2>
                  
                  <h3 
                    className="text-xl md:text-2xl font-semibold leading-relaxed transition-all duration-700 delay-100"
                    style={{ 
                      color: currentStoryData.color,
                      transform: `translateY(${(1 - storyProgress) * 15}px)`,
                      opacity: Math.max(0.4, 1 - Math.abs(storyProgress - 0.5) * 2)
                    }}
                  >
                    {currentStoryData.subtitle}
                  </h3>
                  
                  <p 
                    className="text-lg leading-relaxed opacity-90 transition-all duration-700 delay-200"
                    style={{ 
                      transform: `translateY(${(1 - storyProgress) * 10}px)`,
                      opacity: Math.max(0.5, 1 - Math.abs(storyProgress - 0.5) * 2)
                    }}
                  >
                    {currentStoryData.description}
                  </p>

                  <div 
                    className="inline-flex items-center px-6 py-3 rounded-full transition-all duration-700 delay-300"
                    style={{ 
                      backgroundColor: `${currentStoryData.color}20`,
                      border: `1px solid ${currentStoryData.color}40`,
                      transform: `translateY(${(1 - storyProgress) * 5}px)`,
                      opacity: Math.max(0.6, 1 - Math.abs(storyProgress - 0.5) * 2)
                    }}
                  >
                    <TrendingUp className="w-5 h-5 mr-2" style={{ color: currentStoryData.color }} />
                    <span className="font-semibold" style={{ color: currentStoryData.color }}>
                      {currentStoryData.stats}
                    </span>
                  </div>
                </div>

                {/* Progress indicators */}
                <div className="flex space-x-3 mt-12">
                  {stories.map((story, index) => (
                    <div
                      key={index}
                      className="h-1 rounded-full transition-all duration-500"
                      style={{
                        width: index === currentStory ? '48px' : '12px',
                        backgroundColor: index === currentStory ? currentStoryData.color : 'rgba(255,255,255,0.3)'
                      }}
                    />
                  ))}
                </div>

                {/* Scroll progress */}
                <div className="mt-8 w-full bg-white/10 rounded-full h-1">
                  <div 
                    className="h-1 rounded-full transition-all duration-100"
                    style={{ 
                      width: `${scrollProgress * 100}%`,
                      backgroundColor: currentStoryData.color
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Right side - Visual showcase */}
            <div className="relative h-screen overflow-hidden">
              {/* Canvas for dynamic animations */}
              <canvas 
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                style={{ background: 'transparent' }}
              />
              
              {/* Dynamic image showcase */}
              <div className="absolute inset-0 z-0">
                <div 
                  className="w-full h-full transition-all duration-1000 ease-out"
                  style={{
                    transform: `scale(${1 + scrollProgress * 0.1}) rotate(${scrollProgress * 2}deg)`,
                  }}
                >
                  <img
                    src={currentImage}
                    alt={currentStoryData.title}
                    className="w-full h-full object-cover transition-all duration-1000"
                    style={{
                      filter: `brightness(${0.7 + storyProgress * 0.3}) contrast(${1.1 + storyProgress * 0.2})`,
                      transform: `translateY(${Math.sin(scrollProgress * Math.PI * 2) * 20}px)`
                    }}
                  />
                </div>
                
                {/* Dynamic overlay */}
                <div 
                  className="absolute inset-0 transition-all duration-1000"
                  style={{
                    background: `linear-gradient(135deg, ${currentStoryData.color}30, transparent 70%)`
                  }}
                />
                
                {/* Parallax elements */}
                <div 
                  className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full blur-3xl transition-all duration-1000"
                  style={{
                    backgroundColor: `${currentStoryData.accent}40`,
                    transform: `translate(${Math.sin(scrollProgress * Math.PI) * 50}px, ${Math.cos(scrollProgress * Math.PI) * 30}px) scale(${1 + storyProgress * 0.5})`,
                    opacity: 0.6 + Math.sin(scrollProgress * Math.PI * 2) * 0.3
                  }}
                />
                
                <div 
                  className="absolute bottom-1/3 left-1/3 w-24 h-24 rounded-full blur-2xl transition-all duration-1000"
                  style={{
                    backgroundColor: `${currentStoryData.color}50`,
                    transform: `translate(${Math.cos(scrollProgress * Math.PI * 1.5) * 40}px, ${Math.sin(scrollProgress * Math.PI * 1.5) * 25}px) scale(${0.8 + storyProgress * 0.4})`,
                    opacity: 0.4 + Math.cos(scrollProgress * Math.PI * 2) * 0.2
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorytellingSection;