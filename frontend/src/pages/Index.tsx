import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
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
      
      {/* Quick Overview Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
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
                className="group"
              >
                <div className="card-gradient p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 h-full">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <highlight.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {highlight.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link to="/about">
              <Button variant="premium" size="lg" className="group">
                Learn More About Our Mission
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
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
