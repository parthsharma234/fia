import { useState, useEffect, useRef } from 'react';
import { Quote, Star } from 'lucide-react';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const testimonials = [
    {
      quote: "I feel that this class went through everything, and it was clean and concise!",
      author: "Sarah M.",
      role: "Parent",
      rating: 5
    },
    {
      quote: "I enjoyed it a lot! This class helped me to develop knowledge about interest and loans!",
      author: "Marcus L.",
      role: "Student",
      rating: 5
    },
    {
      quote: "Great Teaching :)) I have learned a lot of information about personal finance!!!",
      author: "Emma R.",
      role: "Student",
      rating: 5
    },
    {
      quote: "The interactive games made learning about finance fun and engaging. I never thought I'd say that about budgeting!",
      author: "Jake P.",
      role: "Student",
      rating: 5
    },
    {
      quote: "Thanks to FIA, my daughter now understands the importance of saving and making informed financial decisions.",
      author: "Maria G.",
      role: "Parent",
      rating: 5
    },
    {
      quote: "The curriculum is well-structured and the instructors make complex financial concepts easy to understand.",
      author: "David K.",
      role: "High School Teacher",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-secondary font-semibold text-lg">What People Say</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
            Voices from Our Community
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hear from students, parents, and educators who have experienced the transformative power of financial literacy education.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className={`group transition-all duration-1000 hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="card-gradient p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-border/50 relative overflow-hidden">
                {/* Background quote icon */}
                <div className="absolute top-4 right-4 opacity-10">
                  <Quote size={48} className="text-primary" />
                </div>

                {/* Rating stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-secondary fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-foreground mb-6 text-lg leading-relaxed relative z-10">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="border-t border-border/20 pt-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">
                        {testimonial.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-primary/5 rounded-2xl p-8 max-w-4xl mx-auto border border-primary/10">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Join Our Community?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Become part of a growing network of financially literate young people making informed decisions about their futures.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-secondary text-secondary-foreground hover:bg-secondary-light px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                Start Learning Today
              </button>
              <button className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300">
                Share Your Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;