"use client";
import { Star, Target, ArrowRight, Play } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import VideoModal from '@/components/VideoModal';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Trigger animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Preload background image
    const img = new window.Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => {
      // Fallback if local image fails to load
      console.warn('Local hero-2.png failed to load, using fallback');
      setImageLoaded(false);
    };
    img.src = '/hero-2.png';

    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    // Smooth scroll to next section or navigate to enrollment
    const nextSection = document.getElementById('courses') || document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/enroll';
    }
  };

  const handleWatchVideo = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20 lg:pt-24">
        {/* Background Image with Multiple Overlay Layers */}
        <div className="absolute inset-0">
          {/* Next.js optimized background image */}
          {imageLoaded && (
            <div className="absolute inset-0">
              <Image
                src="/hero-2.png"
                alt="SSB Academy Training Background"
                fill
                className="object-cover object-center"
                priority
                quality={90}
                sizes="100vw"
                onError={() => {
                  console.warn('Next.js Image failed to load hero-2.png');
                  setImageLoaded(false);
                }}
              />
            </div>
          )}
          
          {/* CSS background image as fallback */}
          <div 
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              imageLoaded ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              backgroundImage: `url('/hero-2.png')`
            }}
          />
          
          {/* Fallback gradient background when image fails */}
          <div className={`absolute inset-0 bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 transition-opacity duration-1000 ${
            imageLoaded ? 'opacity-0' : 'opacity-100'
          }`} />
          
          {/* Primary overlay for perfect opacity blending */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-emerald-900/75 to-slate-800/85" />
          
          {/* Secondary overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
          
          {/* Radial overlay for center focus */}
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/50" />
          
          {/* Animated enhancement orbs */}
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-amber-500/15 rounded-full blur-3xl animate-pulse animation-delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 bg-green-400/15 rounded-full blur-2xl animate-pulse animation-delay-2000" />
          
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1200 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}>
            
            {/* Elite Badge */}
            <div className="inline-flex items-center justify-center space-x-2 bg-emerald-800/40 backdrop-blur-lg border border-emerald-300/50 rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-6 sm:mb-8 hover:bg-emerald-700/50 hover:border-emerald-300/70 transition-all duration-300 group shadow-xl">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 group-hover:rotate-12 transition-transform duration-300" fill="currentColor" />
              <span className="text-amber-200 font-bold text-xs sm:text-sm tracking-widest uppercase">Elite SSB Academy</span>
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 group-hover:-rotate-12 transition-transform duration-300" fill="currentColor" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 leading-[0.9] tracking-tight">
              <span className="block bg-gradient-to-r from-white via-amber-100 to-emerald-100 bg-clip-text text-transparent hover:from-amber-200 hover:via-white hover:to-emerald-200 transition-all duration-700 drop-shadow-2xl">
                BECOME AN
              </span>
              <span className="block bg-gradient-to-r from-emerald-300 via-amber-300 to-amber-200 bg-clip-text text-transparent hover:from-amber-300 hover:via-emerald-300 hover:to-green-300 transition-all duration-700 mt-1 sm:mt-2 drop-shadow-2xl">
                OFFICER
              </span>
            </h1>

            {/* Streamlined Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-slate-200/90 mb-10 sm:mb-12 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed font-medium backdrop-blur-sm">
              Elite training for <span className="text-amber-300 font-bold">future leaders</span> of the Indian Armed Forces
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 px-4 sm:px-0">
              <button 
                onClick={handleGetStarted}
                className="group relative w-full sm:w-auto bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-700 hover:from-emerald-500 hover:via-green-500 hover:to-emerald-600 text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg tracking-wider uppercase transition-all duration-300 shadow-2xl hover:shadow-emerald-400/40 transform hover:scale-105 hover:-translate-y-1 overflow-hidden border-2 border-amber-300/60 hover:border-amber-300/80 focus:outline-none focus:ring-4 focus:ring-emerald-400/50 backdrop-blur-sm"
              >
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                  <span>Join Elite Training</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={3} />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-amber-400/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button 
                onClick={handleWatchVideo}
                className="group w-full sm:w-auto flex items-center justify-center space-x-3 text-white hover:text-amber-200 font-bold text-base sm:text-lg transition-all duration-300 py-4 sm:py-5 px-6 sm:px-8 rounded-2xl hover:bg-white/15 backdrop-blur-md border-2 border-white/30 hover:border-amber-300/70 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl hover:shadow-2xl"
              >
                <div className="w-12 h-8 sm:w-14 sm:h-14 bg-white/20 hover:bg-amber-400/40 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0 shadow-lg">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5" fill="currentColor" />
                </div>
                <span className="uppercase tracking-wider">Success Stories</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Video Modal Component */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={closeVideoModal}
        videoSrc="/sample-video.mp4"
        title="Officer Success Stories"
        description="Inspiring journeys of our successful cadets who became officers in the Indian Armed Forces"
      />

      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .bg-radial-gradient {
          background: radial-gradient(ellipse at center, var(--tw-gradient-stops));
        }

        @media (max-width: 640px) {
          .tracking-tight {
            letter-spacing: -0.02em;
          }
        }

        /* Enhanced responsive adjustments */
        @media (max-width: 480px) {
          .leading-\[0\.9\] {
            line-height: 0.85;
          }
        }
      `}</style>
    </>
  );
};

export default Hero;