import { useState, useEffect, useRef } from 'react';
import { Users, MapPin, Handshake, TrendingUp } from 'lucide-react';

const Impact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ students: 0, branches: 0, partnerships: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const targets = { students: 200, branches: 7, partnerships: 5 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      Object.keys(targets).forEach((key) => {
        const target = targets[key as keyof typeof targets];
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
        }, stepDuration);
      });
    }
  }, [isVisible]);

  const impactStats = [
    {
      icon: Users,
      value: `${counters.students}+`,
      label: "Students Educated",
      description: "Young people equipped with essential financial literacy skills in Connecticut and beyond.",
      color: "text-primary"
    },
    {
      icon: MapPin,
      value: `${counters.branches}+`,
      label: "Branches Worldwide",
      description: "Local chapters spreading financial education across the U.S. and internationally.",
      color: "text-secondary"
    },
    {
      icon: Handshake,
      value: `${counters.partnerships}+`,
      label: "Strategic Partnerships",
      description: "Collaborations with organizations like CT Future Business Leaders of America.",
      color: "text-accent"
    },
    {
      icon: TrendingUp,
      value: "100%",
      label: "Student-Led Initiative",
      description: "Entirely driven by young leaders who understand their generation's needs.",
      color: "text-primary"
    }
  ];

  return (
    <section id="impact" ref={sectionRef} className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-primary-light rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-primary-soft rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-secondary font-semibold text-lg">Our Impact</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
            Making a Real Difference
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Through dedicated outreach and innovative programming, we're transforming how young people 
            understand and interact with their financial futures.
          </p>
        </div>

        {/* Impact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {impactStats.map((stat, index) => (
            <div 
              key={stat.label}
              className={`text-center transform transition-all duration-1000 hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-primary-foreground/20 transition-all duration-300 group">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto bg-secondary/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-secondary" />
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xl font-semibold text-primary-foreground">
                    {stat.label}
                  </div>
                </div>
                
                <p className="text-primary-foreground/70 leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership highlight */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-secondary mb-4">
              Partnered with Industry Leaders
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              We work closely with organizations like the Connecticut Future Business Leaders of America 
              to ensure our curriculum meets real-world standards and provides students with valuable networking opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;