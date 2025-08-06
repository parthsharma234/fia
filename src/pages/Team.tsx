import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin, MapPin } from 'lucide-react';

const Team = () => {
  const executiveTeam = [
    {
      name: "Jivitesh Babu",
      title: "Chief Executive Officer",
      bio: "Passionate about financial literacy and empowering young minds to make informed financial decisions.",
      image: "/chapter-assets/jivi.png",
      email: "jivitesh@financeinadvance.org",
      linkedin: "#"
    },
    {
      name: "Parth Sharma",
      title: "Chief Operating Officer",
      bio: "Dedicated to operational excellence and creating scalable educational programs.",
      image: "/chapter-assets/parth.jpg",
      email: "parth@financeinadvance.org",
      linkedin: "#"
    },
    {
      name: "Nimit Arora",
      title: "Chief Technology Officer",
      bio: "Leading our digital transformation and innovative educational technology solutions.",
      image: "/chapter-assets/nimit.png",
      email: "nimit@financeinadvance.org",
      linkedin: "#"
    },
    {
      name: "Rohan",
      title: "Chief Financial Officer",
      bio: "Ensuring financial sustainability while expanding our educational impact.",
      image: "/chapter-assets/rohan.png",
      email: "rohan@financeinadvance.org",
      linkedin: "#"
    },
    {
      name: "Abdullah Ajimal",
      title: "Chief Marketing Officer",
      bio: "Building our brand and connecting with students across the globe.",
      image: "/chapter-assets/abdullah.png",
      email: "abdullah@financeinadvance.org",
      linkedin: "#"
    },
    {
      name: "Vedant",
      title: "Chief Strategy Officer",
      bio: "Developing strategic initiatives to expand our educational reach and impact.",
      image: "/chapter-assets/vedant.png",
      email: "vedant@financeinadvance.org",
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