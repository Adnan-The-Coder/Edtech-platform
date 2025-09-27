/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { Menu, X, BookOpen, Users, MessageCircle, Shield, Award, Target, Star, ChevronRight, User, LogOut, ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from '@/utils/supabase/client';
import { API_ENDPOINTS } from '@/config/api';
import SignIn from "./auth/Sign-in";

// User profile interface
interface UserProfile {
  uuid: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  phone?: string;
  created_at: string;
  updated_at: string;
  user_login_info?: any;
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const navLinks = [
    { name: "About", href: "/about", icon: Users, desc: "Our Legacy & Vision" },
    { name: "Courses", href: "/courses", icon: BookOpen, desc: "Officer Training Programs" },
    { name: "Contact", href: "/contact", icon: MessageCircle, desc: "Get in Touch" },
  ];

  // Fetch user profile from backend
  const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      const response = await fetch(API_ENDPOINTS.getProfileByUUID(userId), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          return result.data;
        }
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Check user session and fetch profile
  const checkUserSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const profile = await fetchUserProfile(session.user.id);
        setUser(profile);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking user session:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      } else {
        setUser(null);
        setIsUserMenuOpen(false);
        // Optionally redirect to home page
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Unexpected error during sign out:', error);
    }
  };

  // Close all dropdowns/menus
  const closeAllMenus = () => {
    setIsUserMenuOpen(false);
    setMenuOpen(false);
  };

  useEffect(() => {
    // Check initial session
    checkUserSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const profile = await fetchUserProfile(session.user.id);
        setUser(profile);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
                {loading ? (
                  <div className="w-8 h-8 rounded-full bg-slate-700/50 animate-pulse"></div>
                ) : user ? (
                  <div className="relative user-menu-container">
                    <button 
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-3 p-2 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group border border-transparent hover:border-amber-500/30"
                      aria-label="User menu"
                    >
                      {user.avatar_url ? (
                        <div className="relative w-10 h-10 rounded-full border-2 border-emerald-400/50 overflow-hidden group-hover:border-amber-300/70 transition-all duration-300">
                          <Image 
                            src={user.avatar_url} 
                            alt="Officer profile" 
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-700 to-emerald-800 rounded-full flex items-center justify-center group-hover:from-emerald-600 group-hover:to-emerald-700 transition-all duration-300 border-2 border-amber-400/50">
                          <User className="w-5 h-5 text-amber-300" />
                        </div>
                      )}
                      <div className="text-left">
                        <span className="text-sm font-bold text-slate-200 group-hover:text-amber-300 transition-colors duration-300 block max-w-32 truncate">
                          {user.full_name || 'Officer'}
                        </span>
                        <span className="text-xs text-emerald-400 font-medium uppercase tracking-wider">
                          Academy Member
                        </span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-amber-300 transition-all duration-300" />
                    </button>

                    {/* Desktop User Dropdown */}
                    {isUserMenuOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                        <div className="absolute right-0 top-full mt-3 w-72 bg-gradient-to-br from-slate-900/98 to-emerald-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-emerald-500/30 py-2 z-50 overflow-hidden">
                          {/* User Info Header */}
                          <div className="px-6 py-5 border-b border-emerald-500/20 bg-gradient-to-r from-emerald-800/20 to-amber-600/10">
                            <div className="flex items-center space-x-4">
                              {user.avatar_url ? (
                                <div className="relative w-14 h-14 rounded-full border-2 border-amber-400/50 overflow-hidden">
                                  <Image 
                                    src={user.avatar_url} 
                                    alt="Officer profile" 
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="w-14 h-14 bg-gradient-to-br from-emerald-700 to-emerald-800 rounded-full flex items-center justify-center border-2 border-amber-400/50">
                                  <User className="w-7 h-7 text-amber-300" />
                                </div>
                              )}
                              <div>
                                <p className="font-black text-white text-lg">{user.full_name || 'Officer'}</p>
                                <p className="text-xs text-emerald-300 truncate font-medium">{user.email}</p>
                                <p className="text-xs text-amber-400 font-bold uppercase tracking-wider mt-1">Elite Member</p>
                              </div>
                            </div>
                          </div>

                          {/* Menu Items */}
                          <div className="py-2">
                            <Link 
                              href="/account" 
                              className="flex items-center px-6 py-4 text-sm text-slate-200 hover:bg-emerald-700/30 hover:text-amber-300 transition-all duration-300 group"
                              onClick={closeAllMenus}
                            >
                              <User className="w-5 h-5 mr-4 text-emerald-400" />
                              <span className="font-bold uppercase tracking-wide">My Account</span>
                              <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-amber-400" />
                            </Link>
                            <Link 
                              href="/dashboard" 
                              className="flex items-center px-6 py-4 text-sm text-slate-200 hover:bg-emerald-700/30 hover:text-amber-300 transition-all duration-300 group"
                              onClick={closeAllMenus}
                            >
                              <Target className="w-5 h-5 mr-4 text-emerald-400" />
                              <span className="font-bold uppercase tracking-wide">Training Dashboard</span>
                              <ArrowRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-amber-400" />
                            </Link>
                            <div className="border-t border-emerald-500/20 mt-2 pt-2">
                              <button 
                                onClick={handleSignOut}
                                className="w-full flex items-center px-6 py-4 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-all duration-300 font-bold uppercase tracking-wide"
                              >
                                <LogOut className="mr-4 w-5 h-5" />
                                Sign Out
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSignInOpen(true)}
                    className="text-slate-300 hover:text-amber-300 font-bold text-sm transition-all duration-300 py-3 px-6 rounded-lg hover:bg-slate-700/50 border border-transparent hover:border-slate-600/50 uppercase tracking-wider"
                  >
                    Sign In
                  </button>
                )}
                
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
                {loading ? (
                  <div className="w-8 h-8 rounded-full bg-slate-700/50 animate-pulse"></div>
                ) : user ? (
                  <div className="relative user-menu-container">
                    <button 
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="p-3 text-slate-300 hover:text-amber-300 hover:bg-slate-700/50 rounded-xl transition-all duration-300"
                      aria-label="User menu"
                    >
                      {user.avatar_url ? (
                        <div className="relative w-6 h-6 rounded-full border border-emerald-400/50 overflow-hidden">
                          <Image 
                            src={user.avatar_url} 
                            alt="User profile"
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <User className="w-6 h-6" />
                      )}
                    </button>

                    {/* Tablet User Dropdown - Simplified */}
                    {isUserMenuOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                        <div className="absolute right-0 top-full mt-2 w-64 bg-gradient-to-br from-slate-900/98 to-emerald-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-emerald-500/30 py-2 z-50">
                          <div className="px-4 py-3 border-b border-emerald-500/20">
                            <p className="font-bold text-white text-sm">{user.full_name || 'Officer'}</p>
                            <p className="text-xs text-emerald-300 truncate">{user.email}</p>
                          </div>
                          <Link 
                            href="/account" 
                            className="block px-4 py-3 text-sm text-slate-200 hover:bg-emerald-700/30 hover:text-amber-300 transition-colors duration-300"
                            onClick={closeAllMenus}
                          >
                            My Account
                          </Link>
                          <button 
                            onClick={handleSignOut}
                            className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-red-900/20 transition-colors duration-300"
                          >
                            Sign Out
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setIsSignInOpen(true)}
                    className="text-slate-300 hover:text-amber-300 font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-slate-700/50 transition-all duration-300 uppercase tracking-wide"
                  >
                    Sign In
                  </button>
                )}
                
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
                {/* Mobile User/Sign In Button */}
                {loading ? (
                  <div className="w-8 h-8 rounded-full bg-slate-700/50 animate-pulse"></div>
                ) : user ? (
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="p-2 text-slate-300 hover:text-amber-300 hover:bg-slate-700/50 rounded-lg transition-all duration-300"
                    aria-label="User menu"
                  >
                    {user.avatar_url ? (
                      <div className="relative w-6 h-6 rounded-full border border-emerald-400/50 overflow-hidden">
                        <Image 
                          src={user.avatar_url} 
                          alt="User profile"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <User className="w-6 h-6" />
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => setIsSignInOpen(true)}
                    className="p-2 text-slate-300 hover:text-amber-300 hover:bg-slate-700/50 rounded-lg transition-all duration-300"
                    aria-label="Sign in"
                  >
                    <User className="w-6 h-6" />
                  </button>
                )}

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
                  {/* User Section for Mobile */}
                  {user ? (
                    <div className="bg-gradient-to-r from-emerald-800/40 to-amber-600/20 rounded-2xl p-5 border-2 border-emerald-500/30 mb-6">
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-700 to-emerald-800 rounded-full flex items-center justify-center mr-4 border-2 border-amber-400/50">
                          {user.avatar_url ? (
                            <div className="relative w-16 h-16 rounded-full overflow-hidden">
                              <Image 
                                src={user.avatar_url} 
                                alt="Officer profile" 
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <User className="w-8 h-8 text-amber-300" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="font-black text-white text-lg">{user.full_name || 'Officer'}</div>
                          <div className="text-sm text-emerald-300 truncate">{user.email}</div>
                          <div className="text-xs text-amber-400 font-bold uppercase tracking-wider mt-1">Elite Member</div>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <Link 
                          href="/account"
                          className="flex-1 py-3 px-4 bg-slate-800/50 backdrop-blur-sm rounded-xl text-center text-sm font-bold text-slate-200 hover:bg-slate-700/50 transition-colors duration-300 border border-emerald-500/30 uppercase tracking-wide"
                          onClick={closeAllMenus}
                        >
                          My Account
                        </Link>
                        <button 
                          onClick={handleSignOut}
                          className="flex-1 py-3 px-4 bg-red-800/30 text-red-300 rounded-xl text-sm font-bold hover:bg-red-800/50 transition-colors duration-300 border border-red-500/30 uppercase tracking-wide"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gradient-to-r from-emerald-800/40 to-amber-600/20 rounded-2xl p-6 text-center border-2 border-emerald-500/30 mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-700 to-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-amber-400/50">
                        <User className="w-10 h-10 text-amber-300" />
                      </div>
                      <div className="mb-4 text-slate-200 font-bold text-lg">Join the Elite Academy</div>
                      <button 
                        onClick={() => {
                          setIsSignInOpen(true);
                          setMenuOpen(false);
                        }}
                        className="w-full py-4 px-6 bg-gradient-to-r from-emerald-700 to-green-800 text-white rounded-xl font-black hover:from-emerald-600 hover:to-green-700 transition-all duration-300 shadow-xl uppercase tracking-wider border-2 border-amber-500/40"
                      >
                        Access Officer Portal
                      </button>
                    </div>
                  )}

                  {/* Navigation Links */}
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

      {/* SignIn Modal Integration */}
      {isSignInOpen && (
        <SignIn 
          isOpen={isSignInOpen} 
          onClose={() => setIsSignInOpen(false)} 
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

        /* Custom scrollbar for dropdowns */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 2px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.5);
          border-radius: 2px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.7);
        }
      `}</style>
    </>
  );
};

export default Navbar;