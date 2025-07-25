import { Mail, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Our Programs', href: '#programs' },
    { name: 'Impact', href: '#impact' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  const programs = [
    { name: 'Budgeting Basics', href: '#' },
    { name: 'Smart Saving', href: '#' },
    { name: 'Investment Fundamentals', href: '#' },
    { name: 'Credit Management', href: '#' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold text-secondary mb-4">
                Finance in Advance
              </h3>
              <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                Empowering the next generation with essential financial literacy skills 
                through innovative education and youth-led initiatives.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail size={16} className="text-secondary mr-3" />
                  <span className="text-primary-foreground/80">info@financeinadvance.org</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="text-secondary mr-3" />
                  <span className="text-primary-foreground/80">Connecticut, USA</span>
                </div>
                <div className="flex items-center">
                  <Phone size={16} className="text-secondary mr-3" />
                  <span className="text-primary-foreground/80">(555) 123-4567</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-secondary mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <h4 className="text-lg font-semibold text-secondary mb-4">Our Programs</h4>
              <ul className="space-y-2">
                {programs.map((program) => (
                  <li key={program.name}>
                    <a 
                      href={program.href} 
                      className="text-primary-foreground/80 hover:text-secondary transition-colors duration-300 hover:translate-x-1 transform inline-block"
                    >
                      {program.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter & Social */}
            <div>
              <h4 className="text-lg font-semibold text-secondary mb-4">Stay Connected</h4>
              <p className="text-primary-foreground/80 mb-4">
                Get updates on new programs and financial literacy resources.
              </p>
              
              {/* Newsletter Signup */}
              <div className="mb-6">
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 px-4 py-2 rounded-l-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                  <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-r-lg hover:bg-secondary-light transition-colors duration-300 font-semibold">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h5 className="text-sm font-semibold text-secondary mb-3">Follow Us</h5>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all duration-300 group"
                      aria-label={social.label}
                    >
                      <social.icon size={18} className="text-primary-foreground group-hover:text-secondary-foreground" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-primary-foreground/60 mb-4 md:mb-0">
                © 2024 Finance in Advance. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="text-primary-foreground/60 hover:text-secondary transition-colors duration-300">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;