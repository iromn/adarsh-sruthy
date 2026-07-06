'use client';

import React, { useState, useEffect } from 'react';

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
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex(prev => (prev + 1) % PHOTOS.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex(prev => (prev - 1 + PHOTOS.length) % PHOTOS.length);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <div className="gallery-masonry">
        {PHOTOS.map((photo, index) => (
          <div 
            key={index} 
            className="gallery-item reveal" 
            onClick={() => openLightbox(index)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <img src={photo.src} alt={photo.caption} loading="lazy" />
          </div>
        ))}
      </div>

      {isOpen && (
        <div 
          className="lightbox active" 
          role="dialog" 
          aria-modal="true" 
          onClick={closeLightbox}
        >
          <span className="lightbox-close" onClick={closeLightbox}>&times;</span>
          <span className="lightbox-nav lightbox-prev" onClick={prevImage}>&#10094;</span>
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <img 
              src={PHOTOS[currentIndex].src} 
              alt={PHOTOS[currentIndex].caption} 
              className="lightbox-img" 
            />
            <p className="lightbox-caption">{PHOTOS[currentIndex].caption}</p>
          </div>
          <span className="lightbox-nav lightbox-next" onClick={nextImage}>&#10095;</span>
        </div>
      )}
    </>
  );
}
