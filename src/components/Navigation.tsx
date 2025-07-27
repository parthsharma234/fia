import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { ref: navRef, isVisible } = useScrollAnimation(0.1);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { 
      name: 'Programs', 
      href: '/programs',
      dropdown: [
        { name: 'All Programs', href: '/programs' },
        { name: 'Financial Basics', href: '/programs#basics' },
        { name: 'Investment Training', href: '/programs#investment' },
        { name: 'Entrepreneurship', href: '/programs#entrepreneurship' }
      ]
    },
    
    { name: 'Team', href: '/team' },
    { name: 'Chapters', href: '/chapters' },
  ];

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-primary/95 backdrop-blur-xl shadow-elegant border-b border-primary/40' 
          : 'bg-primary/80'
      } ${
        isVisible ? 'animate-fade-in-up' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex-shrink-0 group transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:shadow-primary/50 transition-all duration-300">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient-coral">
                  Finance in Advance
                </h1>
                <p className="text-xs text-muted-foreground font-medium">
                  Empowering Youth
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <div 
                  key={link.name} 
                  className="relative group"
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group flex items-center space-x-1 ${
                      location.pathname === link.href 
                        ? 'text-primary-foreground bg-primary-light/80 shadow-soft' 
                        : 'text-primary-foreground hover:text-secondary hover:bg-primary-soft/40'
                    } animate-fade-in-right animate-stagger-${index + 1}`}
                  >
                    <span>{link.name}</span>
                    {link.dropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${
                        activeDropdown === link.name ? 'rotate-180' : ''
                      }`} />
                    )}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {link.dropdown && activeDropdown === link.name && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-primary/95 backdrop-blur-xl rounded-xl shadow-elegant border border-primary/40 py-2 animate-fade-in-scale">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="block px-4 py-3 text-sm text-primary-foreground hover:text-secondary hover:bg-primary-soft/40 transition-all duration-200"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link to="/programs">
              <Button variant="soft" size="sm" className="hover-soft bg-primary text-primary-foreground border-primary/60">
                Explore Programs
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="coral" size="sm" className="hover-coral shadow-coral bg-secondary text-secondary-foreground border-secondary/60">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="hover:bg-primary/10 transition-all duration-300"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute inset-0 transition-all duration-300 ${
                  isOpen ? 'rotate-45 translate-y-0' : 'rotate-0 -translate-y-2'
                }`}>
                  <Menu size={20} className={isOpen ? 'opacity-0' : 'opacity-100'} />
                </span>
                <span className={`absolute inset-0 transition-all duration-300 ${
                  isOpen ? 'rotate-0 translate-y-0' : 'rotate-45 translate-y-2'
                }`}>
                  <X size={20} className={isOpen ? 'opacity-100' : 'opacity-0'} />
                </span>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden transition-all duration-500 overflow-hidden ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-primary/95 backdrop-blur-xl border-t border-primary/40 shadow-elegant">
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link, index) => (
              <div key={link.name} className="space-y-2">
                <Link
                  to={link.href}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    location.pathname === link.href 
                      ? 'text-primary-foreground bg-primary-light/80 shadow-soft' 
                      : 'text-primary-foreground hover:text-secondary hover:bg-primary-soft/40'
                  } animate-slide-in-bottom animate-stagger-${index + 1}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
                {/* Mobile Dropdown */}
                {link.dropdown && (
                  <div className="ml-4 space-y-1">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block px-3 py-2 text-sm text-primary-foreground hover:text-secondary transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile CTA Buttons */}
            <div className="pt-4 space-y-3 border-t border-primary/40">
              <Link to="/programs">
                <Button variant="soft" size="sm" className="w-full hover-soft bg-primary text-primary-foreground border-primary/60">
                  Explore Programs
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="coral" size="sm" className="w-full hover-coral shadow-coral bg-secondary text-secondary-foreground border-secondary/60">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;