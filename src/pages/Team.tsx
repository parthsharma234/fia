import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

const Team = () => {
  const executiveTeam = [
    {
      name: "Jivitesh Babu",
      bio: "Hello! My name is Jivitesh Babu. I'm a Junior at Farmington High School. I'm passionate about learning finance, business, and economics. I hope to work in fintech, corporate finance, or investment banking and become an entrepreneur. In my free time, I enjoy hanging out with my friends and working on my own projects.",
      image: "/chapter-assets/jivi.png",
    },
    {
      name: "Parth Sharma",
      bio: "I'm Parth Sharma, a Junior at Farmington High School. I love learning about engineering, space and AI. In my free time, I enjoy playing basketball and watching movies.",
      image: "/parth.jpg",
    },
    {
      name: "Rithvik Satyavarapu",
      bio: "Hi! My name is Rithvik Satyavarapu. I am a Senior at Farmington High School. I love learning about computer science, business, and economics. In the future, I aspire to become an investment banker or have a career in Corporate Finance. In my free time, I enjoy playing with my dog, Rory, and chess matches with my friends.",
      image: "/chapter-assets/rithvik.png",
    },
    {
      name: "Nimit Arora",
      bio: "Hello, My name is Nimit Arora. I am a junior at Farmington High school. I am interested in Finance, math, and science. I enjoy playing basketball and video games in my free time.",
      image: "/nimit.png",
    },
    {
      name: "Rohan",
      bio: "As the Connecticut Branch Manager for Finance in Advance, I lead statewide outreach efforts to promote financial literacy among students and communities. I am deeply passionate about finance, especially personal finance education, and am committed to empowering others with the knowledge and tools needed to make informed financial decisions. I strive to expand access to essential financial skills by coordinating events, building connections with schools and libraries, and organizing impactful workshops. Looking ahead, I aspire to pursue a career in the financial industry, with a strong interest in wealth management and financial advisory.",
      image: "/rohan.png",
    },
    {
      name: "Abdullah Ajimal",
      bio: "Hi, My name is Abdullah. I am currently a junior at Farmington High school, I have a passion for physics, computer science, and economics. In the future I strive to work in the finance field as an investment banker or financial analyst. I enjoy cooking, volunteering for kids and traveling with friends.",
      image: "/abdullah.png",
    },
    {
      name: "Vedant",
      bio: "I'm Vedant, a passionate student leader focused on expanding financial literacy education. I enjoy exploring innovative approaches to teaching complex financial concepts and building meaningful connections within our community. When I'm not working on Finance in Advance initiatives, you can find me reading about market trends and playing soccer with friends.",
      image: "/chapter-assets/vedant.png",
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
                  <h3 className="text-2xl font-bold text-foreground mb-6 group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed text-sm">
                    {member.bio}
                  </p>


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