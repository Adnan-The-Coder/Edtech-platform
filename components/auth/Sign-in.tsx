/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useId } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2, X, Info, Shield, Star, Target } from 'lucide-react';

import { supabase } from '@/utils/supabase/client';
import { API_ENDPOINTS } from '@/config/api';

interface SignInProps {
  isOpen: boolean;
  onClose: () => void;
  redirectUrl?: string; // Add redirectUrl parameter
}

// Interface for IP geolocation data
interface GeoLocation {
  ip: string;
  city?: string;
  region?: string;
  country?: string;
  loc?: string;
  org?: string;
  postal?: string;
  timezone?: string;
}

const SignIn: React.FC<SignInProps> = ({ isOpen, onClose, redirectUrl }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [accountNotFound, setAccountNotFound] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const router = useRouter();
  const element_unique_id = useId();

  // Trigger animation when modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Close modal when escape key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(()=>{
      if (redirectUrl) {
        localStorage.setItem('authRedirectUrl', redirectUrl);
      } else {
        // If no redirectUrl is provided, store the current path
        localStorage.setItem('authRedirectUrl', window.location.pathname);
      }
  })

  // Function to get the user's IP address and geolocation
  const getIpAndLocation = async (): Promise<GeoLocation | null> => {
    try {
      // First get the IP address
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData:any = await ipResponse.json();
      const ip = ipData.ip;
      const IP_INFO_TOKEN = process.env.NEXT_PUBLIC_IP_INFO_TOKEN || 'db04343f368c67'; // Replace with your actual token
      
      // Then get geolocation data
      const geoResponse = await fetch(`https://ipinfo.io/${ip}/json?token=${IP_INFO_TOKEN}`);
      const geoData:any = await geoResponse.json();
      
      return {
        ip,
        city: geoData.city,
        region: geoData.region,
        country: geoData.country,
        loc: geoData.loc,
        org: geoData.org,
        postal: geoData.postal,
        timezone: geoData.timezone
      };
    } catch (error) {
      console.error('Error fetching IP or location:', error);
      
      return null;
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    setAccountNotFound(false);
    const locationInfo = await getIpAndLocation();

    try {
      // Attempt to sign in with email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data?.user) {
        // Check if user profile exists in backend
        const profileRes = await fetch(API_ENDPOINTS.getProfileByUUID(data.user.id), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        let profileData = null;
        if (profileRes.ok) {
          const profileJson:any = await profileRes.json();
          if (profileJson.success && profileJson.data) {
            profileData = profileJson.data;
            // Parse user_login_info if present and is a string
            if (profileData.user_login_info && typeof profileData.user_login_info === 'string') {
              try {
                profileData.user_login_info = JSON.parse(profileData.user_login_info);
              } catch {}
            }
          }
        }

        if (!profileData) {
          // Profile does not exist, create it
          const createRes = await fetch(API_ENDPOINTS.createProfile, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              uuid: data.user.id,
              full_name: data.user.user_metadata?.full_name || '',
              email: data.user.email || '',
              phone: data.user.user_metadata?.phone || '',
              avatar_url: data.user.user_metadata?.avatar_url || '',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }),
          });
          if (!createRes.ok) {
            const err:any = await createRes.json();
            throw new Error(err.message || 'Failed to create user profile');
          }
        } else {
          // Profile exists, update login info
          const userLoginInfo = {
            last_sign_in: new Date().toISOString(),
            sign_in_method: 'email',
            ip_address: locationInfo?.ip || profileData.user_login_info?.ip_address || 'unknown',
            location: locationInfo ? {
              city: locationInfo.city || 'unknown',
              region: locationInfo.region || 'unknown',
              country: locationInfo.country || 'unknown',
              coordinates: locationInfo.loc || 'unknown',
              timezone: locationInfo.timezone || 'unknown',
            } : profileData.user_login_info?.location || 'unknown',
            sign_in_count: (profileData.user_login_info?.sign_in_count || 0) + 1,
          };
          const updatePayload: any = {
            user_login_info: userLoginInfo,
            updated_at: new Date().toISOString(),
          };
          const updateRes = await fetch(API_ENDPOINTS.updateProfileByUUID(data.user.id), {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatePayload),
          });
          if (!updateRes.ok) {
            const err:any = await updateRes.json();
            throw new Error(err.message || 'Failed to update user profile');
          }
        }

        // Close modal and redirect after successful sign-in
        onClose();
        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          router.refresh();
        }
      }
    } catch (error: any) {
      if (error.message && error.message.includes('Invalid login credentials')) {
        setAccountNotFound(true);
        setError('Account not found. Please create an account to continue.');
      } else {
        setError(error.message || 'Failed to sign in');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      // Store the redirect URL in localStorage before redirecting to Google OAuth
      if (redirectUrl) {
        localStorage.setItem('authRedirectUrl', redirectUrl);
      } else {
        // If no redirectUrl is provided, store the current path
        localStorage.setItem('authRedirectUrl', window.location.pathname);
      }

      // Initiate Google OAuth sign-in
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: 'select_account', // Force account selection even if already logged in
            access_type: 'offline' // Get refresh token for server-side use
          }
        },
      });

      if (error) {
        throw error;
      }

      // The auth callback page will handle profile creation/update and redirection
    } catch (error: any) {
      setError(error.message || 'Failed to sign in with Google');
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError('Please enter your email address');

      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      setMessage('Password reset link sent to your email');
    } catch (error: any) {
      setError(error.message || 'Failed to send reset password email');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Military-Themed Modal Overlay */}
      <div
        className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900/80 via-emerald-900/60 to-slate-800/80 backdrop-blur-md transition-all duration-500"
        onClick={onClose}
      >
        {/* Animated background elements */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000" />
      </div>

      {/* Modal Content */}
      <div className={`fixed left-1/2 top-1/2 z-50 max-h-[95vh] w-full max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto transition-all duration-700 ease-out ${
        isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
      }`}>
        
        {/* Military-styled card with enhanced backdrop */}
        <div className="relative bg-gradient-to-br from-slate-900/95 via-emerald-900/90 to-slate-800/95 backdrop-blur-xl rounded-2xl border border-emerald-300/30 shadow-2xl shadow-emerald-500/20">
          
          {/* Subtle animated border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-amber-300/20 to-emerald-500/20 opacity-50 animate-pulse" 
               style={{ padding: '1px', margin: '-1px' }}>
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 rounded-2xl" />
          </div>

          <div className="relative z-10 p-8">
            {/* Close Button - Military style */}
            <button
              type='button'
              onClick={onClose}
              className="absolute right-6 top-6 rounded-full p-2 text-slate-400 transition-all duration-300 hover:bg-emerald-600/20 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/50"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            <div className="text-center mb-8">
              {/* Military Badge Header */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  {/* Enhanced logo container */}
                  <div className="relative size-20 rounded-full bg-gradient-to-br from-emerald-600/20 to-amber-500/20 backdrop-blur-sm border-2 border-emerald-300/40 p-3 shadow-xl">
                    <Image
                      src="/logo.png"
                      alt="SSB Academy Logo"
                      fill
                      className="object-contain p-2"
                      priority
                    />
                    {/* Elite badge indicator */}
                    <div className="absolute -top-1 -right-1">
                      <div className="size-6 bg-amber-400 rounded-full flex items-center justify-center shadow-lg">
                        <Star className="size-3 text-amber-900" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Military-styled heading */}
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Shield className="size-5 text-emerald-400" />
                <h2 className="text-2xl font-black text-transparent bg-gradient-to-r from-emerald-200 via-amber-200 to-emerald-200 bg-clip-text tracking-wider uppercase">
                  Officer Portal
                </h2>
                <Target className="size-5 text-amber-400" />
              </div>
              
              <p className="text-slate-300 text-sm font-medium mb-4">
                Access your elite training dashboard
              </p>
              
              <p className="text-sm text-slate-400">
                New to the academy?{' '}
                <Link 
                  href="/signup" 
                  className="font-bold text-amber-300 hover:text-amber-200 transition-colors duration-300 underline decoration-amber-300/50 hover:decoration-amber-200/70"
                >
                  Begin Your Journey
                </Link>
              </p>
            </div>

            {/* Enhanced Alert Messages */}
            {error && (
              <div className="mb-6 rounded-lg border-l-4 border-red-500 bg-gradient-to-r from-red-900/20 to-red-800/10 backdrop-blur-sm p-4 shadow-lg">
                <div className="flex items-center">
                  <AlertCircle className="mr-3 size-5 text-red-400" />
                  <p className="text-sm text-red-200 font-medium">{error}</p>
                </div>
                {accountNotFound && (
                  <div className="mt-3 flex items-center">
                    <Info className="mr-2 size-4 text-amber-400" />
                    <p className="text-xs text-amber-200">
                      <Link 
                        href="/signup" 
                        className="font-bold underline decoration-amber-300/50 hover:decoration-amber-200/70 transition-all duration-300"
                      >
                        Join the Elite Academy
                      </Link> - Begin your officer training today.
                    </p>
                  </div>
                )}
              </div>
            )}

            {message && (
              <div className="mb-6 rounded-lg border-l-4 border-emerald-500 bg-gradient-to-r from-emerald-900/20 to-emerald-800/10 backdrop-blur-sm p-4 shadow-lg">
                <p className="text-sm text-emerald-200 font-medium">{message}</p>
              </div>
            )}

            {/* Military-styled Form */}
            <form className="space-y-6" onSubmit={handleEmailSignIn}>
              <div className="space-y-4">
                {/* Email Field */}
                <div className="relative group">
                  <label htmlFor="email-address" className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
                    Email Address
                  </label>
                  <Mail className="absolute left-4 top-12 size-5 text-emerald-400 transition-colors duration-300 group-focus-within:text-amber-300" />
                  <input
                    id={element_unique_id + '_email'}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full bg-gradient-to-r from-slate-800/80 to-emerald-900/30 backdrop-blur-sm border-2 border-emerald-500/30 rounded-lg pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:border-amber-400/70 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all duration-300 shadow-inner hover:border-emerald-400/50"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password Field */}
                <div className="relative group">
                  <label htmlFor="password" className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wider">
                    Password
                  </label>
                  <Lock className="absolute left-4 top-12 size-5 text-emerald-400 transition-colors duration-300 group-focus-within:text-amber-300" />
                  <input
                    id={element_unique_id + '_password'}
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full bg-gradient-to-r from-slate-800/80 to-emerald-900/30 backdrop-blur-sm border-2 border-emerald-500/30 rounded-lg pl-12 pr-12 py-3 text-white placeholder-slate-400 focus:border-amber-400/70 focus:outline-none focus:ring-2 focus:ring-amber-400/30 transition-all duration-300 shadow-inner hover:border-emerald-400/50"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-12 text-slate-400 hover:text-amber-300 transition-colors duration-300 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Options Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id={element_unique_id + '_remember'}
                    name="remember-me"
                    type="checkbox"
                    className="size-4 rounded border-emerald-500/50 bg-slate-800/50 text-amber-400 focus:ring-amber-400/30 focus:ring-offset-slate-900 accent-amber-400"
                  />
                  <label htmlFor={element_unique_id + '_remember'} className="ml-3 text-sm font-medium text-slate-300">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={handlePasswordReset}
                  className="text-sm font-bold text-amber-300 hover:text-amber-200 transition-colors duration-300 underline decoration-amber-300/50 hover:decoration-amber-200/70"
                >
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button - Military Command Style */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-500 hover:to-emerald-600 text-white font-black text-lg tracking-widest uppercase py-4 rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/30 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-emerald-400/50 border-2 border-amber-300/40 hover:border-amber-300/70 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    {loading ? (
                      <>
                        <Loader2 className="size-5 animate-spin" />
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <Shield className="size-5" />
                        <span>Access Portal</span>
                      </>
                    )}
                  </span>
                  {/* Animated overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-amber-500/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </button>
              </div>
            </form>

            {/* Military-styled Divider */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-emerald-500/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-gradient-to-r from-slate-900 via-emerald-900 to-slate-900 px-4 text-slate-400 font-medium uppercase tracking-wider">
                    Alternative Access
                  </span>
                </div>
              </div>

              {/* Google Sign-in - Military Style */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="group w-full flex items-center justify-center bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm border-2 border-slate-600/50 hover:border-emerald-400/50 text-slate-200 hover:text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-slate-500/30 transform hover:scale-[1.01]"
                >
                  <svg className="mr-3 size-5" viewBox="0 0 24 24">
                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                      <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" />
                      <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" />
                      <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" />
                      <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" />
                    </g>
                  </svg>
                  <span className="uppercase tracking-wider">Continue with Google</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        /* Custom scrollbar for modal content */
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

export default SignIn;