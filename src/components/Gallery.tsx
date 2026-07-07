'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Photo {
  src: string;
  caption: string;
}

const PHOTOS: Photo[] = [
  { src: '/assets/photos/photo1.jpg', caption: 'A beautiful beginning' },
  { src: '/assets/photos/photo2.jpg', caption: 'Shared smiles, timeless memories' },
  { src: '/assets/photos/photo3.jpg', caption: 'Traditional style and elegance' },
  { src: '/assets/photos/photo4.jpg', caption: 'Gazing towards a bright future' },
  { src: '/assets/photos/photo5.jpg', caption: 'A promise of togetherness' },
  { src: '/assets/photos/photo6.jpg', caption: 'Love wrapped in warm sunlight' }
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const nextImage = () => {
    setCurrentIndex(prev => (prev + 1) % PHOTOS.length);
  };

  const prevImage = () => {
    setCurrentIndex(prev => (prev - 1 + PHOTOS.length) % PHOTOS.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Start autoplay timer
  useEffect(() => {
    if (!isHovered) {
      autoplayTimerRef.current = setInterval(nextImage, 4000); // 4 seconds interval
    }
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isHovered]);

  return (
    <div 
      className="gallery-carousel-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '500px',
        margin: '40px auto 0',
        aspectRatio: '4/5', // elegant portrait ratio
        overflow: 'hidden',
        border: '1px solid rgba(197, 168, 128, 0.35)',
        boxShadow: '0 15px 35px rgba(46, 30, 23, 0.12)',
        backgroundColor: 'var(--bg-beige)'
      }}
    >
      {/* Slides Container */}
      <div 
        style={{
          width: '100%',
          height: '100%',
          position: 'relative'
        }}
      >
        {PHOTOS.map((photo, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'scale(1)' : 'scale(1.03)',
                transition: 'opacity 1.2s ease-in-out, transform 1.2s ease-in-out',
                zIndex: isActive ? 2 : 1,
                pointerEvents: isActive ? 'auto' : 'none'
              }}
            >
              <img 
                src={photo.src} 
                alt={photo.caption} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }} 
              />
              
              {/* Elegant Text Overlay at bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  background: 'linear-gradient(to top, rgba(46, 30, 23, 0.9) 0%, rgba(46, 30, 23, 0.4) 60%, transparent 100%)',
                  padding: '40px 25px 25px',
                  color: 'var(--bg-ivory)',
                  textAlign: 'center',
                  zIndex: 3
                }}
              >
                <p 
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '20px',
                    fontStyle: 'italic',
                    letterSpacing: '0.05em',
                    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.8s ease-out 0.4s, transform 0.8s ease-out 0.4s'
                  }}
                >
                  {photo.caption}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevImage}
        aria-label="Previous Slide"
        style={{
          position: 'absolute',
          top: '50%',
          left: '20px',
          transform: 'translateY(-50%)',
          zIndex: 10,
          background: 'rgba(253, 251, 247, 0.25)',
          color: 'var(--bg-ivory)',
          border: '1px solid rgba(253, 251, 247, 0.4)',
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(3px)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(253, 251, 247, 0.9)';
          e.currentTarget.style.color = 'var(--teak)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(253, 251, 247, 0.25)';
          e.currentTarget.style.color = 'var(--bg-ivory)';
        }}
      >
        &#10094;
      </button>
      <button 
        onClick={nextImage}
        aria-label="Next Slide"
        style={{
          position: 'absolute',
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
          zIndex: 10,
          background: 'rgba(253, 251, 247, 0.25)',
          color: 'var(--bg-ivory)',
          border: '1px solid rgba(253, 251, 247, 0.4)',
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(3px)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(253, 251, 247, 0.9)';
          e.currentTarget.style.color = 'var(--teak)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(253, 251, 247, 0.25)';
          e.currentTarget.style.color = 'var(--bg-ivory)';
        }}
      >
        &#10095;
      </button>

      {/* Navigation Indicators (Dots) */}
      <div 
        style={{
          position: 'absolute',
          bottom: '15px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          zIndex: 10
        }}
      >
        {PHOTOS.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: index === currentIndex ? 'var(--gold)' : 'rgba(253, 251, 247, 0.4)',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              transform: index === currentIndex ? 'scale(1.2)' : 'scale(1)'
            }}
          />
        ))}
      </div>
    </div>
  );
}
