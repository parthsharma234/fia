import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Users, Calendar, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import chaptersData from '@/data/chapters.json';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useState } from 'react';

const Chapters = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);
  
  const chapters = chaptersData.chapters.map(chapter => ({
    ...chapter,
    slug: chapter.id,
    city: chapter.school,
    status: chapter.established === "2024" ? "New" : 
            chapter.established === "2023" ? "Growing" : "Active"
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Growing': return 'bg-blue-100 text-blue-800';
      case 'New': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our Chapters
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              A growing network of student-led chapters bringing financial literacy education to communities worldwide
            </p>
          </div>
        </div>
      </section>

      {/* Overview Stats */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">7+</div>
              <div className="text-lg text-muted-foreground">Active Chapters</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">200+</div>
              <div className="text-lg text-muted-foreground">Students Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">56</div>
              <div className="text-lg text-muted-foreground">Volunteer Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">3</div>
              <div className="text-lg text-muted-foreground">Countries</div>
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Expanding Our Reach
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Each chapter adapts our core curriculum to meet local needs while maintaining the same high standards 
              of financial education excellence.
            </p>
          </div>

          {/* Chapters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chapters.map((chapter, index) => (
              <div 
                key={chapter.slug}
                className="group transition-all duration-300 hover:scale-105"
              >
                <div className="card-gradient rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-border/50 overflow-hidden">
                  {/* Chapter Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={chapter.image} 
                      alt={`${chapter.state} chapter`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(chapter.status)}`}>
                        {chapter.status}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span className="text-lg font-semibold text-primary">{chapter.city}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                      {chapter.state} Chapter
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {chapter.description}
                    </p>

                    {/* Chapter Stats */}
                    <div className="flex justify-center mb-6">
                      <div className="text-center">
                        <div className="text-xl font-bold text-accent">{chapter.established}</div>
                        <div className="text-xs text-muted-foreground">Founded</div>
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                      onClick={() => setShowComingSoon(true)}
                    >
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start a Chapter CTA */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-secondary font-semibold text-lg">Expansion Opportunity</span>
              <h3 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-6">
                Start a Chapter in Your Area
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Don't see a chapter near you? We're actively looking for passionate student leaders 
                to establish new chapters in their communities.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Starting a chapter involves training, ongoing support, and the opportunity to make 
                a real impact in your local community while developing leadership skills.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3">
                    <Users className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-muted-foreground">Comprehensive training and support</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3">
                    <Calendar className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-muted-foreground">Flexible scheduling to fit your life</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-3">
                    <ExternalLink className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-muted-foreground">Access to proven curriculum and resources</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                alt="Students starting a new chapter"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/get-involved">
              <Button variant="premium" size="lg" className="hover-glow group">
                Start a Chapter
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Chapter Success Stories
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              See how our chapters are making a difference in their communities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary-foreground/10 rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-secondary mb-4">Connecticut Chapter</h4>
              <p className="text-primary-foreground/80 mb-4">
                "Our partnership with local high schools has allowed us to reach over 200 students. 
                We've seen significant improvements in students' financial confidence and decision-making skills."
              </p>
              <p className="text-secondary font-semibold">— Sarah Chen, Founding Director</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-2xl p-8">
              <h4 className="text-2xl font-bold text-secondary mb-4">California Chapter</h4>
              <p className="text-primary-foreground/80 mb-4">
                "We've adapted our curriculum to address the unique financial challenges facing students in Los Angeles. 
                The response from both students and parents has been overwhelmingly positive."
              </p>
              <p className="text-secondary font-semibold">— Marcus Williams, LA Chapter Lead</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Dialog */}
      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Coming Soon</DialogTitle>
            <DialogDescription>
              Individual chapter pages are currently under development. We're working on detailed information for each chapter including member profiles, local activities, and success stories. Check back soon!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Chapters;