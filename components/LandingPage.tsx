/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from 'react';
import { 
  Shield, Target, Users, BookOpen, Star, ChevronRight, 
  Trophy, Zap, Globe, CheckCircle, ArrowRight, Play, Quote,
  Medal, Compass, Flag, Clock, Phone, Mail, MapPin, Calendar
} from 'lucide-react';
import Image from 'next/image';
import Hero from './Hero';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Intersection Observer for animations
  useEffect(() => {
    const observers:any = [];
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach((el, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(prev => ({ ...prev, [index]: true }));
            }
          });
        },
        { threshold: 0.1, rootMargin: '50px' }
      );
      
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs: IntersectionObserver) => obs.disconnect());
  }, []);

  const heroStats = [
    { number: "98%", label: "Success Rate", icon: Trophy },
    { number: "5000+", label: "Officers Trained", icon: Users },
    { number: "15+", label: "Years Experience", icon: Clock },
    { number: "24/7", label: "Support Available", icon: Shield }
  ];

  const features = [
    {
      icon: Target,
      title: "Precision Training",
      description: "Structured methodology designed specifically for SSB success with proven results.",
      color: "from-emerald-600 to-green-700"
    },
    {
      icon: Users,
      title: "Expert Mentors",
      description: "Learn from retired military officers and successful SSB candidates.",
      color: "from-amber-600 to-yellow-700"
    },
    {
      icon: BookOpen,
      title: "Comprehensive Curriculum",
      description: "Complete coverage of all SSB stages including OIR, PPDT, TAT, WAT, and GTO.",
      color: "from-slate-600 to-slate-700"
    },
    {
      icon: Medal,
      title: "Proven Track Record",
      description: "Thousands of successful candidates trained with industry-leading success rates.",
      color: "from-emerald-700 to-green-800"
    },
    {
      icon: Zap,
      title: "Modern Techniques",
      description: "Latest training methodologies combined with traditional military wisdom.",
      color: "from-amber-700 to-orange-800"
    },
    {
      icon: Globe,
      title: "Online & Offline",
      description: "Flexible learning options with both digital and in-person training modes.",
      color: "from-slate-700 to-gray-800"
    }
  ];

  const courses = [
    {
      title: "Foundation Course",
      duration: "3 Months",
      price: "₹25,000",
      features: ["Basic SSB Preparation", "Personality Development", "Group Discussions", "Basic Interview Skills"],
      badge: "Popular",
      badgeColor: "bg-amber-500"
    },
    {
      title: "Advanced Program",
      duration: "6 Months",
      price: "₹45,000",
      features: ["Complete SSB Training", "Mock Interviews", "GTO Tasks", "Personal Mentoring", "Study Materials"],
      badge: "Recommended",
      badgeColor: "bg-emerald-500"
    },
    {
      title: "Elite Batch",
      duration: "12 Months",
      price: "₹75,000",
      features: ["Premium Training", "1-on-1 Coaching", "Unlimited Mock Tests", "Career Guidance", "Guaranteed Support"],
      badge: "Premium",
      badgeColor: "bg-slate-600"
    }
  ];

  const testimonials = [
    {
      name: "Lt. Arjun Sharma",
      rank: "Indian Army Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "SSB Academy transformed my approach to the selection process. Their structured training and expert guidance helped me clear the SSB in my first attempt."
    },
    {
      name: "Capt. Priya Singh",
      rank: "Indian Air Force Officer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      text: "The mentors here understand exactly what assessors look for. Their personalized feedback and continuous support made all the difference in my success."
    },
    {
      name: "Sub Lt. Rajesh Kumar",
      rank: "Indian Navy Officer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      text: "Exceptional training quality and comprehensive preparation. The mock interviews and GTO tasks were incredibly realistic and well-designed."
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-amber-50">
      
      {/* Hero Section */}
      {/* <Hero/> */}

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-stone-100 via-slate-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-6">
          <div data-animate className={`text-center mb-16 transition-all duration-1000 delay-200 ${(isVisible as any)[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-flex items-center space-x-2 bg-emerald-100 border border-emerald-200 rounded-full px-6 py-3 mb-6">
              <Medal className="w-5 h-5 text-emerald-700" />
              <span className="text-emerald-800 font-bold text-sm tracking-wider uppercase">Why Choose SSB Academy</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6">
              Excellence in Every
              <span className="bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent"> Dimension</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Our comprehensive approach combines military precision with modern training techniques to ensure your success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div 
                  key={index}
                  data-animate
                  className={`group bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-200 hover:border-emerald-200 ${(isVisible as any)[index + 2] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${index * 100 + 400}ms` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-emerald-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {feature.description}
                  </p>
                  <div className="flex items-center mt-6 text-emerald-600 group-hover:text-emerald-700 font-bold text-sm uppercase tracking-wider">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-24 bg-gradient-to-br from-slate-800 via-emerald-900 to-slate-900 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div data-animate className={`text-center mb-16 transition-all duration-1000 ${(isVisible as any)[8] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-flex items-center space-x-2 bg-emerald-800/20 backdrop-blur-sm border border-emerald-400/30 rounded-full px-6 py-3 mb-6">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <span className="text-amber-300 font-bold text-sm tracking-wider uppercase">Training Programs</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Choose Your
              <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent"> Training Path</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Structured programs designed to match your preparation needs and career goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div 
                key={index}
                data-animate
                className={`relative bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-700/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10 ${(isVisible as any)[index + 9] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${index * 150 + 600}ms` }}
              >
                {course.badge && (
                  <div className={`absolute -top-4 left-8 ${course.badgeColor} text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg`}>
                    {course.badge}
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-black text-white mb-2">{course.title}</h3>
                  <div className="text-amber-400 font-bold text-sm uppercase tracking-widest mb-4">{course.duration}</div>
                  <div className="text-4xl font-black text-emerald-400">{course.price}</div>
                </div>

                <div className="space-y-4 mb-8">
                  {course.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" strokeWidth={2.5} />
                      <span className="text-slate-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:scale-105">
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-stone-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div data-animate className={`text-center mb-16 transition-all duration-1000 ${(isVisible as any)[12] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-flex items-center space-x-2 bg-amber-100 border border-amber-200 rounded-full px-6 py-3 mb-6">
              <Quote className="w-5 h-5 text-amber-700" />
              <span className="text-amber-800 font-bold text-sm tracking-wider uppercase">Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-800 mb-6">
              Hear From Our
              <span className="bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent"> Officers</span>
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-12 shadow-2xl border border-slate-200">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-emerald-200 shadow-xl">
                  <Image
                    width={300}
                    height={300}
                    src={testimonials[activeTestimonial].image} 
                    alt={testimonials[activeTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <blockquote className="text-xl md:text-2xl text-slate-700 mb-6 font-medium leading-relaxed italic">
                  `{testimonials[activeTestimonial].text}`
                </blockquote>
                <div>
                  <div className="text-2xl font-black text-slate-800 mb-1">
                    {testimonials[activeTestimonial].name}
                  </div>
                  <div className="text-emerald-600 font-bold text-sm uppercase tracking-widest">
                    {testimonials[activeTestimonial].rank}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeTestimonial 
                      ? 'bg-emerald-500 scale-125' 
                      : 'bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          {/* <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.02\"%3E%3Cpath d=\"M20 20L0 0v40l20-20zm20 0L20 0v40l20-20z\"/%3E%3C/g%3E%3C/svg%3E')]"></div> */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">
          <div data-animate className={`transition-all duration-1000 ${(isVisible as any)[13] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="mb-8">
              <Flag className="w-16 h-16 text-amber-400 mx-auto mb-6" strokeWidth={1.5} />
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                Ready to Serve Your
                <span className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-transparent"> Nation?</span>
              </h2>
              <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join thousands of successful candidates who chose SSB Academy as their stepping stone to a distinguished military career.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="group bg-gradient-to-r from-emerald-600 via-green-700 to-emerald-800 hover:from-emerald-500 hover:via-green-600 hover:to-emerald-700 text-white px-12 py-6 rounded-xl font-black text-lg tracking-widest uppercase transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden border-2 border-amber-400/40">
                <span className="relative z-10 flex items-center space-x-4">
                  <Compass className="w-6 h-6" strokeWidth={2.5} />
                  <span>Begin Your Journey</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-400/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              
              <button className="group flex items-center space-x-3 text-white hover:text-amber-300 font-bold text-lg transition-all duration-300 py-6 px-10 rounded-xl hover:bg-white/10 backdrop-blur-sm border-2 border-white/20 hover:border-amber-400/50 uppercase tracking-widest">
                <Phone className="w-5 h-5" strokeWidth={2.5} />
                <span>Talk to Expert</span>
              </button>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="flex items-center justify-center space-x-3 bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <Phone className="w-6 h-6 text-emerald-400" strokeWidth={2.5} />
                <div className="text-left">
                  <div className="text-white font-bold">Call Us</div>
                  <div className="text-slate-300 text-sm">+91 98765 43210</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3 bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <Mail className="w-6 h-6 text-amber-400" strokeWidth={2.5} />
                <div className="text-left">
                  <div className="text-white font-bold">Email Us</div>
                  <div className="text-slate-300 text-sm">info@ssbacademy.com</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-3 bg-slate-800/40 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
                <MapPin className="w-6 h-6 text-emerald-400" strokeWidth={2.5} />
                <div className="text-left">
                  <div className="text-white font-bold">Visit Us</div>
                  <div className="text-slate-300 text-sm">Delhi | Mumbai | Pune</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-slate-900 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-700 via-green-800 to-slate-800 rounded-lg shadow-lg flex items-center justify-center border-2 border-amber-500/40">
                  <Shield className="w-6 h-6 text-amber-400" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">SSB ACADEMY</h3>
                  <p className="text-xs text-amber-400 font-bold tracking-widest">EXCELLENCE • HONOR • SERVICE</p>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed mb-6 max-w-md">
                Empowering future officers with comprehensive SSB training, expert mentorship, and proven methodologies for military success.
              </p>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
                  <button key={social} className="w-10 h-10 bg-slate-800 hover:bg-emerald-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110" aria-label={social}>
                    {/* Replace with actual icons as needed */}
                    <span className="text-slate-400 hover:text-white text-lg font-bold">
                      {social[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-black text-lg mb-6 uppercase tracking-widest">Quick Links</h4>
              <ul className="space-y-3">
                {['About Us', 'Courses', 'Success Stories', 'Mock Tests', 'Career Guidance', 'Contact'].map((link) => (
                  <li key={link}>
                    <button className="text-slate-400 hover:text-amber-300 transition-colors duration-300 text-sm font-medium">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-black text-lg mb-6 uppercase tracking-widest">Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                  <div className="text-slate-400 text-sm leading-relaxed">
                    Sector 18, Noida<br />
                    Uttar Pradesh 201301
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-slate-400 text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-slate-400 text-sm">info@ssbacademy.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-emerald-400 flex-shrink-0" strokeWidth={2.5} />
                  <span className="text-slate-400 text-sm">Mon - Sat: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-slate-500 text-sm">
                © 2024 SSB Academy. All rights reserved. | Designed for Excellence
              </p>
              <div className="flex items-center space-x-6">
                <button className="text-slate-500 hover:text-amber-300 text-sm transition-colors duration-300">
                  Privacy Policy
                </button>
                <button className="text-slate-500 hover:text-amber-300 text-sm transition-colors duration-300">
                  Terms of Service
                </button>
                <button className="text-slate-500 hover:text-amber-300 text-sm transition-colors duration-300">
                  Refund Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      {/* Move the @import to your global CSS or _app.tsx Head section */}
      <style jsx global>{`
        * {
          font-family: 'Inter', sans-serif;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Rajdhani', sans-serif;
        }

        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
          40%, 43% { transform: translate3d(0,-8px,0); }
          70% { transform: translate3d(0,-4px,0); }
          90% { transform: translate3d(0,-2px,0); }
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #1e293b;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #059669, #10b981);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #047857, #059669);
        }

        /* Selection colors */
        ::selection {
          background-color: #10b981;
          color: white;
        }

        ::-moz-selection {
          background-color: #10b981;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;