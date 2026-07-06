'use client';

import React, { useEffect, useState } from 'react';

interface Leaf {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
  rotation: number;
  drift: number;
  type: 'green' | 'brown';
}

export default function FallingPetals() {
  const [leaves, setLeaves] = useState<Leaf[]>([]);

  useEffect(() => {
    const generated: Leaf[] = [];
    for (let i = 0; i < 12; i++) {
      generated.push({
        id: i,
        size: Math.random() * 6 + 10,      // 10–16px (slightly smaller)
        left: Math.random() * 100,
        delay: Math.random() * 14,           // spread starts across 0–14s so they trickle in
        duration: Math.random() * 8 + 14,    // 14–22s fall time (slower, gentler)
        rotation: Math.random() * 360,
        drift: (Math.random() - 0.5) * 15,
        type: Math.random() > 0.5 ? 'green' : 'brown',
      });
    }
    setLeaves(generated);
  }, []);

  return (
    <div className="petal-container" aria-hidden="true">
      <style>{`
        @keyframes leafFall {
          0% {
            transform: translateY(-5vh) translateX(0) rotate(0deg);
            opacity: 0.7;
          }
          100% {
            transform: translateY(110vh) translateX(var(--drift)) rotate(var(--spin));
            opacity: 0.4;
          }
        }
      `}</style>

      {leaves.map(leaf => (
        <div
          key={leaf.id}
          className={`petal petal-${leaf.type}`}
          style={{
            '--drift': `${leaf.drift}vw`,
            '--spin': `${leaf.rotation + 360}deg`,
            width: `${leaf.size}px`,
            height: `${leaf.size * 0.6}px`,
            left: `${leaf.left}%`,
            top: '-20px',
            animation: `leafFall ${leaf.duration}s ${leaf.delay}s linear infinite`,
            opacity: 0.65,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
