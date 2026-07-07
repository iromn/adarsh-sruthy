'use client';

import React, { useState } from 'react';

export default function RsvpForm() {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState('attending');
  const [guestCount, setGuestCount] = useState('1');
  const [notes, setNotes] = useState('');
  const [waxActive, setWaxActive] = useState(false);
  const [waxText, setWaxText] = useState('S & A');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const response = {
      name: name.trim(),
      attendance,
      guestCount: attendance === 'declining' ? '0' : guestCount,
      notes: notes.trim(),
      dateSubmitted: new Date().toISOString()
    };

    // Show wax seal animation
    setWaxActive(true);
    playThudSound();

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(response),
      });

      const data = await res.json();
      
      if (res.ok && (data.success || data.warning)) {
        // Save to localStorage as backup
        const rsvpList = JSON.parse(localStorage.getItem('wedding_rsvp') || '[]');
        rsvpList.push(response);
        localStorage.setItem('wedding_rsvp', JSON.stringify(rsvpList));

        setTimeout(() => {
          setWaxText('Approved');
          setIsSubmitting(false);
        }, 1500);
      } else {
        throw new Error(data.error || 'Failed to submit RSVP');
      }
    } catch (err: any) {
      console.error('RSVP submission error:', err);
      setTimeout(() => {
        setWaxActive(false);
        setIsSubmitting(false);
        alert(`RSVP submission failed: ${err.message || 'Error occurred'}. Please try again.`);
      }, 1500);
    }
  };

  const resetWax = () => {
    if (waxActive) {
      setWaxActive(false);
      setName('');
      setAttendance('attending');
      setGuestCount('1');
      setNotes('');
      setWaxText('S & A');
    }
  };

  // Sound synthesizer for the wax seal physical thud
  const playThudSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.3);

      gainNode.gain.setValueAtTime(0.6, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch (e) {
      console.warn('Audio Context thud synth not supported or blocked by browser.');
    }
  };

  return (
    <div className="rsvp-card">
      {/* Red Wax Seal Success Overlay */}
      <div 
        className={`wax-seal-success ${waxActive ? 'active' : ''}`} 
        onClick={resetWax}
        id="wax-seal"
      >
        <span style={{ display: 'block', textAlign: 'center', lineHeight: 1.2 }}>
          {waxText === 'Approved' ? (
            <>
              Approved<br />
              <span style={{ fontSize: '12px', fontWeight: 'normal', letterSpacing: '0.15em' }}>
                Thank You
              </span>
            </>
          ) : (
            'S & A'
          )}
        </span>
      </div>

      <form onSubmit={handleSubmit} id="rsvp-form">
        <div className="rsvp-form-group">
          <label htmlFor="guest-name" className="rsvp-label" style={{ display: 'block' }}>Your Name</label>
          <input 
            type="text" 
            id="guest-name" 
            className="rsvp-input" 
            placeholder="Enter your full name" 
            value={name}
            onChange={e => setName(e.target.value)}
            required 
          />
        </div>

        <div className="rsvp-form-group">
          <label className="rsvp-label">Will you attend?</label>
          <div className="rsvp-radio-group">
            <label className="rsvp-radio-label">
              <input 
                type="radio" 
                name="attendance" 
                value="attending" 
                checked={attendance === 'attending'}
                onChange={() => setAttendance('attending')}
                required 
              />
              Joyfully Accept
            </label>
            <label className="rsvp-radio-label">
              <input 
                type="radio" 
                name="attendance" 
                value="declining" 
                checked={attendance === 'declining'}
                onChange={() => setAttendance('declining')}
              />
              Regretfully Decline
            </label>
          </div>
        </div>

        <div 
          className="rsvp-form-group" 
          id="guest-count-wrapper"
          style={{
            opacity: attendance === 'declining' ? 0.3 : 1,
            pointerEvents: attendance === 'declining' ? 'none' : 'auto',
            transition: 'var(--transition-fast)'
          }}
        >
          <label htmlFor="guest-count" className="rsvp-label" style={{ display: 'block' }}>Number of Guests</label>
          <input 
            type="number" 
            id="guest-count" 
            className="rsvp-input" 
            min="1" 
            max="10" 
            value={attendance === 'declining' ? '0' : guestCount}
            onChange={e => setGuestCount(e.target.value)}
            required={attendance !== 'declining'}
          />
        </div>

        <div className="rsvp-form-group">
          <label htmlFor="guest-notes" className="rsvp-label" style={{ display: 'block' }}>Wishes or Dietary Notes</label>
          <textarea 
            id="guest-notes" 
            className="rsvp-input" 
            style={{ minHeight: '80px', resize: 'vertical' }} 
            placeholder="Optional message or note"
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
        </div>

        <button type="submit" className="rsvp-submit-btn" id="rsvp-submit-btn" disabled={isSubmitting}>
          <span>{isSubmitting ? 'Sending...' : 'Send Response'}</span>
          <svg style={{ width: '14px', height: '14px', fill: 'currentColor' }} viewBox="0 0 24 24">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </form>
    </div>
  );
}
