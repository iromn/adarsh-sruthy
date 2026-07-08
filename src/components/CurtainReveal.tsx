'use client';

import React, { useState, useEffect, useCallback } from 'react';

export default function CurtainReveal() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [sealLoaded, setSealLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [preloaderActive, setPreloaderActive] = useState(true);

  // Preload curtain images and seal image before showing curtains
  useEffect(() => {
    const imagesToPreload = [
      '/assets/illustrations/curtain_left.png',
      '/assets/illustrations/curtain_right.png',
      '/assets/illustrations/seal.png'
    ];

    let loadedCount = 0;
    let isCancelled = false;

    const handleImageLoad = () => {
      if (isCancelled) return;
      loadedCount++;
      if (loadedCount === imagesToPreload.length) {
        setTimeout(() => {
          setImagesLoaded(true);
        }, 800);
      }
    };

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = handleImageLoad;
      img.onerror = handleImageLoad;
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  // Deactivate preloader DOM node after fade out animation completes
  useEffect(() => {
    if (imagesLoaded) {
      const timer = setTimeout(() => {
        setPreloaderActive(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [imagesLoaded]);

  // Load the wax seal shortly after the curtains are visible
  useEffect(() => {
    if (imagesLoaded) {
      const sealTimer = setTimeout(() => {
        setSealLoaded(true);
      }, 400);

      return () => clearTimeout(sealTimer);
    }
  }, [imagesLoaded]);

  // Remove the curtain overlay from the DOM after the slide animation finishes
  useEffect(() => {
    if (isRevealed) {
      const timer = setTimeout(() => {
        setIsMounted(false);
      }, 1900); // 1.9s matching transition time
      return () => clearTimeout(timer);
    }
  }, [isRevealed]);

  // Lock scrolling when the curtain is mounted, and unlock it once the curtain is gone
  useEffect(() => {
    if (isMounted) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isMounted]);

  const handleReveal = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    if (isRevealed) return;
    setIsRevealed(true);

    // Dispatch curtain reveal start event to parent page
    try {
      window.dispatchEvent(new CustomEvent('curtain-reveal-start'));
    } catch (err) {
      console.error('Curtain reveal start dispatch failed: ', err);
    }

    // Play audio safely within user gesture call stack
    const audio = document.getElementById('bg-music') as HTMLAudioElement | null;
    if (audio) {
      try {
        const playPromise = audio.play();
        if (playPromise !== undefined && typeof playPromise.catch === 'function') {
          playPromise.catch(err => {
            console.warn('Autoplay playPromise rejected: ', err);
            triggerBackupEvent();
          });
        }
      } catch (err) {
        console.warn('Synchronous play call failed: ', err);
        triggerBackupEvent();
      }
    } else {
      triggerBackupEvent();
    }
  }, [isRevealed]);

  const triggerBackupEvent = () => {
    try {
      window.dispatchEvent(new CustomEvent('play-wedding-music'));
    } catch (err) {
      console.error('Backup audio dispatch failed: ', err);
    }
  };

  if (!isMounted) return null;

  const tapStyles: React.CSSProperties = {
    WebkitTapHighlightColor: 'transparent',
    userSelect: 'none',
    outline: 'none'
  };

  return (
    <div 
      className={`curtain-wrapper ${isRevealed ? 'revealed' : ''}`}
      onClick={handleReveal}
      onTouchEnd={handleReveal}
      role="button"
      tabIndex={0}
      aria-label="Wedding Invitation, Tap to Enter"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleReveal();
        }
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 10000,
        overflow: 'hidden',
        cursor: 'pointer',
        pointerEvents: isRevealed ? 'none' : 'auto',
        ...tapStyles
      }}
    >
      {/* Premium Wedding Preloader */}
      {preloaderActive && (
        <>
          <style>{`
            @keyframes flameFlicker {
              0% { transform: scale(1) rotate(-1deg); filter: brightness(1); }
              20% { transform: scale(0.95) rotate(1deg); filter: brightness(1.1); }
              40% { transform: scale(1.05) rotate(-2deg); filter: brightness(1); }
              60% { transform: scale(0.98) rotate(2deg); filter: brightness(1.2); }
              80% { transform: scale(1.02) rotate(-1deg); filter: brightness(1.1); }
              100% { transform: scale(1) rotate(0deg); filter: brightness(1); }
            }
            .preloader-flame {
              animation: flameFlicker 1.5s infinite ease-in-out;
              transform-origin: 50px 38px;
            }
            @keyframes pulseGlow {
              0% { opacity: 0.6; }
              50% { opacity: 1; }
              100% { opacity: 0.6; }
            }
            .preloader-title {
              animation: pulseGlow 2.5s infinite ease-in-out;
            }
            @keyframes dotWave {
              0%, 100% { opacity: 0.2; }
              50% { opacity: 1; }
            }
            .loading-dots .dot {
              animation: dotWave 1.4s infinite;
              display: inline-block;
              font-weight: bold;
            }
            .loading-dots .dot:nth-child(2) {
              animation-delay: 0.2s;
            }
            .loading-dots .dot:nth-child(3) {
              animation-delay: 0.4s;
            }
          `}</style>
          <div
            className={`wedding-preloader ${imagesLoaded ? 'loaded' : ''}`}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'var(--bg-ivory)',
              zIndex: 10005,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'opacity 0.8s ease-out, visibility 0.8s ease-out',
              opacity: imagesLoaded ? 0 : 1,
              visibility: imagesLoaded ? 'hidden' : 'visible',
              pointerEvents: imagesLoaded ? 'none' : 'auto'
            }}
          >
            {/* Ambient Paper Texture overlay */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: "url('/assets/illustrations/paper_texture.png')",
                backgroundRepeat: 'repeat',
                opacity: 0.15,
                pointerEvents: 'none',
                zIndex: 1
              }}
            />

            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              {/* Animated Nilavilakku (Traditional Kerala Lamp) SVG */}
              <svg 
                className="preloader-lamp" 
                viewBox="0 0 100 100" 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  fill: 'var(--gold)',
                  filter: 'drop-shadow(0 4px 8px rgba(197, 168, 128, 0.3))'
                }}
              >
                {/* Flame */}
                <path 
                  className="preloader-flame"
                  d="M50,15 C53,25 56,28 50,38 C44,28 47,25 50,15 Z" 
                  fill="#C8745E"
                />
                {/* Lamp body */}
                <path d="M48,38 L52,38 L52,70 L48,70 Z" />
                <path d="M44,70 L56,70 L58,74 L42,74 Z" />
                {/* Base */}
                <ellipse cx="50" cy="76" rx="14" ry="4" />
                <path d="M38,76 L62,76 L65,85 L35,85 Z" />
                <ellipse cx="50" cy="85" rx="20" ry="5" />
                {/* Top Bowl */}
                <ellipse cx="50" cy="38" rx="12" ry="3" />
                <path d="M38,38 C38,44 62,44 62,38 Z" />
                {/* Middle Bowl */}
                <ellipse cx="50" cy="55" rx="8" ry="2" />
                <path d="M42,55 C42,59 58,59 58,55 Z" />
              </svg>

              {/* Pulsating Monogram/Text */}
              <h2 
                className="preloader-title"
                style={{
                  fontFamily: 'var(--font-script)',
                  fontSize: '36px',
                  color: 'var(--teak)',
                  margin: '10px 0 0 0',
                  textAlign: 'center',
                  letterSpacing: '1px'
                }}
              >
                Adarsh & Sruthy
              </h2>

              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: 'var(--gold-dark)',
                  opacity: 0.8
                }}
              >
                <span>Loading Invitation</span>
                <span className="loading-dots">
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                </span>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Left curtain panel */}
      <div 
        className="curtain curtain-left"
        style={{
          position: 'absolute',
          top: '-10px',
          left: '-22px',
          width: '63vw',
          height: '107vh',
          backgroundImage: "url('/assets/illustrations/curtain_left.png')",
          backgroundSize: '100% 100%',
          transform: isRevealed ? 'translateX(-100%) scaleX(0.4)' : 'translateX(0) scaleX(1)',
          transformOrigin: 'left center',
          transition: 'transform 1.8s cubic-bezier(0.77, 0, 0.175, 1)',
          boxShadow: isRevealed ? 'none' : '5px 0 15px rgba(0,0,0,0.3)',
          zIndex: 10002
        }}
      />

      {/* Right curtain panel */}
      <div 
        className="curtain curtain-right"
        style={{
          position: 'absolute',
          top: '-10px',
          right: '-22px',
          width: '63vw',
          height: '107vh',
          backgroundImage: "url('/assets/illustrations/curtain_right.png')",
          backgroundSize: '100% 100%',
          transform: isRevealed ? 'translateX(100%) scaleX(0.4)' : 'translateX(0) scaleX(1)',
          transformOrigin: 'right center',
          transition: 'transform 1.8s cubic-bezier(0.77, 0, 0.175, 1)',
          boxShadow: isRevealed ? 'none' : '-5px 0 15px rgba(0,0,0,0.3)',
          zIndex: 10002
        }}
      />

      {/* Center Wax Seal Tap Button */}
      <button
        type="button"
        onClick={handleReveal}
        onTouchEnd={handleReveal}
        aria-label="Tap to open wedding invitation"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          zIndex: 10003,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px',
          opacity: isRevealed ? 0 : (sealLoaded ? 1 : 0),
          transform: isRevealed 
            ? 'translate(-50%, -50%) scale(0.7)' 
            : `translate(-50%, -50%) scale(${sealLoaded ? 1 : 1.8})`,
          transition: 'opacity 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)', // bounce stamp effect
          pointerEvents: isRevealed ? 'none' : 'auto',
          ...tapStyles
        }}
      >
        <img 
          src="/assets/illustrations/seal.png" 
          alt="Wax Seal" 
          className="seal-pulse"
          style={{
            width: '120px',
            height: '120px',
            objectFit: 'contain',
            filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.55))',
            ...tapStyles
          }}
        />
      </button>
    </div>
  );
}
