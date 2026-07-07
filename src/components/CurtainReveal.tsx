'use client';

import React, { useState, useEffect, useCallback } from 'react';

export default function CurtainReveal() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [sealLoaded, setSealLoaded] = useState(false);

  // Load the wax seal shortly after the curtains mount
  useEffect(() => {
    const sealTimer = setTimeout(() => {
      setSealLoaded(true);
    }, 800); // 800ms after curtains render, stamp down the seal

    return () => clearTimeout(sealTimer);
  }, []);

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
