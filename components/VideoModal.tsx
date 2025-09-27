/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { X, Volume2, VolumeX, Play, Pause, Maximize, Minimize } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const VideoModal = ({ isOpen, onClose, videoSrc = "/sample-video.mp4", title = "Officer Success Stories", description = "Inspiring journeys of our cadets" }:any) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
//   const controlsTimeoutRef = useRef<number | null>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (e:any) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          exitFullscreen();
        } else {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isFullscreen, onClose]);

  // Auto-hide controls
  useEffect(() => {
    if (isPlaying && showControls) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [isPlaying, showControls]);

  // Video event handlers
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e:any) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      setIsMuted(newVolume === 0);
    }
  };

  const handleProgressChange = (e:any) => {
    const newTime = (e.target.value / 100) * duration;
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
    }
  };

  const formatTime = (time:any) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (modalRef.current?.requestFullscreen) {
        modalRef.current.requestFullscreen();
      } else if ((modalRef.current as any)?.webkitRequestFullscreen) {
        (modalRef.current as any).current.webkitRequestFullscreen();
      } else if ((modalRef.current as any)?.msRequestFullscreen) {
        (modalRef.current as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      exitFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
    setIsFullscreen(false);
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
  };

  const handleVideoClick = () => {
    handlePlayPause();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        ref={modalRef}
        className={`relative w-full max-w-6xl mx-4 bg-slate-900/98 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-emerald-400/30 ${
          isFullscreen ? 'max-w-none mx-0 rounded-none h-screen' : ''
        }`}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-20 w-12 h-12 bg-black/60 hover:bg-red-500/80 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm ${
            showControls ? 'opacity-100' : 'opacity-0'
          } ${isFullscreen ? 'top-6 right-6' : ''}`}
        >
          <X className="w-6 h-6" strokeWidth={2.5} />
        </button>

        {/* Video Container */}
        <div className={`relative ${isFullscreen ? 'h-screen' : 'aspect-video'} bg-black group cursor-pointer`}>
          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90">
              <div className="w-12 h-12 border-4 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            onClick={handleVideoClick}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onWaiting={() => setIsLoading(true)}
            onCanPlay={() => setIsLoading(false)}
            playsInline
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Center Play Button Overlay */}
          {!isPlaying && !isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlayPause}
                className="w-20 h-20 bg-emerald-600/90 hover:bg-emerald-500 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-2xl backdrop-blur-sm"
              >
                <Play className="w-10 h-10 ml-1" fill="currentColor" />
              </button>
            </div>
          )}

          {/* Video Controls Overlay */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4 transition-all duration-300 ${
            showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            {/* Progress Bar */}
            <div className="mb-4">
              <input
                type="range"
                min="0"
                max="100"
                value={duration ? (currentTime / duration) * 100 : 0}
                onChange={handleProgressChange}
                className="w-full h-2 bg-slate-600/50 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {/* Play/Pause */}
                <button
                  onClick={handlePlayPause}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:scale-105"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" fill="currentColor" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" fill="currentColor" />
                  )}
                </button>

                {/* Volume Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleMuteToggle}
                    className="w-8 h-8 flex items-center justify-center text-white hover:text-emerald-400 transition-colors"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume * 100}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-slate-600/50 rounded-lg appearance-none cursor-pointer volume-slider hidden sm:block"
                  />
                </div>

                {/* Time Display */}
                <div className="text-white text-sm font-medium hidden sm:block">
                  {formatTime(currentTime)} / {formatTime(duration || 0)}
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Title and Description */}
                <div className="text-right hidden md:block">
                  <p className="text-white font-bold text-sm">{title}</p>
                  <p className="text-slate-300 text-xs">{description}</p>
                </div>

                {/* Fullscreen Toggle */}
                <button
                  onClick={toggleFullscreen}
                  className="w-8 h-8 flex items-center justify-center text-white hover:text-emerald-400 transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize className="w-5 h-5" />
                  ) : (
                    <Maximize className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .slider {
          background: linear-gradient(to right, #10b981 0%, #10b981 var(--progress, 0%), #64748b var(--progress, 0%), #64748b 100%);
        }

        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .volume-slider {
          background: linear-gradient(to right, #10b981 0%, #10b981 var(--volume, 100%), #64748b var(--volume, 100%), #64748b 100%);
        }

        .volume-slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 1px solid white;
        }

        .volume-slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 1px solid white;
        }
      `}</style>
    </div>
  );
};

export default VideoModal;