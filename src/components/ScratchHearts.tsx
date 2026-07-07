'use client';

import React, { useRef, useEffect, useState } from 'react';

interface HeartProps {
  label: string;
  value: string;
}

function ScratchHeart({ label, value }: HeartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isFaded, setIsFaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Draw the initial clay heart shape
    ctx.clearRect(0, 0, w, h);
    
    // Heart fill gradient (terracotta clay blend)
    ctx.fillStyle = '#C8745E'; 
    ctx.beginPath();
    ctx.moveTo(w / 2, h * 0.28);
    ctx.bezierCurveTo(w * 0.15, h * 0.05, w * 0.05, h * 0.45, w * 0.5, h * 0.88);
    ctx.bezierCurveTo(w * 0.95, h * 0.45, w * 0.85, h * 0.05, w / 2, h * 0.28);
    ctx.closePath();
    ctx.fill();

    // Antique Gold Border
    ctx.strokeStyle = '#C5A880';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Text overlay inside the heart before scratch
    ctx.fillStyle = '#FDFBF7';
    ctx.font = 'italic 12px Cormorant Garamond';
    ctx.textAlign = 'center';
    ctx.fillText('S & A', w / 2, h * 0.52);
  }, []);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsScratching(true);
    scratch(e);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching) return;
    scratch(e);
  };

  const handleEnd = () => {
    setIsScratching(false);
    checkScratchProgress();
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if ('touches' in e) {
      if (e.touches.length === 0) return;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 12, 0, Math.PI * 2); // 12px scratch radius
    ctx.fill();
  };

  const checkScratchProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparentCount = 0;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) {
          transparentCount++;
        }
      }

      const totalPixels = canvas.width * canvas.height;
      const percent = (transparentCount / totalPixels) * 100;

      if (percent > 30) {
        setIsFaded(true);
      }
    } catch (e) {
      setIsFaded(true);
    }
  };

  return (
    <div className="scratch-heart-wrapper" style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0 }}>
      {/* Underlying revealed value */}
      <div 
        className="scratch-reveal-value" 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1
        }}
      >
        <span style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--gold-dark)', marginBottom: '2px' }}>
          {label}
        </span>
        <span style={{ fontSize: '20px', fontFamily: 'var(--font-sans)', color: 'var(--teak)', fontWeight: '600', lineHeight: 1.1 }}>
          {value}
        </span>
      </div>

      {/* Erasable Canvas Overlay */}
      <canvas
        ref={canvasRef}
        width={100}
        height={100}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 2,
          cursor: 'pointer',
          touchAction: 'none',
          opacity: isFaded ? 0 : 1,
          pointerEvents: isFaded ? 'none' : 'auto',
          transition: 'opacity 0.8s ease'
        }}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      />
    </div>
  );
}

export default function ScratchHearts() {
  return (
    <div className="scratch-hearts-section" style={{ margin: '30px auto', maxWidth: '360px' }}>
      <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '16px', color: 'var(--sage)', marginBottom: '20px' }}>
        Scratch the hearts to reveal our wedding date
      </p>
      
      <div 
        className="scratch-hearts-row" 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '12px',
          flexWrap: 'nowrap',
          marginBottom: '20px'
        }}
      >
        <ScratchHeart label="Day" value="23" />
        <ScratchHeart label="Month" value="08" />
        <ScratchHeart label="Year" value="2026" />
      </div>
    </div>
  );
}
