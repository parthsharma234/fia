import { useState, useEffect, useRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { DollarSign, TrendingUp, Shield, BookOpen } from 'lucide-react';

const StorytellingSection = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.2);
  const scrollRef = useRef<HTMLDivElement>(null);

  const stories = [
    {
      id: 1,
      title: "The Problem",
      subtitle: "Only 57% of American adults are financially literate",
      description: "Most students graduate without understanding basic financial concepts like budgeting, investing, or credit scores. This gap leaves them vulnerable to debt and poor financial decisions.",
      icon: DollarSign,
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
      stats: "43% of students have no financial education"
    },
    {
      id: 2,
      title: "Our Solution",
      subtitle: "Student-led financial education that actually works",
      description: "We believe students learn better from students. Our peer-to-peer approach makes financial concepts relatable and engaging, breaking down complex topics into digestible lessons.",
      icon: BookOpen,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop",
      stats: "85% improvement in financial confidence"
    },
    {
      id: 3,
      title: "Real Impact",
      subtitle: "Transforming financial futures, one student at a time",
      description: "Our graduates report significantly better financial habits, from saving money to making informed investment decisions. They're building wealth earlier and avoiding common financial pitfalls.",
      icon: TrendingUp,
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop",
      stats: "200+ students across 7 chapters"
    },
    {
      id: 4,
      title: "Building the Future",
      subtitle: "Creating a generation of financially empowered leaders",
      description: "Every student we educate becomes an advocate for financial literacy in their community. They share knowledge with friends, family, and future generations, creating a ripple effect of positive change.",
      icon: Shield,
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=600&fit=crop",
      stats: "Expanding to 10+ states by 2025"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;

      const rect = scrollRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      const storyIndex = Math.floor(progress * stories.length);
      
      if (storyIndex !== currentStory && storyIndex < stories.length) {
        setCurrentStory(storyIndex);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentStory, stories.length]);

  const currentStoryData = stories[currentStory];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-background relative overflow-hidden"
    >
      <div 
        ref={scrollRef}
        className="min-h-[400vh] relative"
      >
        {/* Sticky content container */}
        <div className="sticky top-0 h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Content side */}
              <div className={`space-y-8 transition-all duration-1000 ${
                isVisible ? 'animate-fade-in-up' : ''
              }`}>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                    <currentStoryData.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-primary uppercase tracking-wider">
                    Chapter {currentStory + 1}
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-5xl md:text-6xl font-bold text-foreground transition-all duration-700">
                    {currentStoryData.title}
                  </h2>
                  
                  <h3 className="text-2xl md:text-3xl text-primary font-semibold transition-all duration-700 delay-200">
                    {currentStoryData.subtitle}
                  </h3>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed transition-all duration-700 delay-400">
                    {currentStoryData.description}
                  </p>

                  <div className="inline-flex items-center px-6 py-3 bg-primary/10 rounded-full transition-all duration-700 delay-600">
                    <TrendingUp className="w-5 h-5 text-primary mr-2" />
                    <span className="text-primary font-semibold">{currentStoryData.stats}</span>
                  </div>
                </div>

                {/* Progress indicators */}
                <div className="flex space-x-3">
                  {stories.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index === currentStory
                          ? 'w-12 bg-primary'
                          : 'w-3 bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Image side */}
              <div className="relative">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img
                    src={currentStoryData.image}
                    alt={currentStoryData.title}
                    className="w-full h-[600px] object-cover transition-all duration-1000 transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                
                {/* Floating elements */}
                <div className={`absolute -top-6 -right-6 w-24 h-24 bg-secondary/20 rounded-full blur-xl transition-all duration-1000 ${
                  isVisible ? 'animate-pulse' : ''
                }`} />
                <div className={`absolute -bottom-8 -left-8 w-32 h-32 bg-primary/20 rounded-full blur-xl transition-all duration-1000 delay-300 ${
                  isVisible ? 'animate-pulse' : ''
                }`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorytellingSection;