import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Users, BookOpen } from 'lucide-react';
import financialIcons from '@/assets/financial-icons.png';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To empower the next generation with the knowledge and skills to make informed financial decisions through accessible education and innovative resources."
    },
    {
      icon: Users,
      title: "Youth-Led",
      description: "We are proudly student-led, ensuring our content resonates with young people and addresses real-world financial challenges they face."
    },
    {
      icon: BookOpen,
      title: "Comprehensive Education",
      description: "From budgeting basics to investment strategies, we cover essential financial topics that schools often overlook."
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="mb-6">
              <span className="text-secondary font-semibold text-lg">About Finance in Advance</span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
                Bridging the Financial Literacy Gap
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Financial literacy is a critical life skill, yet many young people lack access to proper education on managing money. 
                As schools focus on traditional academics, essential topics like budgeting, saving, investing, and understanding credit often fall by the wayside.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">The Challenge We're Solving</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A generation of students enters adulthood unprepared to navigate financial challenges. With increasing student debt, 
                rising living costs, and limited access to practical financial knowledge, young people face significant barriers to achieving financial independence.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This gap disproportionately affects underserved communities, where resources and opportunities for financial literacy are even more limited.
              </p>
            </div>

            <Button variant="premium" size="lg" className="group">
              Learn More About Our Impact
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Button>
          </div>

          {/* Features Grid */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              {/* Background image */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <img src={financialIcons} alt="Financial education icons" className="w-full h-auto" />
              </div>
              
              {/* Features */}
              <div className="relative space-y-6">
                {features.map((feature, index) => (
                  <div 
                    key={feature.title}
                    className={`card-gradient p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h4>
                        <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;