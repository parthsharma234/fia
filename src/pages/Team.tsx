import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, MapPin } from 'lucide-react';

const Team = () => {
  const executiveTeam = [
    {
      name: "Sarah Chen",
      title: "Founder & Executive Director",
      bio: "Sarah founded Finance in Advance during her junior year of high school after recognizing the critical gap in financial education. She has led the organization's growth to 7+ chapters and 200+ students educated.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      email: "sarah@financeinadvance.org",
      linkedin: "#"
    },
    {
      name: "Marcus Williams",
      title: "Program Director",
      bio: "Marcus oversees curriculum development and ensures all programs meet the highest educational standards. He brings expertise in financial planning and youth education to our team.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      email: "marcus@financeinadvance.org",
      linkedin: "#"
    },
    {
      name: "Emily Rodriguez",
      title: "Outreach Coordinator",
      bio: "Emily leads our community outreach efforts and manages partnerships with schools and organizations. She's passionate about making financial education accessible to all students.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      email: "emily@financeinadvance.org",
      linkedin: "#"
    },
    {
      name: "David Kim",
      title: "Technology Lead",
      bio: "David develops our digital platforms and educational tools. His background in computer science and finance helps create innovative learning experiences for students.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      email: "david@financeinadvance.org",
      linkedin: "#"
    },
    {
      name: "Aisha Patel",
      title: "Training Manager",
      bio: "Aisha designs and delivers training programs for new volunteers and chapter leaders. Her expertise in education and leadership development strengthens our network.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      email: "aisha@financeinadvance.org",
      linkedin: "#"
    },
    {
      name: "Jordan Thompson",
      title: "Communications Director",
      bio: "Jordan manages our digital presence and creates engaging content that spreads awareness about financial literacy. They ensure our message reaches diverse audiences.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      email: "jordan@financeinadvance.org",
      linkedin: "#"
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
              Our Team
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Meet the passionate young leaders driving financial literacy education forward
            </p>
          </div>
        </div>
      </section>

      {/* Team Introduction */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Student-Led Excellence
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our executive team represents the diversity and passion of the next generation. 
              Each member brings unique skills and perspectives to advance our mission of empowering young people through financial education.
            </p>
          </div>

          {/* Executive Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executiveTeam.map((member, index) => (
              <div 
                key={member.name}
                className="group transition-all duration-300 hover:scale-105"
              >
                <div className="card-gradient p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-border/50 text-center">
                  {/* Profile Image */}
                  <div className="mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-all duration-300"
                    />
                  </div>

                  {/* Member Info */}
                  <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  
                  <div className="mb-4">
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-secondary/10 text-secondary">
                      {member.title}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                    {member.bio}
                  </p>

                  {/* Contact Links */}
                  <div className="flex justify-center space-x-4">
                    <a 
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/icon"
                    >
                      <Mail size={18} />
                    </a>
                    <a 
                      href={member.linkedin}
                      className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 group/icon"
                    >
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-secondary font-semibold text-lg">Join Our Team</span>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                Be Part of the Change
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                We're always looking for passionate young leaders to join our team. Whether you have experience in finance, 
                education, technology, or communications, there's a place for you in our mission.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Our team members develop leadership skills, gain real-world experience, and make a tangible impact on 
                their communities while building a network of like-minded peers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="premium" size="lg" className="hover-glow">
                  <Mail className="mr-2" size={20} />
                  Apply to Join
                </Button>
                <Button variant="outline" size="lg">
                  View Open Positions
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values & Culture */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Our Team Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-primary-foreground/10 rounded-2xl p-6">
              <h4 className="text-xl font-bold mb-3 text-secondary">Collaboration</h4>
              <p className="text-primary-foreground/80">We believe in the power of working together and learning from each other's perspectives.</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-2xl p-6">
              <h4 className="text-xl font-bold mb-3 text-secondary">Innovation</h4>
              <p className="text-primary-foreground/80">We continuously seek new ways to make financial education more engaging and effective.</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-2xl p-6">
              <h4 className="text-xl font-bold mb-3 text-secondary">Impact</h4>
              <p className="text-primary-foreground/80">Every decision we make is guided by our commitment to creating meaningful change.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;