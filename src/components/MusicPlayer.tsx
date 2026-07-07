'use client';

import React, { useRef, useState, useEffect } from 'react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [statusText, setStatusText] = useState('Play Invitation Music');
  const fallbackUrl = 'https://assets.mixkit.co/music/preview/mixkit-zen-meditation-flute-338.mp3';

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlayEvent = () => {
      setIsPlaying(true);
      setStatusText('Playing Music');
    };

    const handlePauseEvent = () => {
      setIsPlaying(false);
      setStatusText('Music Paused');
    };

    const handleError = () => {
      console.warn('Local invitation audio failed to load. Falling back to mixkit server...');
      audio.src = fallbackUrl;
      audio.load();
    };

    audio.addEventListener('play', handlePlayEvent);
    audio.addEventListener('pause', handlePauseEvent);
    audio.addEventListener('error', handleError);

    const handleAutoplayCommand = () => {
      try {
        const playPromise = audio.play();
        if (playPromise !== undefined && typeof playPromise.catch === 'function') {
          playPromise.catch(err => {
            console.warn('Autoplay command failed: ', err);
            fallbackPlay();
          });
        }
      } catch (err) {
        fallbackPlay();
      }
    };

    const fallbackPlay = () => {
      audio.src = fallbackUrl;
      try {
        const playPromise = audio.play();
        if (playPromise !== undefined && typeof playPromise.catch === 'function') {
          playPromise.catch(err2 => {
            console.error('All play commands failed: ', err2);
            setStatusText('Play Blocked');
          });
        }
      } catch (err2) {
        setStatusText('Play Blocked');
      }
    };

    window.addEventListener('play-wedding-music', handleAutoplayCommand);

    return () => {
      audio.removeEventListener('play', handlePlayEvent);
      audio.removeEventListener('pause', handlePauseEvent);
      audio.removeEventListener('error', handleError);
      window.removeEventListener('play-wedding-music', handleAutoplayCommand);
    };
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      try {
        const playPromise = audio.play();
        if (playPromise !== undefined && typeof playPromise.catch === 'function') {
          playPromise.catch(err => {
            console.error('Audio play blocked: ', err);
            triggerFallbackToggle();
          });
        }
      } catch (err) {
        triggerFallbackToggle();
      }
    }
  };

  const triggerFallbackToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = fallbackUrl;
    try {
      const playPromise = audio.play();
      if (playPromise !== undefined && typeof playPromise.catch === 'function') {
        playPromise.catch(err => {
          console.error('Fallback play failed: ', err);
          setStatusText('Play Blocked');
        });
      }
    } catch (err) {
      setStatusText('Play Blocked');
    }
  };

  return (
    <>
      <audio ref={audioRef} id="bg-music" loop preload="none">
        <source src="/assets/music/invitation-audio.mpeg" type="audio/mpeg" />
      </audio>

      <div className={`audio-player-widget ${isPlaying ? 'audio-playing' : ''}`}>
        <button 
          className="audio-btn" 
          onClick={toggleAudio} 
          aria-label="Toggle Background Music"
        >
          {isPlaying ? (
            <svg id="pause-icon" viewBox="0 0 24 24" style={{ display: 'block' }}>
              <path fill="currentColor" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg id="play-icon" viewBox="0 0 24 24" style={{ display: 'block' }}>
              <path fill="currentColor" d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <span className="audio-status" id="audio-status-text">{statusText}</span>
      </div>
    </>
  );
}
