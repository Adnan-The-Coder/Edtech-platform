"use client";
import { useState, useEffect } from "react";
import { Menu, X, BookOpen, Users, MessageCircle, Shield, Award, Target, Star, ChevronRight } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const navLinks = [
    { name: "About", href: "/about", icon: Users, desc: "Our Legacy & Vision" },
    { name: "Courses", href: "/courses", icon: BookOpen, desc: "Officer Training Programs" },
    { name: "Contact", href: "/contact", icon: MessageCircle, desc: "Get in Touch" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl border-b border-emerald-800/30' 
          : 'bg-slate-800/90 backdrop-blur-lg shadow-xl border-b border-emerald-700/20'
      }`}>
        <div className="max-w-7xl mx-auto">
          {/* DESKTOP LAYOUT */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between px-8 py-4">
              {/* Brand Section - Left */}
              <Link href="/" className="group flex items-center space-x-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-700 via-green-800 to-slate-800 rounded-lg shadow-xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 border-2 border-amber-500/30">
                    <Shield className="w-8 h-8 text-amber-400" strokeWidth={2.5} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
                    <Star className="w-2.5 h-2.5 text-slate-800" fill="currentColor" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-amber-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300 scale-110"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    SSB ACADEMY
                  </h1>
                  <p className="text-xs text-amber-400 font-bold tracking-widest uppercase">Excellence • Honor • Service</p>
                </div>
              </Link>

              {/* Center Navigation */}
              <div className="flex items-center space-x-2 bg-slate-700/40 backdrop-blur-sm rounded-xl p-2 shadow-inner border border-slate-600/30">
                {navLinks.map((link) => {
                  const IconComponent = link.icon;
                  const isActive = activeLink === link.name;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setActiveLink(link.name)}
                      className={`group flex items-center space-x-3 font-bold text-sm tracking-wide transition-all duration-300 py-3 px-6 rounded-lg relative ${
                        isActive 
                          ? 'bg-emerald-800/80 text-amber-300 shadow-lg border border-emerald-600/50' 
                          : 'text-slate-200 hover:text-amber-300 hover:bg-slate-600/60'
                      }`}
                    >
                      <IconComponent 
                        size={18} 
                        strokeWidth={2.5}
                        className={`transition-all duration-300 ${
                          isActive ? 'text-amber-300' : 'group-hover:text-amber-300 group-hover:scale-110'
                        }`} 
                      />
                      <span className="uppercase tracking-wider text-xs font-extrabold">{link.name}</span>
                      {isActive && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full shadow-glow"></div>
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Right Actions */}
              <div className="flex items-center space-x-4">
                <button className="text-slate-300 hover:text-amber-300 font-bold text-sm transition-all duration-300 py-3 px-6 rounded-lg hover:bg-slate-700/50 border border-transparent hover:border-slate-600/50 uppercase tracking-wider">
                  Sign In
                </button>
                <Link
                  href="/enroll"
                  className="bg-gradient-to-r from-emerald-700 via-green-800 to-emerald-900 hover:from-emerald-600 hover:via-green-700 hover:to-emerald-800 text-white px-8 py-3.5 rounded-lg font-black text-sm tracking-widest uppercase transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden group border-2 border-amber-500/40"
                >
                  <span className="relative z-10 flex items-center space-x-3">
                    <Award size={18} strokeWidth={2.5} />
                    <span>Enroll Now</span>
                    <ChevronRight size={16} strokeWidth={3} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-400/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </Link>
              </div>
            </div>
          </div>

          {/* TABLET LAYOUT */}
          <div className="hidden md:block lg:hidden">
            <div className="flex items-center justify-between px-6 py-4">
              {/* Brand Name */}
              <Link href="/" className="group flex items-center space-x-3">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-700 via-green-800 to-slate-800 rounded-lg shadow-lg flex items-center justify-center border-2 border-amber-500/30">
                  <Shield className="w-7 h-7 text-amber-400" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-xl font-black text-white tracking-tight">
                    SSB ACADEMY
                  </h1>
                  <p className="text-xs text-amber-400 font-bold tracking-widest">OFFICER TRAINING</p>
                </div>
              </Link>

              {/* Tablet Navigation */}
              <div className="flex items-center space-x-4">
                {navLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="group flex flex-col items-center space-y-1 text-slate-300 hover:text-amber-300 transition-all duration-300 py-3 px-4 rounded-lg hover:bg-slate-700/50"
                    >
                      <IconComponent size={20} strokeWidth={2.5} className="group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-xs font-bold uppercase tracking-wider">{link.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Tablet Actions */}
              <div className="flex items-center space-x-3">
                <button className="text-slate-300 hover:text-amber-300 font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-slate-700/50 transition-all duration-300 uppercase tracking-wide">
                  Sign In
                </button>
                <Link
                  href="/enroll"
                  className="bg-gradient-to-r from-emerald-700 to-green-800 text-white px-6 py-3 rounded-lg font-black text-sm shadow-xl hover:shadow-2xl transition-all duration-300 uppercase tracking-wider border border-amber-500/30"
                >
                  Enroll
                </Link>
              </div>
            </div>
          </div>

          {/* MOBILE LAYOUT */}
          <div className="md:hidden">
            <div className="flex items-center justify-between px-4 py-3">
              {/* Mobile Brand */}
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-700 via-green-800 to-slate-800 rounded-lg shadow-lg flex items-center justify-center border-2 border-amber-500/40">
                  <Shield className="w-6 h-6 text-amber-400" strokeWidth={2.5} />
                </div>
                <div>
                  <h1 className="text-lg font-black text-white tracking-tight">
                    SSB ACADEMY
                  </h1>
                  <p className="text-xs text-amber-400 font-bold tracking-widest">TRAINING EXCELLENCE</p>
                </div>
              </Link>

              <div className="flex items-center space-x-3">
                {/* Mobile CTA */}
                <Link
                  href="/enroll"
                  className="bg-gradient-to-r from-emerald-700 to-green-800 text-white px-4 py-2 rounded-lg font-black text-xs shadow-lg transition-all duration-300 flex items-center space-x-2 uppercase tracking-wider border border-amber-500/30"
                >
                  <Target size={14} strokeWidth={2.5} />
                  <span>Enroll</span>
                </Link>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className={`p-2.5 rounded-lg transition-all duration-300 border-2 ${
                    menuOpen 
                      ? 'bg-emerald-800/80 text-amber-300 border-amber-500/50' 
                      : 'text-slate-300 hover:text-amber-300 hover:bg-slate-700/50 border-slate-600/30 hover:border-amber-500/30'
                  }`}
                  aria-label="Toggle menu"
                >
                  {menuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
                </button>
              </div>
            </div>

            {/* Mobile Sliding Menu */}
            <div className={`overflow-hidden transition-all duration-500 ease-out ${
              menuOpen 
                ? 'max-h-screen opacity-100 translate-y-0' 
                : 'max-h-0 opacity-0 -translate-y-4'
            }`}>
              <div className="bg-gradient-to-br from-slate-800/98 to-emerald-900/98 backdrop-blur-xl border-t border-emerald-700/30 shadow-2xl">
                <div className="px-4 py-8 space-y-3">
                  {navLinks.map((link, index) => {
                    const IconComponent = link.icon;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`flex items-center space-x-4 text-slate-200 hover:text-amber-300 hover:bg-slate-700/60 font-bold text-base py-5 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-slate-600/30 hover:border-amber-500/50 transform hover:scale-[1.02] ${
                          menuOpen ? `animate-slide-in-${index}` : ''
                        }`}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          animationDelay: `${index * 150}ms`
                        }}
                      >
                        <div className="w-14 h-14 bg-gradient-to-br from-emerald-700 to-green-800 rounded-xl flex items-center justify-center shadow-lg border-2 border-amber-500/40">
                          <IconComponent size={22} strokeWidth={2.5} className="text-amber-300" />
                        </div>
                        <div className="flex-1">
                          <span className="font-black text-white uppercase tracking-wider">{link.name}</span>
                          <p className="text-xs text-slate-400 mt-1 font-semibold tracking-wide">
                            {link.desc}
                          </p>
                        </div>
                        <ChevronRight size={20} strokeWidth={2.5} className="text-amber-400" />
                      </Link>
                    );
                  })}
                  
                  {/* Mobile Sign In */}
                  <div className="pt-6 border-t border-slate-600/50">
                    <button className="w-full text-slate-200 hover:text-amber-300 hover:bg-slate-700/60 font-bold text-base py-5 px-6 rounded-xl transition-all duration-300 text-left border-2 border-slate-600/30 hover:border-amber-500/50 uppercase tracking-wider">
                      <div className="flex items-center justify-between">
                        <span>Sign In to Your Account</span>
                        <ChevronRight size={20} strokeWidth={2.5} className="text-amber-400" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Custom Animations & Styles */}
      <style jsx>{`
        @keyframes slide-in-0 { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slide-in-1 { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slide-in-2 { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slide-in-3 { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        
        .animate-slide-in-0 { animation: slide-in-0 0.5s ease-out forwards; }
        .animate-slide-in-1 { animation: slide-in-1 0.5s ease-out forwards; }
        .animate-slide-in-2 { animation: slide-in-2 0.5s ease-out forwards; }
        .animate-slide-in-3 { animation: slide-in-3 0.5s ease-out forwards; }

        .shadow-glow {
          box-shadow: 0 0 10px rgba(251, 191, 36, 0.8);
        }

        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </>
  );
};

export default Navbar;