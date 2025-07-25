import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator, PiggyBank, TrendingUp, CreditCard, Building, Users, Target, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const Programs = () => {
  const programs = [
    {
      icon: Calculator,
      title: "Budgeting Basics",
      description: "Learn essential budgeting skills, track expenses, and create sustainable financial plans for your future.",
      features: ["Monthly budget creation", "Expense tracking tools", "Financial goal setting", "Emergency fund planning"],

      level: "Beginner",
      color: "from-primary to-primary-light"
    },
    {
      icon: PiggyBank,
      title: "Smart Saving Strategies",
      description: "Discover effective saving techniques and understand different types of savings accounts and their benefits.",
      features: ["High-yield savings accounts", "Automated saving systems", "Short & long-term goals", "Compound interest basics"],

      level: "Beginner",
      color: "from-secondary to-secondary-light"
    },
    {
      icon: TrendingUp,
      title: "Investment Fundamentals",
      description: "Get introduced to investing concepts, risk management, and building a diversified portfolio.",
      features: ["Stock market basics", "ETFs and mutual funds", "Risk assessment", "Portfolio diversification"],

      level: "Intermediate",
      color: "from-accent to-secondary"
    },
    {
      icon: CreditCard,
      title: "Credit & Debt Management",
      description: "Understand credit scores, responsible credit card use, and strategies for managing and avoiding debt.",
      features: ["Credit score basics", "Credit card responsibility", "Debt repayment strategies", "Building credit history"],

      level: "Intermediate",
      color: "from-primary to-accent"
    },
    {
      icon: Building,
      title: "Financial Planning",
      description: "Learn about insurance, taxes, and long-term financial planning for major life events.",
      features: ["Insurance fundamentals", "Tax basics", "Retirement planning", "Major purchase planning"],

      level: "Advanced",
      color: "from-secondary to-primary"
    },
    {
      icon: Users,
      title: "Financial Literacy Workshops",
      description: "Interactive group sessions with real-world scenarios and hands-on financial decision-making exercises.",
      features: ["Interactive games", "Real-world scenarios", "Peer-to-peer learning", "Q&A sessions"],

      level: "All Levels",
      color: "from-accent to-primary-light"
    }
  ];

  const testimonials = [
    {
      quote: "I enjoyed it a lot! This class helped me to develop knowledge about interest and loans!",
      author: "Marcus L.",
      program: "Credit & Debt Management"
    },
    {
      quote: "The interactive games made learning about finance fun and engaging. I never thought I'd say that about budgeting!",
      author: "Emma R.",
      program: "Budgeting Basics"
    },
    {
      quote: "Great Teaching :)) I have learned a lot of information about personal finance!!!",
      author: "Jake P.",
      program: "Investment Fundamentals"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Programs
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Comprehensive financial education designed by students, for students
            </p>
          </div>
        </div>
      </section>

      {/* Program Overview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Complete Financial Literacy Curriculum
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our comprehensive programs cover all essential financial literacy topics through engaging, 
              age-appropriate content designed to prepare young people for real-world financial decisions.
            </p>
          </div>

          {/* Programs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {programs.map((program, index) => (
              <div 
                key={program.title}
                className="group transition-all duration-300 hover:scale-105"
              >
                <div className="card-gradient p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-border/50">
                  {/* Icon with gradient background */}
                  <div className="mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${program.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <program.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Program meta */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary/10 text-secondary">
                      <Target className="w-4 h-4 mr-1" />
                      {program.level}
                    </span>
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

                  <Link to="/contact">
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Curriculum Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-secondary font-semibold text-lg">Our Approach</span>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                Interactive & Engaging Learning
              </h3>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Our curriculum goes beyond traditional lectures. We use interactive games, real-world scenarios, 
                  and hands-on exercises to make financial concepts stick.
                </p>
                <p>
                  Each program is designed with input from students to ensure the content is relevant, 
                  age-appropriate, and addresses the actual financial challenges young people face.
                </p>
                <p>
                  We believe in learning by doing – that's why our programs include practical exercises 
                  like creating real budgets, analyzing investment options, and building credit responsibly.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                alt="Interactive learning session"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Student Success Stories */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold text-lg">Student Success</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              What Our Students Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="card-gradient p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {testimonial.program}
                  </span>
                </div>
                <blockquote className="text-foreground mb-6 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <div className="text-muted-foreground font-medium">
                  — {testimonial.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Financial Journey?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of students who have already taken control of their financial futures through our comprehensive programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-involved">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-4 hover-glow">
                Enroll Today
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Download Curriculum
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Programs;