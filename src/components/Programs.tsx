import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, PiggyBank, TrendingUp, CreditCard, Building, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation, useStaggeredScrollAnimation } from '@/hooks/useScrollAnimation';
import teamImage from '@/assets/team-collaboration.jpg';

const Programs = () => {
  const { ref: sectionRef, isVisible } = useScrollAnimation(0.1);
  const { ref: programsGridRef, visibleItems: programsVisible } = useStaggeredScrollAnimation(6, 0.2);
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation(0.3);

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
        <div className={`text-center mb-16 reveal-on-scroll ${
          isVisible ? 'revealed' : ''
        }`}>
          <span className="text-secondary font-semibold text-lg animate-fade-in-up">Our Programs</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6 animate-fade-in-up animate-stagger-1">
            Comprehensive Financial Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-stagger-2">
            Our curriculum covers all essential financial literacy topics through engaging, 
            age-appropriate content designed by students, for students.
          </p>
        </div>

        {/* Programs Grid */}
        <div 
          ref={programsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {programs.map((program, index) => (
            <div 
              key={program.title}
              className={`group transition-all duration-500 hover:scale-105 reveal-scale ${
                programsVisible[index] ? 'revealed' : ''
              }`}
            >
              <div className="professional-card p-8 rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-500 h-full border border-border/50 hover:border-primary/20 bg-gradient-to-br from-background to-background/50">
                {/* Icon with gradient background */}
                <div className="mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-br ${program.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
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
                <ul className="space-y-3 mb-6">
                  {program.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start group/feature">
                      <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0 group-hover/feature:bg-primary transition-colors duration-200"></div>
                      <span className="text-muted-foreground text-sm group-hover/feature:text-foreground transition-colors duration-200">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/contact">
                  <Button 
                    variant="soft" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground hover-soft transition-all duration-300"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div 
          ref={ctaRef}
          className={`relative reveal-on-scroll ${
            ctaVisible ? 'revealed' : ''
          }`}
        >
          <div className="relative bg-gradient-primary rounded-3xl overflow-hidden shadow-elegant hover:shadow-glow transition-all duration-500">
            {/* Background image */}
            <div className="absolute inset-0">
              <img 
                src={teamImage} 
                alt="Students collaborating"
                className="w-full h-full object-cover opacity-20"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-soft/80"></div>
            </div>
            
            {/* Content */}
            <div className="relative z-10 p-12 text-center">
              <h3 className={`text-3xl md:text-4xl font-bold text-primary-foreground mb-6 ${
                ctaVisible ? 'animate-fade-in-up' : ''
              }`}>
                Ready to Start Your Financial Journey?
              </h3>
              <p className={`text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed ${
                ctaVisible ? 'animate-fade-in-up animate-stagger-1' : ''
              }`}>
                Join thousands of students who have already taken control of their financial futures through our comprehensive programs.
              </p>
              <div className={`flex flex-col sm:flex-row gap-4 justify-center ${
                ctaVisible ? 'animate-fade-in-scale animate-stagger-2' : ''
              }`}>
                <Link to="/contact">
                  <Button variant="coral" size="lg" className="text-lg px-8 py-4 hover-coral shadow-coral">
                    Enroll Today
                  </Button>
                </Link>
                <Link to="/programs">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300">
                    Download Curriculum
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;