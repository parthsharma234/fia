import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Calendar, Users, Mail, Linkedin, ExternalLink } from 'lucide-react';

const ChapterDetail = () => {
  const { state } = useParams();

  // Sample chapter data - in a real app, this would come from an API
  const chapterData: Record<string, any> = {
    connecticut: {
      name: "Connecticut Chapter",
      city: "Hartford",
      established: "2022",
      description: "Our founding chapter in Connecticut serves as the model for all other chapters. Based in Hartford, we work with local high schools and community centers to provide comprehensive financial literacy education to students across the state.",
      members: [
        {
          name: "Sarah Chen",
          role: "Chapter Director",
          bio: "Founder of Finance in Advance and passionate advocate for financial literacy education.",
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
          email: "sarah.chen@financeinadvance.org",
          linkedin: "#"
        },
        {
          name: "Michael Johnson",
          role: "Program Coordinator",
          bio: "Senior at University of Connecticut studying Finance, coordinates weekly workshops.",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
          email: "michael.j@financeinadvance.org",
          linkedin: "#"
        },
        {
          name: "Lisa Martinez",
          role: "Outreach Specialist",
          bio: "High school senior focused on expanding our reach to underserved communities.",
          image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
          email: "lisa.m@financeinadvance.org",
          linkedin: "#"
        },
        {
          name: "James Wilson",
          role: "Curriculum Developer",
          bio: "College junior majoring in Education, helps adapt curriculum for different age groups.",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
          email: "james.w@financeinadvance.org",
          linkedin: "#"
        }
      ],
      stats: {
        studentsServed: 200,
        partnershipsFormed: 8,
        workshopsHeld: 45
      },
      programs: [
        "Budgeting Basics for High Schoolers",
        "College Financial Planning",
        "Credit Building Workshop",
        "Investment Fundamentals"
      ],
      partnerships: [
        "Hartford Public Schools",
        "CT Future Business Leaders of America",
        "University of Connecticut",
        "Hartford Community Center"
      ]
    },
    california: {
      name: "California Chapter",
      city: "Los Angeles",
      established: "2023",
      description: "The California chapter focuses on serving the diverse communities of Los Angeles, offering bilingual programming and culturally responsive financial education.",
      members: [
        {
          name: "Maria Rodriguez",
          role: "Chapter Director",
          bio: "UCLA student passionate about financial equity and bilingual education.",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
          email: "maria.r@financeinadvance.org",
          linkedin: "#"
        },
        {
          name: "David Park",
          role: "Technology Lead",
          bio: "Computer Science major developing digital tools for financial education.",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
          email: "david.p@financeinadvance.org",
          linkedin: "#"
        }
      ],
      stats: {
        studentsServed: 85,
        partnershipsFormed: 5,
        workshopsHeld: 20
      },
      programs: [
        "Financial Literacy en Español",
        "College Affordability Workshop",
        "Small Business Basics",
        "Digital Banking Safety"
      ],
      partnerships: [
        "Los Angeles Unified School District",
        "UCLA Extension",
        "LA Community Centers",
        "Latino Business Association"
      ]
    }
    // Add more chapters as needed
  };

  const chapter = chapterData[state as string];

  if (!chapter) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-24 pb-16 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Chapter Not Found</h1>
          <p className="text-muted-foreground mb-8">The chapter you're looking for doesn't exist.</p>
          <Link to="/chapters">
            <Button variant="default">
              <ArrowLeft className="mr-2" size={20} />
              Back to Chapters
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link 
              to="/chapters"
              className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300"
            >
              <ArrowLeft className="mr-2" size={20} />
              Back to All Chapters
            </Link>
          </div>
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {chapter.name}
            </h1>
            <div className="flex items-center justify-center gap-6 text-xl opacity-90">
              <div className="flex items-center">
                <MapPin className="mr-2" size={20} />
                {chapter.city}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2" size={20} />
                Est. {chapter.established}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter Overview */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                About Our Chapter
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {chapter.description}
              </p>

              {/* Programs */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-foreground mb-6">Our Programs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chapter.programs.map((program: string, index: number) => (
                    <div 
                      key={index}
                      className="bg-muted/30 p-4 rounded-lg border border-border/50"
                    >
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                        <span className="font-medium text-foreground">{program}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Partnerships */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-foreground mb-6">Partner Organizations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {chapter.partnerships.map((partner: string, index: number) => (
                    <div 
                      key={index}
                      className="bg-muted/30 p-4 rounded-lg border border-border/50 flex items-center"
                    >
                      <ExternalLink className="w-5 h-5 text-primary mr-3" />
                      <span className="text-foreground">{partner}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="lg:col-span-1">
              <div className="bg-muted/30 p-8 rounded-2xl border border-border/50 sticky top-24">
                <h3 className="text-2xl font-bold text-foreground mb-6">Chapter Impact</h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{chapter.stats.studentsServed}</div>
                    <div className="text-muted-foreground">Students Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-secondary mb-2">{chapter.stats.workshopsHeld}</div>
                    <div className="text-muted-foreground">Workshops Held</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-accent mb-2">{chapter.stats.partnershipsFormed}</div>
                    <div className="text-muted-foreground">Partnerships</div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-border/50">
                  <Button variant="premium" size="lg" className="w-full hover-glow">
                    Contact Chapter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The dedicated student leaders making financial literacy education possible in {chapter.city}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {chapter.members.map((member: any, index: number) => (
              <div 
                key={member.name}
                className="group transition-all duration-300 hover:scale-105"
              >
                <div className="card-gradient p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-border/50 text-center">
                  {/* Profile Image */}
                  <div className="mb-4">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto object-cover shadow-lg group-hover:shadow-xl transition-all duration-300"
                    />
                  </div>

                  {/* Member Info */}
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {member.name}
                  </h3>
                  
                  <div className="mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary/10 text-secondary">
                      {member.role}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                    {member.bio}
                  </p>

                  {/* Contact Links */}
                  <div className="flex justify-center space-x-3">
                    <a 
                      href={`mailto:${member.email}`}
                      className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <Mail size={16} />
                    </a>
                    <a 
                      href={member.linkedin}
                      className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    >
                      <Linkedin size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join This Chapter */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Interested in Joining?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Our {chapter.city} chapter is always looking for passionate students to join our team and help expand our impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="text-lg px-8 py-4 hover-glow">
              <Users className="mr-2" size={20} />
              Join Our Team
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Mail className="mr-2" size={20} />
              Contact Chapter
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ChapterDetail;