import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone, Clock, Send, MessageCircle, Calendar } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary to-primary-light text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Ready to get involved or have questions about our programs? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Whether you're a student interested in our programs, an educator looking to partner with us, 
                or someone who wants to support our mission, we're here to help.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Email</h4>
                    <p className="text-muted-foreground">financeinadvance@gmail.com</p>
                    <p className="text-muted-foreground text-sm">We typically respond within 24 hours</p>
                  </div>
                </div>



                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Headquarters</h4>
                    <p className="text-muted-foreground">JS, CT</p>
                    <p className="text-muted-foreground text-sm">Serving communities nationwide</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Office Hours</h4>
                    <p className="text-muted-foreground">Monday - Friday: 9 AM - 5 PM EST</p>
                    <p className="text-muted-foreground text-sm">Weekend programs available</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Quick Actions</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" size="sm" className="justify-start">
                    <Calendar className="mr-2 w-4 h-4" />
                    Schedule a Call
                  </Button>
                  <Button variant="outline" size="sm" className="justify-start">
                    <MessageCircle className="mr-2 w-4 h-4" />
                    Live Chat
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="card-gradient p-8 rounded-2xl shadow-lg border border-border/50">
                <h3 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                    >
                      <option value="">Select a topic</option>
                      <option value="programs">Program Information</option>
                      <option value="volunteer">Volunteer Opportunities</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="chapter">Start a Chapter</option>
                      <option value="media">Media Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="newsletter"
                      className="mt-1 mr-3 w-4 h-4 text-primary border-border rounded focus:ring-primary"
                    />
                    <label htmlFor="newsletter" className="text-sm text-muted-foreground">
                      I'd like to receive updates about Finance in Advance programs and events
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    variant="premium" 
                    size="lg" 
                    className="w-full hover-glow group"
                  >
                    <Send className="mr-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Find quick answers to common questions about our programs and organization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="card-gradient p-6 rounded-xl border border-border/50">
              <h4 className="text-lg font-bold text-foreground mb-3">How can I enroll in your programs?</h4>
              <p className="text-muted-foreground">
                You can enroll through your local chapter or by contacting us directly. We'll help you find the right program for your needs and schedule.
              </p>
            </div>

            <div className="card-gradient p-6 rounded-xl border border-border/50">
              <h4 className="text-lg font-bold text-foreground mb-3">Are your programs really free?</h4>
              <p className="text-muted-foreground">
                Yes! All of our financial literacy programs are completely free for students. We believe financial education should be accessible to everyone.
              </p>
            </div>

            <div className="card-gradient p-6 rounded-xl border border-border/50">
              <h4 className="text-lg font-bold text-foreground mb-3">How can I start a chapter in my area?</h4>
              <p className="text-muted-foreground">
                Contact us through this form or email us directly. We'll provide training, curriculum, and ongoing support to help you launch successfully.
              </p>
            </div>

            <div className="card-gradient p-6 rounded-xl border border-border/50">
              <h4 className="text-lg font-bold text-foreground mb-3">Can parents attend sessions with students?</h4>
              <p className="text-muted-foreground">
                While our programs are designed for students, we offer special family sessions and encourage parent involvement in financial literacy education.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Stay Connected
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Follow us on social media for the latest updates, financial tips, and success stories from our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="text-lg px-8 py-4 hover-glow">
              Follow on Instagram
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Join LinkedIn Network
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;