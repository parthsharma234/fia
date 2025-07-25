import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, PiggyBank, TrendingUp, CreditCard, Building, Users } from 'lucide-react';
import teamImage from '@/assets/team-collaboration.jpg';

const Programs = () => {
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

  const programs = [
    {
      icon: Calculator,
      title: "Budgeting Basics",
      description: "Learn essential budgeting skills, track expenses, and create sustainable financial plans for your future.",
      features: ["Monthly budget creation", "Expense tracking tools", "Financial goal setting", "Emergency fund planning"],
      color: "from-primary to-primary-light"
    },
    {
      icon: PiggyBank,
      title: "Smart Saving Strategies",
      description: "Discover effective saving techniques and understand different types of savings accounts and their benefits.",
      features: ["High-yield savings accounts", "Automated saving systems", "Short & long-term goals", "Compound interest basics"],
      color: "from-secondary to-secondary-light"
    },
    {
      icon: TrendingUp,
      title: "Investment Fundamentals",
      description: "Get introduced to investing concepts, risk management, and building a diversified portfolio.",
      features: ["Stock market basics", "ETFs and mutual funds", "Risk assessment", "Portfolio diversification"],
      color: "from-accent to-secondary"
    },
    {
      icon: CreditCard,
      title: "Credit & Debt Management",
      description: "Understand credit scores, responsible credit card use, and strategies for managing and avoiding debt.",
      features: ["Credit score basics", "Credit card responsibility", "Debt repayment strategies", "Building credit history"],
      color: "from-primary to-accent"
    },
    {
      icon: Building,
      title: "Financial Planning",
      description: "Learn about insurance, taxes, and long-term financial planning for major life events.",
      features: ["Insurance fundamentals", "Tax basics", "Retirement planning", "Major purchase planning"],
      color: "from-secondary to-primary"
    },
    {
      icon: Users,
      title: "Financial Literacy Workshops",
      description: "Interactive group sessions with real-world scenarios and hands-on financial decision-making exercises.",
      features: ["Interactive games", "Real-world scenarios", "Peer-to-peer learning", "Q&A sessions"],
      color: "from-accent to-primary-light"
    }
  ];

  return (
    <section id="programs" ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-secondary font-semibold text-lg">Our Programs</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
            Comprehensive Financial Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our curriculum covers all essential financial literacy topics through engaging, 
            age-appropriate content designed by students, for students.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => (
            <div 
              key={program.title}
              className={`group transition-all duration-1000 hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="card-gradient p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-border/50">
                {/* Icon with gradient background */}
                <div className="mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${program.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <program.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {program.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {program.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`relative transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative bg-primary rounded-3xl overflow-hidden">
            {/* Background image */}
            <div className="absolute inset-0">
              <img 
                src={teamImage} 
                alt="Students collaborating"
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-primary/80"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-12 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Ready to Start Your Financial Journey?
              </h3>
              <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Join thousands of students who have already taken control of their financial futures through our comprehensive programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="text-lg px-8 py-4 hover-glow">
                  Enroll Today
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Download Curriculum
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;