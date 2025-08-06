import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, BookOpen, TrendingUp, Target, Heart, Globe, Calculator, PiggyBank, CreditCard, Building, GraduationCap, Award, MapPin, Calendar, CheckCircle, Star, Lightbulb, HandHeart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const impactStats = [
    {
      icon: Users,
      number: "200+",
      title: "Students Educated",
      description: "Young people empowered with financial literacy skills across multiple states"
    },
    {
      icon: MapPin,
      number: "7+",
      title: "Active Chapters",
      description: "Growing network of student-led chapters across the U.S. and internationally"
    },
    {
      icon: TrendingUp,
      number: "100%",
      title: "Student-Led",
      description: "Entirely driven by passionate young leaders who understand their generation"
    },
    {
      icon: Award,
      number: "5+",
      title: "Strategic Partnerships",
      description: "Collaborating with organizations like CT Future Business Leaders of America"
    }
  ];

  const corePrograms = [
    {
      icon: Calculator,
      title: "Budgeting Basics",
      description: "Master the fundamentals of creating and maintaining a personal budget, tracking expenses, and setting achievable financial goals.",
      features: ["Monthly budget creation", "Expense tracking systems", "Goal-setting frameworks", "Emergency fund planning"],
      level: "Beginner",
      duration: "4 weeks",
      color: "from-primary to-primary-light"
    },
    {
      icon: PiggyBank,
      title: "Smart Saving Strategies",
      description: "Discover powerful saving techniques, understand compound interest, and learn about different types of savings accounts.",
      features: ["High-yield savings accounts", "Automated saving systems", "Compound interest calculations", "Short & long-term goals"],
      level: "Beginner",
      duration: "3 weeks",
      color: "from-secondary to-secondary-light"
    },
    {
      icon: TrendingUp,
      title: "Investment Fundamentals",
      description: "Get introduced to the world of investing with age-appropriate concepts, risk management, and portfolio basics.",
      features: ["Stock market introduction", "ETFs and mutual funds", "Risk vs. reward concepts", "Diversification strategies"],
      level: "Intermediate",
      duration: "6 weeks",
      color: "from-accent to-secondary"
    },
    {
      icon: CreditCard,
      title: "Credit & Debt Management",
      description: "Understand how credit works, build a positive credit history, and learn strategies for avoiding and managing debt.",
      features: ["Credit score fundamentals", "Responsible credit use", "Debt repayment strategies", "Building credit history"],
      level: "Intermediate",
      duration: "4 weeks",
      color: "from-primary to-accent"
    },
    {
      icon: Building,
      title: "Financial Planning",
      description: "Learn about insurance, taxes, and long-term financial planning for major life events and career goals.",
      features: ["Insurance basics", "Tax fundamentals", "Retirement planning", "Major purchase planning"],
      level: "Advanced",
      duration: "5 weeks",
      color: "from-secondary to-primary"
    },
    {
      icon: Users,
      title: "Interactive Workshops",
      description: "Hands-on group sessions with real-world scenarios, financial games, and peer-to-peer learning experiences.",
      features: ["Financial simulation games", "Real-world case studies", "Group problem-solving", "Peer mentoring"],
      level: "All Levels",
      duration: "Ongoing",
      color: "from-accent to-primary-light"
    }
  ];

  const testimonials = [
    {
      quote: "I enjoyed it a lot! This class helped me to develop knowledge about interest and loans!",
      author: "Marcus L.",
      role: "High School Student",
      program: "Credit & Debt Management",
      rating: 5
    },
    {
      quote: "Great Teaching :)) I have learned a lot of information about personal finance!!!",
      author: "Emma R.",
      role: "High School Student", 
      program: "Investment Fundamentals",
      rating: 5
    },
    {
      quote: "The interactive games made learning about finance fun and engaging. I never thought I'd say that about budgeting!",
      author: "Jake P.",
      role: "High School Student",
      program: "Budgeting Basics",
      rating: 5
    },
    {
      quote: "I feel that this class went through everything, and it was clean and concise!",
      author: "Sarah M.",
      role: "Parent",
      program: "Overall Program",
      rating: 5
    }
  ];

  const partnershipHighlights = [
    {
      organization: "CT Future Business Leaders of America",
      description: "Strategic partnership providing curriculum validation and student networking opportunities",
      impact: "Reached 150+ additional students through joint programming"
    },
    {
      organization: "Local High Schools",
      description: "Direct partnerships with schools to integrate financial literacy into existing curricula",
      impact: "Embedded programs in 12+ schools across Connecticut"
    },
    {
      organization: "Community Organizations",
      description: "Collaborations with youth centers and community groups to reach underserved populations",
      impact: "Extended reach to 5+ underserved communities"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      
      {/* Impact Statistics */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-primary-light rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-primary-soft rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold text-lg">Our Impact</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
              Making a Real Difference
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Through dedicated outreach and innovative programming, we're transforming how young people 
              understand and interact with their financial futures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactStats.map((stat, index) => (
              <div 
                key={stat.title}
                className="text-center transform transition-all duration-500 hover:scale-105"
              >
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-primary-foreground/20 transition-all duration-300 group">
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto bg-secondary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="w-8 h-8 text-secondary" />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">
                      {stat.number}
                    </div>
                    <div className="text-xl font-semibold text-primary-foreground">
                      {stat.title}
                    </div>
                  </div>
                  
                  <p className="text-primary-foreground/70 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <span className="text-secondary font-semibold text-lg">Our Mission</span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
                Bridging the Financial Literacy Gap
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                At Finance in Advance, our mission is to empower the next generation with the knowledge and skills to make informed financial decisions. Through accessible education, innovative resources, and impactful partnerships, we aim to bridge the gap in financial literacy, fostering a future where all young people can achieve financial independence and stability.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                We believe that financial literacy is not just about numbers—it's about empowerment, opportunity, and the tools needed to build a secure future. Our student-led approach ensures that our content resonates with young people and addresses the real financial challenges they face.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/about">
                  <Button variant="premium" size="lg" className="hover-glow">
                    <Target className="mr-2" size={20} />
                    Learn Our Story
                  </Button>
                </Link>
                <Link to="/programs">
                  <Button variant="outline" size="lg">
                    <BookOpen className="mr-2" size={20} />
                    Explore Programs
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" 
                alt="Students collaborating on financial education"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>

          {/* Core Values */}
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold text-lg">Our Values</span>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
              What Drives Us Forward
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="card-gradient p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-foreground mb-4">Accessibility</h4>
              <p className="text-muted-foreground leading-relaxed">
                Making financial education available to all young people, regardless of background, location, or economic circumstance.
              </p>
            </div>
            <div className="card-gradient p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-accent rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-foreground mb-4">Youth Leadership</h4>
              <p className="text-muted-foreground leading-relaxed">
                Student-led initiatives ensure our content resonates with young people and addresses real challenges they face daily.
              </p>
            </div>
            <div className="card-gradient p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-foreground mb-4">Innovation</h4>
              <p className="text-muted-foreground leading-relaxed">
                Using creative approaches and modern tools to make financial concepts engaging, memorable, and actionable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Programs Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold text-lg">Our Programs</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Complete Financial Education Curriculum
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our comprehensive programs cover all essential financial literacy topics through engaging, 
              age-appropriate content designed by students, for students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {corePrograms.map((program, index) => (
              <div 
                key={program.title}
                className="group transition-all duration-300 hover:scale-105"
              >
                <div className="card-gradient p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-border/50">
                  {/* Program header */}
                  <div className="mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${program.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <program.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Program meta */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                      <GraduationCap className="w-4 h-4 mr-1" />
                      {program.level}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary/10 text-secondary">
                      <Calendar className="w-4 h-4 mr-1" />
                      {program.duration}
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
                        <CheckCircle className="w-4 h-4 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to="/programs">
                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/programs">
              <Button variant="premium" size="lg" className="hover-glow">
                View All Programs
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Student Success Stories */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold text-lg">Student Success</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Voices from Our Community
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Hear from students, parents, and educators who have experienced the transformative power of financial literacy education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="card-gradient p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {/* Rating stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-secondary fill-current" />
                  ))}
                </div>

                {/* Program badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {testimonial.program}
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="text-foreground mb-6 text-lg leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Share Your Story
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partnership Highlights */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold text-lg">Strategic Partnerships</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Collaborating for Greater Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We work with leading organizations to expand our reach and ensure our programs meet the highest educational standards.
            </p>
          </div>

          <div className="space-y-8">
            {partnershipHighlights.map((partnership, index) => (
              <div 
                key={partnership.organization}
                className="card-gradient p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                  <div>
                    <h4 className="text-2xl font-bold text-foreground mb-2">
                      {partnership.organization}
                    </h4>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                      <HandHeart className="w-4 h-4 mr-1" />
                      Strategic Partner
                    </span>
                  </div>
                  <div>
                    <p className="text-muted-foreground leading-relaxed">
                      {partnership.description}
                    </p>
                  </div>
                  <div className="text-center lg:text-right">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/10 text-secondary font-semibold">
                      <Award className="w-4 h-4 mr-2" />
                      {partnership.impact}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem We're Solving */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Student working on laptop"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-secondary font-semibold text-lg">The Challenge</span>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                A Critical Gap in Education
              </h3>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Financial literacy is a critical life skill, yet many young people lack access to proper education on managing money. As schools focus on traditional academics, essential topics like budgeting, saving, investing, and understanding credit often fall by the wayside.
                </p>
                <p>
                  The result? A generation of students entering adulthood unprepared to navigate financial challenges. With increasing student debt, rising living costs, and limited access to practical financial knowledge, young people face significant barriers to achieving financial independence and stability.
                </p>
                <p>
                  This gap disproportionately affects underserved communities, where resources and opportunities for financial literacy are even more limited. That's why our work is so crucial.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="text-2xl font-bold text-red-600 mb-1">57%</div>
                  <div className="text-sm text-red-700">Adults are financially literate</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600 mb-1">21</div>
                  <div className="text-sm text-orange-700">States require financial education</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Join the Movement?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Whether you're a student ready to learn, an educator looking to partner, or someone who wants to support our mission, 
            there's a place for you in our growing community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-involved">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-4 hover-glow">
                <Users className="mr-2" size={20} />
                Get Involved Today
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/programs">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <BookOpen className="mr-2" size={20} />
                Explore Programs
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Globe className="mr-2" size={20} />
                Contact Us
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