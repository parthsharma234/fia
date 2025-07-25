import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Calendar, MapPin, Mail, Heart, HandHeart, Megaphone, DollarSign } from 'lucide-react';

const GetInvolved = () => {
  const opportunities = [
    {
      icon: Users,
      title: "Become a Student Educator",
      description: "Join our team of peer educators and help teach financial literacy to other students in your community.",
      commitment: "5-10 hours/month",
      requirements: ["High school or college student", "Passion for financial education", "Strong communication skills"],
      color: "from-primary to-primary-light"
    },
    {
      icon: MapPin,
      title: "Start a Local Chapter",
      description: "Bring Finance in Advance to your school or community by establishing a new chapter in your area.",
      commitment: "10-15 hours/month",
      requirements: ["Leadership experience", "Access to local students", "Commitment to growth"],
      color: "from-secondary to-secondary-light"
    },
    {
      icon: HandHeart,
      title: "Volunteer Support",
      description: "Support our programs through administrative help, event planning, and community outreach activities.",
      commitment: "3-8 hours/month",
      requirements: ["Reliable availability", "Organizational skills", "Team collaboration"],
      color: "from-accent to-secondary"
    },
    {
      icon: Megaphone,
      title: "Advocate & Spread Awareness",
      description: "Help us raise awareness about financial literacy through social media, community events, and word-of-mouth.",
      commitment: "2-5 hours/month",
      requirements: ["Social media savvy", "Communication skills", "Passion for the cause"],
      color: "from-primary to-accent"
    }
  ];

  const partnershipTypes = [
    {
      icon: Users,
      title: "Educational Institutions",
      description: "Partner with us to bring financial literacy programs directly to your students.",
      benefits: ["Curriculum integration", "Certified instruction", "Student engagement metrics"]
    },
    {
      icon: DollarSign,
      title: "Financial Organizations",
      description: "Support our mission through sponsorship, resources, and expertise sharing.",
      benefits: ["Brand visibility", "Community impact", "CSR objectives"]
    },
    {
      icon: Heart,
      title: "Community Organizations",
      description: "Collaborate to reach underserved communities with essential financial education.",
      benefits: ["Expanded reach", "Joint programming", "Shared resources"]
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
              Get Involved
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Join our mission to empower young people with essential financial literacy skills
            </p>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold text-lg">Volunteer Opportunities</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Make a Real Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Whether you're a student, professional, or community member, there's a place for you in our mission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {opportunities.map((opportunity, index) => (
              <div 
                key={opportunity.title}
                className="group transition-all duration-300 hover:scale-105"
              >
                <div className="card-gradient p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-border/50">
                  <div className="mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${opportunity.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <opportunity.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                      <Calendar className="w-4 h-4 mr-1" />
                      {opportunity.commitment}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                    {opportunity.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {opportunity.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-foreground mb-3">Requirements:</h4>
                    <ul className="space-y-2">
                      {opportunity.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span className="text-muted-foreground text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Application Process */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-secondary font-semibold text-lg">How to Join</span>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                Simple Application Process
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mr-4 mt-1">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Submit Application</h4>
                    <p className="text-muted-foreground">Fill out our online application form with your background and interests.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mr-4 mt-1">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Interview & Training</h4>
                    <p className="text-muted-foreground">Participate in a brief interview and complete our volunteer training program.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold mr-4 mt-1">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Start Making Impact</h4>
                    <p className="text-muted-foreground">Begin your volunteer journey and help empower young people with financial literacy.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7" 
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-secondary font-semibold text-lg">Partnerships</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Partner with Us
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join organizations like CT Future Business Leaders of America in supporting financial literacy education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {partnershipTypes.map((partnership, index) => (
              <div 
                key={partnership.title}
                className="card-gradient p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <partnership.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-2xl font-bold text-foreground mb-4">{partnership.title}</h4>
                <p className="text-muted-foreground mb-6 leading-relaxed">{partnership.description}</p>
                <ul className="space-y-2 mb-6">
                  {partnership.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-center justify-center">
                      <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                      <span className="text-muted-foreground text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Whether you want to volunteer, partner, or learn more about our opportunities, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="text-lg px-8 py-4 hover-glow">
              <Mail className="mr-2" size={20} />
              Contact Us Today
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Download Info Packet
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetInvolved;