import { useEffect, useRef, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const StorytellingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  
  // Phase refs for individual animations
  const { ref: problemRef, isVisible: problemVisible } = useScrollAnimation(0.3);
  const { ref: middleSchoolRef, isVisible: middleSchoolVisible } = useScrollAnimation(0.3);
  const { ref: consequencesRef, isVisible: consequencesVisible } = useScrollAnimation(0.3);
  const { ref: hopeRef, isVisible: hopeVisible } = useScrollAnimation(0.3);
  const { ref: solutionRef, isVisible: solutionVisible } = useScrollAnimation(0.3);
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation(0.2);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phases = [
    {
      id: 'problem',
      title: 'A Hidden Crisis in Plain Sight',
      subtitle: 'The Cost of Financial Illiteracy',
      description: 'Every day, millions of young people enter adulthood without basic financial knowledge. The consequences ripple through generations.',
      statistic: '88%',
      statisticLabel: 'of young adults wish they had learned about money earlier',
      image: 'https://images.unsplash.com/photo-1699645522859-512f53d4a4bf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxjb25mdXNlZCUyMG1vbmV5fGVufDB8fHx8MTc1MzQ3MjkyMnww&ixlib=rb-4.1.0&q=85',
      ref: problemRef,
      isVisible: problemVisible,
      theme: 'dark'
    },
    {
      id: 'focus',
      title: 'The Forgotten Generation',
      subtitle: 'Middle Schoolers at the Crossroads',
      description: 'At 12-14 years old, they\'re making their first financial decisions. Yet most receive no guidance, leaving them to navigate complex money choices alone.',
      statistic: '23%',
      statisticLabel: 'of middle schoolers have access to financial education',
      image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxzZWFyY2h8MXx8bWlkZGxlJTIwc2Nob29sJTIwc3R1ZGVudHN8ZW58MHx8fHwxNzUzNDcyOTE1fDA&ixlib=rb-4.1.0&q=85',
      ref: middleSchoolRef,
      isVisible: middleSchoolVisible,
      theme: 'light'
    },
    {
      id: 'consequences',
      title: 'The Ripple Effect',
      subtitle: 'When Financial Literacy Fails',
      description: 'Without early financial education, young people face decades of poor decisions, debt, and missed opportunities. The cycle continues.',
      quote: '"I wish someone had taught me about budgeting when I was young. I could have avoided so many mistakes."',
      quoteAuthor: '— Recent Graduate',
      image: 'https://images.unsplash.com/photo-1459257831348-f0cdd359235f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzh8MHwxfHNlYXJjaHwzfHxmaW5hbmNpYWwlMjBlZHVjYXRpb258ZW58MHx8fHwxNzUzNDcyOTMxfDA&ixlib=rb-4.1.0&q=85',
      ref: consequencesRef,
      isVisible: consequencesVisible,
      theme: 'dark'
    },
    {
      id: 'hope',
      title: 'Breaking Through',
      subtitle: 'A New Path Forward',
      description: 'But what if we could change this story? What if middle schoolers had the tools, confidence, and knowledge to make smart financial decisions from the start?',
      image: 'https://images.unsplash.com/photo-1666552554714-0a27235eaa43?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwzfHxicmVha2luZyUyMGJhcnJpZXJzfGVufDB8fHx8MTc1MzQ3Mjk3MXww&ixlib=rb-4.1.0&q=85',
      ref: hopeRef,
      isVisible: hopeVisible,
      theme: 'gradient'
    },
    {
      id: 'solution',
      title: 'The Journey Begins',
      subtitle: 'Emergent Steps Forward',
      description: 'We\'re building the bridge from financial confusion to financial confidence. One student, one classroom, one community at a time.',
      image: 'https://images.unsplash.com/photo-1602593427039-9272b7fb0429?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwxfHxzdWNjZXNzJTIwam91cm5leXxlbnwwfHx8fDE3NTM0NzI5OTN8MA&ixlib=rb-4.1.0&q=85',
      ref: solutionRef,
      isVisible: solutionVisible,
      theme: 'light'
    }
  ];

  return (
    <section ref={sectionRef} className="relative">
      {/* Story Phases */}
      {phases.map((phase, index) => (
        <div
          key={phase.id}
          ref={phase.ref}
          className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
            phase.theme === 'dark' 
              ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
              : phase.theme === 'gradient'
              ? 'bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/20'
              : 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
          }`}
        >
          {/* Background Image with parallax */}
          <div className="absolute inset-0">
            <div className={`absolute inset-0 z-10 transition-opacity duration-1000 ${
              phase.theme === 'dark' ? 'bg-slate-900/85' 
              : phase.theme === 'gradient' ? 'bg-primary/15'
              : 'bg-white/92'
            }`}></div>
            <div
              className="w-full h-full bg-cover bg-center transition-all duration-1000 ease-out"
              style={{
                backgroundImage: `url(${phase.image})`,
                transform: `translateY(${scrollY * 0.2}px) scale(${phase.isVisible ? 1 : 1.1})`,
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center transition-all duration-1000 delay-300 ${
              phase.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              
              {/* Subtitle with elegant fade-in */}
              <div className={`text-lg md:text-xl font-medium mb-4 transition-all duration-1000 delay-400 ${
                phase.theme === 'dark' ? 'text-secondary' 
                : phase.theme === 'gradient' ? 'text-primary'
                : 'text-primary/80'
              } ${phase.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {phase.subtitle}
              </div>

              {/* Main Title with staggered letter animation */}
              <h2 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight transition-all duration-1200 delay-600 ${
                phase.theme === 'dark' ? 'text-white' 
                : phase.theme === 'gradient' ? 'text-primary'
                : 'text-slate-800'
              } ${phase.isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}>
                {phase.title}
              </h2>

              {/* Description with elegant entrance */}
              <p className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-800 ${
                phase.theme === 'dark' ? 'text-slate-300' 
                : phase.theme === 'gradient' ? 'text-slate-700'
                : 'text-slate-600'
              } ${phase.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                {phase.description}
              </p>

              {/* Statistics with bounce-in effect */}
              {phase.statistic && (
                <div className={`mb-8 transition-all duration-1200 delay-1000 ${
                  phase.isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                }`}>
                  <div className={`text-6xl md:text-8xl font-bold mb-2 font-mono transition-all duration-800 ${
                    phase.theme === 'dark' ? 'text-secondary' : 'text-primary'
                  } ${phase.isVisible ? 'animate-bounce-in' : ''}`}>
                    {phase.statistic}
                  </div>
                  <div className={`text-lg md:text-xl transition-all duration-800 delay-200 ${
                    phase.theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  } ${phase.isVisible ? 'opacity-100' : 'opacity-0'}`}>
                    {phase.statisticLabel}
                  </div>
                </div>
              )}

              {/* Quote with elegant styling */}
              {phase.quote && (
                <div className={`mb-8 transition-all duration-1000 delay-1000 ${
                  phase.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <blockquote className={`text-2xl md:text-3xl italic mb-4 transition-all duration-800 ${
                    phase.theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
                  }`}>
                    {phase.quote}
                  </blockquote>
                  <cite className={`text-lg transition-all duration-800 delay-200 ${
                    phase.theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    {phase.quoteAuthor}
                  </cite>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced scroll indicator */}
          {index < phases.length - 1 && (
            <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-1000 delay-1200 ${
              phase.isVisible ? 'opacity-60 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className={`w-6 h-10 border-2 rounded-full flex justify-center transition-all duration-300 hover:border-opacity-80 cursor-pointer ${
                phase.theme === 'dark' ? 'border-white/30 hover:border-secondary/50' : 'border-slate-400/50 hover:border-primary/50'
              }`}
              onClick={() => window.scrollTo({ top: window.scrollY + window.innerHeight, behavior: 'smooth' })}>
                <div className={`w-1 h-3 rounded-full mt-2 animate-bounce ${
                  phase.theme === 'dark' ? 'bg-white/60' : 'bg-slate-500/70'
                }`}></div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Mission Statement Climax - Enhanced */}
      <div
        ref={missionRef}
        className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-secondary"
      >
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-1/4 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl transition-all duration-2000 ${
            missionVisible ? 'animate-pulse opacity-100' : 'opacity-0'
          }`}></div>
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl transition-all duration-2000 delay-500 ${
            missionVisible ? 'animate-pulse opacity-100' : 'opacity-0'
          }`}></div>
          <div className={`absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl transition-all duration-2000 delay-1000 ${
            missionVisible ? 'animate-pulse opacity-100' : 'opacity-0'
          }`}></div>
        </div>

        {/* Mission Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1500 delay-300 ${
            missionVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}>
            
            <div className={`text-2xl md:text-3xl font-medium text-secondary mb-8 transition-all duration-1000 delay-500 ${
              missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Our Mission
            </div>

            <h2 className={`text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-12 leading-tight transition-all duration-1200 delay-700 ${
              missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              Empowering the Next Generation with
              <span className={`block text-secondary mt-4 transition-all duration-1000 delay-900 ${
                missionVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}>
                Financial Confidence
              </span>
            </h2>

            <p className={`text-2xl md:text-3xl text-white/90 mb-16 max-w-5xl mx-auto leading-relaxed transition-all duration-1000 delay-1100 ${
              missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              Through accessible education, innovative resources, and impactful partnerships, 
              we bridge the gap in financial literacy for young people everywhere.
            </p>

            <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-1300 ${
              missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <Link to="/programs">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="text-xl px-10 py-6 hover-glow shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  Join Our Mission
                  <ArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" size={24} />
                </Button>
              </Link>
              
              <Link to="/about">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-xl px-10 py-6 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:scale-105"
                >
                  Learn Our Story
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Rising path visual metaphor - improved positioning */}
        <div className={`absolute bottom-0 right-0 w-1/3 h-1/2 opacity-10 transition-all duration-2000 delay-1500 ${
          missionVisible ? 'opacity-20 scale-100' : 'opacity-0 scale-90'
        }`}>
          <img
            src="https://images.unsplash.com/photo-1741727443902-ee2c7443af8f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxyaXNpbmclMjBwYXRofGVufDB8fHx8MTc1MzQ3Mjk2NHww&ixlib=rb-4.1.0&q=85"
            alt="Rising path"
            className="w-full h-full object-cover rounded-tl-3xl"
          />
        </div>
      </div>
    </section>
  );
};

export default StorytellingSection;