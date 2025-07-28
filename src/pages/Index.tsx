import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import StorytellingSection from '@/components/StorytellingSection';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, BookOpen, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const highlights = [
    {
      icon: Users,
      title: "200+ Students",
      description: "Educated across Connecticut and beyond",
      link: "/about"
    },
    {
      icon: BookOpen,
      title: "Comprehensive Programs",
      description: "From budgeting to investment fundamentals",
      link: "/programs"
    },
    {
      icon: TrendingUp,
      title: "7+ Chapters",
      description: "Growing network across the U.S. and internationally",
      link: "/chapters"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <StorytellingSection />
      
      {/* Quick Overview Section with Enhanced Animations */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        {/* Floating background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${10 + (i % 4) * 25}%`,
                top: `${20 + Math.floor(i / 4) * 60}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i * 0.5}s`
              }}
            >
              <div 
                className="w-4 h-4 bg-primary/10 rounded-full animate-pulse-glow"
                style={{
                  animationDelay: `${i * 0.3}s`
                }}
              />
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-reveal-cascade">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 animate-text-shimmer">
              Youth-Led Financial Education
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Bridging the critical gap in financial literacy through innovative education, 
              accessible resources, and impactful partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {highlights.map((highlight, index) => (
              <Link 
                key={highlight.title}
                to={highlight.link}
                className="group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="card-gradient p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover-morph hover-shine h-full relative overflow-hidden perspective-1000">
                  {/* Floating particles inside card */}
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 3 }, (_, i) => (
                      <div
                        key={i}
                        className="absolute animate-particle-drift"
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${30 + i * 20}%`,
                          animationDelay: `${i * 1.5}s`
                        }}
                      >
                        <div className="w-1 h-1 bg-primary/30 rounded-full" />
                      </div>
                    ))}
                  </div>

                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 animate-rotate-3d shadow-lg">
                      <highlight.icon className="w-8 h-8 text-white animate-breathe" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300 animate-wave-text">
                      {highlight.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>

                  {/* Morphing gradient overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 animate-morphing-gradient rounded-2xl" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center animate-elastic-bounce">
            <Link to="/about">
              <Button variant="premium" size="lg" className="group animate-pulse-glow hover-glow relative overflow-hidden">
                <span className="relative z-10">
                  Learn More About Our Mission
                </span>
                <ArrowRight className="ml-2 group-hover:translate-x-2 group-hover:scale-110 transition-all duration-300" size={20} />
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
