import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Users, Calendar, ExternalLink, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import chaptersData from '@/data/chapters.json';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ChapterDetail = () => {
  const { state } = useParams();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation(0.2);
  const { ref: eventsRef, isVisible: eventsVisible } = useScrollAnimation(0.3);
  
  const chapter = chaptersData.chapters.find(c => c.id === state);

  if (!chapter) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-24 pb-16 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Chapter Not Found</h1>
          <Link to="/chapters">
            <Button variant="outline">
              <ArrowLeft className="mr-2 w-4 h-4" />
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
      <section 
        ref={heroRef}
        className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary-light text-primary-foreground relative overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl transition-all duration-1000 ${
            heroVisible ? 'animate-pulse opacity-100' : 'opacity-0'
          }`} />
          <div className={`absolute bottom-1/4 left-1/4 w-72 h-72 bg-secondary/20 rounded-full blur-3xl transition-all duration-1000 delay-300 ${
            heroVisible ? 'animate-pulse opacity-100' : 'opacity-0'
          }`} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-8">
            <Link to="/chapters">
              <Button variant="outline" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Chapters
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 ${heroVisible ? 'animate-fade-in-up' : ''}`}>
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-secondary" />
                <span className="text-xl font-semibold text-secondary">{chapter.school}</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold">
                {chapter.state} Chapter
              </h1>
              
              <p className="text-xl opacity-90 leading-relaxed">
                {chapter.description}
              </p>

              {/* Chapter Stats */}
              <div className="grid grid-cols-3 gap-6 py-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">{chapter.members}</div>
                  <div className="text-primary-foreground/80">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">{chapter.studentsServed}</div>
                  <div className="text-primary-foreground/80">Students Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">{chapter.established}</div>
                  <div className="text-primary-foreground/80">Founded</div>
                </div>
              </div>
            </div>

            <div className={`relative ${heroVisible ? 'animate-fade-in-scale' : ''}`}>
              <img 
                src={chapter.image} 
                alt={`${chapter.state} chapter`}
                className="w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section 
        ref={eventsRef}
        className="py-20 bg-background"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 ${eventsVisible ? 'animate-fade-in-up' : ''}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Recent Events & Programs
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the impact our {chapter.state} chapter is making through innovative financial education programs
            </p>
          </div>

          {chapter.events && chapter.events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {chapter.events.map((event, index) => (
                <div 
                  key={index}
                  className={`card-gradient rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-border/50 ${
                    eventsVisible ? 'animate-fade-in-up' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm text-muted-foreground font-medium">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {event.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">
                        {event.attendees} attendees
                      </span>
                    </div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">Events Coming Soon</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Our {chapter.state} chapter is planning exciting new events and programs. Stay tuned for updates!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join Our {chapter.state} Chapter
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Ready to make a difference in your community? Join our passionate team of student educators 
            and help expand financial literacy in {chapter.state}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/get-involved">
              <Button variant="secondary" size="lg" className="hover-glow">
                Join This Chapter
                <ExternalLink className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Contact Chapter Lead
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ChapterDetail;