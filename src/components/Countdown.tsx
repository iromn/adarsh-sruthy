'use client';

import React, { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const weddingDate = new Date('August 23, 2026 12:05:00').getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference < 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0')
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="countdown-grid reveal delay-200">
      <div className="countdown-box">
        <div className="countdown-val">{timeLeft.days}</div>
        <div className="countdown-lbl">Days</div>
      </div>
      <div className="countdown-box">
        <div className="countdown-val">{timeLeft.hours}</div>
        <div className="countdown-lbl">Hours</div>
      </div>
      <div className="countdown-box">
        <div className="countdown-val">{timeLeft.minutes}</div>
        <div className="countdown-lbl">Minutes</div>
      </div>
      <div className="countdown-box">
        <div className="countdown-val">{timeLeft.seconds}</div>
        <div className="countdown-lbl">Seconds</div>
      </div>
    </div>
  );
}
