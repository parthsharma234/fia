import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Users, BookOpen, Lightbulb, Heart, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Accessibility",
      description: "Making financial education available to all young people, regardless of background or circumstance."
    },
    {
      icon: Users,
      title: "Youth Leadership",
      description: "Student-led initiatives ensure our content resonates with young people and addresses real challenges."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Using creative approaches and modern tools to make financial concepts engaging and understandable."
    },
    {
      icon: Heart,
      title: "Community Impact",
      description: "Building stronger communities through financially literate young people who can make informed decisions."
    },
    {
      icon: Globe,
      title: "Inclusive Growth",
      description: "Focusing on underserved communities where financial literacy resources are most needed."
    },
    {
      icon: BookOpen,
      title: "Comprehensive Education",
      description: "Covering all essential financial topics from basic budgeting to advanced investment strategies."
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
              About Finance in Advance
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Empowering the next generation with the knowledge and skills to make informed financial decisions
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <span className="text-secondary font-semibold text-lg">Our Mission</span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
                Bridging the Financial Literacy Gap
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                At Finance in Advance (FIA), our mission is to empower the next generation with the knowledge and skills to make informed financial decisions. Through accessible education, innovative resources, and impactful partnerships, we aim to bridge the gap in financial literacy, fostering a future where all young people can achieve financial independence and stability.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that financial literacy is not just about numbers—it's about empowerment, opportunity, and the tools needed to build a secure future.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                alt="Students collaborating with laptops"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* The Problem */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Student using laptop"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-secondary font-semibold text-lg">The Challenge</span>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                A Critical Gap in Education
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Financial literacy is a critical life skill, yet many young people lack access to proper education on managing money. As schools focus on traditional academics, essential topics like budgeting, saving, investing, and understanding credit often fall by the wayside.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The result? A generation of students entering adulthood unprepared to navigate financial challenges. With increasing student debt, rising living costs, and limited access to practical financial knowledge, young people face significant barriers to achieving financial independence and stability.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This gap disproportionately affects underserved communities, where resources and opportunities for financial literacy are even more limited.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold text-lg">Our Values</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our core values guide everything we do, from curriculum development to community outreach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="card-gradient p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-4">{value.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join us in empowering young people with the financial literacy skills they need to succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-involved">
              <Button variant="secondary" size="lg" className="text-lg px-8 py-4 hover-glow">
                Get Involved
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/programs">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                View Our Programs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;