'use client';

import React, { useEffect, useState } from 'react';
import FallingPetals from '@/components/FallingPetals';
import Countdown from '@/components/Countdown';
import Gallery from '@/components/Gallery';
import RsvpForm from '@/components/RsvpForm';
import ScratchHearts from '@/components/ScratchHearts';
import CurtainReveal from '@/components/CurtainReveal';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Is there a parking space available at the wedding venue?',
    answer: 'Yes, Hotel Travancore Regency has extensive complimentary valet and self-parking spaces inside the compound for all wedding guests.'
  },
  {
    question: 'Can I RSVP online, or should I call directly?',
    answer: 'We highly encourage you to use the online RSVP form above! Once you press submit, the page stamps a wax seal of approval, and your response is successfully registered. You may also contact our wedding coordinators.'
  },
  {
    question: 'What type of food will be served?',
    answer: 'A traditional, grand Kerala Sadhya (vegetarian feast served on banana leaves) will be served following the wedding ceremony. For the evening reception, a premium multi-cuisine buffet dinner (both vegetarian and non-vegetarian) will be available.'
  }
];

export default function Home() {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(null);
  const [curtainRevealed, setCurtainRevealed] = useState(false);

  // Listen for the curtain parting event to trigger interior transition fades
  useEffect(() => {
    const handleCurtainStart = () => {
      setCurtainRevealed(true);
    };
    window.addEventListener('curtain-reveal-start', handleCurtainStart);
    return () => {
      window.removeEventListener('curtain-reveal-start', handleCurtainStart);
    };
  }, []);

  // Viewport Reveal Animation Observer
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal, .reveal-scale');

    const revealCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  const toggleFaq = (index: number) => {
    setActiveFaqIndex(prev => (prev === index ? null : index));
  };

  return (
    <>
      <CurtainReveal />
      <FallingPetals />
      {/* White cinematic reveal overlay transition screen */}
      <div className={`white-reveal-screen ${curtainRevealed ? 'fade-active' : ''}`} />

      {/* Grain overlay for tactile paper texture */}
      <div className="grain-overlay" />

      {/* ==========================================================================
           HERO SECTION
           ========================================================================== */}
      <header className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-vignette" />
        <div className="hero-sunray" />

        <div className={`hero-card ${curtainRevealed ? 'active-reveal' : ''}`}>
          <div className="gold-corners">
            <div className="gold-corners-inner" />
          </div>

          {/* Swaying Temple Bell */}
          <div className="temple-bell-container">
            <svg className="temple-bell" viewBox="0 0 24 24">
              <path d="M12 2C10.3 2 9 3.3 9 5v1.2C6.7 6.8 5 9 5 11.5V17c0 .6-.4 1-1 1v1h16v-1c-.6 0-1-.4-1-1v-5.5c0-2.5-1.7-4.7-4-5.3V5c0-1.7-1.3-3-3-3zm0 18c-1.1 0-2 .9-2 2h4c0-1.1-.9-2-2-2z" />
            </svg>
          </div>

          <p className="hero-subtitle">MANGALYAM TANTUNANENA</p>

          <h1 className="hero-names">
            Sruthy
            <span>and</span>
            Adarsh
          </h1>

          <div className="ornamental-divider">
            <span />
            <svg viewBox="0 0 24 24">
              <path d="M12 2L9 9H2l6 4-3 7 7-4 7 4-3-7 6-4h-7z" />
            </svg>
            <span />
          </div>

          <p className="hero-date">August 30, 2026</p>
          <p className="hero-location">Mavelikkara • Kerala</p>

          <a href="#countdown" className="hero-cta">View Details</a>
        </div>

        <div className={`scroll-indicator ${curtainRevealed ? 'active-reveal' : ''}`}>
          <span>Scroll Down</span>
          <div className="scroll-arrow" />
        </div>
      </header>

      {/* ==========================================================================
           SAVE THE DATE & COUNTDOWN
           ========================================================================== */}
      <section className="countdown-section section-padding text-center" id="countdown">
        <div className="container">
          <div className="editorial-header text-center">
            <span className="section-tag reveal">Save The Date</span>
            <h2 className="section-title reveal delay-200">The Celebration of Union</h2>
            <div className="decor-line reveal delay-300" />
            <p className="editorial-para reveal delay-400">
              “Two souls with a single thought, two hearts that beat as one.”
            </p>
            <p className="reveal delay-500" style={{ marginTop: '15px', fontSize: '14px', opacity: 0.85 }}>
              We are preparing to embark on a beautiful lifelong journey together. Join us as we celebrate our love and commitment amidst the serene landscapes of Kerala.
            </p>
          </div>

          {/* Scratch Hearts to reveal the Date */}
          <div className="reveal delay-600">
            <ScratchHearts />
          </div>

          <div className="reveal delay-600" style={{ marginTop: '40px' }}>
            <Countdown />
          </div>
        </div>
      </section>

      {/* ==========================================================================
           BRIDE & GROOM PROFILE
           ========================================================================== */}
      <section className="couple-section section-padding" id="couple">
        <div className="container">
          <div className="editorial-header text-center">
            <span className="section-tag reveal">The Couple</span>
            <h2 className="section-title reveal delay-200">Sruthy & Adarsh</h2>
            <div className="decor-line reveal delay-300" />
          </div>

          <div className="couple-grid">
            <div className="couple-ampersand">&</div>

            {/* Bride Card */}
            <div className="profile-card reveal delay-100">
              <div className="profile-img-wrap">
                <img src="/assets/photos/photo3.jpg" alt="Sruthy — The Bride" />
              </div>
              <span className="profile-title">The Bride</span>
              <h3 className="profile-name">Sruthy</h3>
              <p className="profile-bio">
                An elegant, gentle, and warm soul. Inspired by classical art and the quiet beauty of southern Kerala, Sruthy brings joy and harmony to everyone she encounters.
              </p>
            </div>

            {/* Groom Card */}
            <div className="profile-card reveal delay-300">
              <div className="profile-img-wrap">
                <img src="/assets/photos/photo4.jpg" alt="Adarsh — The Groom" />
              </div>
              <span className="profile-title">The Groom</span>
              <h3 className="profile-name">Adarsh</h3>
              <p className="profile-bio">
                A man of depth, kindness, and fine intellect. Grounded in traditional values but modern in outlook, Adarsh is a warm nature-loving companion ready to build a bright future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           OUR STORY TIMELINE
           ========================================================================== */}
      <section className="story-section section-padding" id="story">
        <div className="container">
          <div className="editorial-header text-center">
            <span className="section-tag reveal">Our Journey</span>
            <h2 className="section-title reveal delay-200">How It All Began</h2>
            <div className="decor-line reveal delay-300" />
            <p className="editorial-para reveal delay-400">A story crafted in heaven, nurtured on earth.</p>
          </div>

          <div className="timeline">
            {/* Timeline Item 1 */}
            <div className="timeline-item reveal">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <img src="/assets/photos/photo1.jpg" alt="First Meeting" className="timeline-photo" />
                <div className="timeline-date">October 12, 2024</div>
                <h3 className="timeline-title">The First Glimpse</h3>
                <p className="timeline-desc">
                  Introduced through families, we first met in a quiet cafe under a warm afternoon sun. What was supposed to be a brief conversation stretched into hours of sharing stories, laughter, and an unspoken realization of shared wavelengths.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="timeline-item reveal delay-200">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-date">February 14, 2025</div>
                <h3 className="timeline-title">Growing Together</h3>
                <p className="timeline-desc">
                  Over phone calls that spanned midnight hours and weekend drives amidst the misty hills, we realized how effortlessly we completed each other. We fell in love with each other’s simple habits, silences, and dreams.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="timeline-item reveal">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <img src="/assets/photos/photo5.jpg" alt="The Proposal" className="timeline-photo" />
                <div className="timeline-date">October 30, 2025</div>
                <h3 className="timeline-title">The Sacred Promise</h3>
                <p className="timeline-desc">
                  Under a canopy of palm trees alongside the serene Kerala backwaters, Adarsh asked Sruthy to be his lifetime companion. With tears of joy and a soft nod, we sealed a promise to walk hand-in-hand forever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           EVENTS TIMELINE
           ========================================================================== */}
      <section className="events-section section-padding" id="events">
        <div className="container">
          <div className="editorial-header text-center">
            <span className="section-tag reveal">The Gatherings</span>
            <h2 className="section-title reveal delay-200">Wedding Ceremonies</h2>
            <div className="decor-line reveal delay-300" />
            <p className="editorial-para reveal delay-400">Please join us on these auspicious occasions</p>
          </div>

          <div className="events-grid">
            {/* Wedding Card */}
            <div className="event-card reveal delay-100">
              <svg className="event-icon" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-3-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm6 0c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
              </svg>
              <h3 className="event-title">The Wedding</h3>

              <div className="event-details">
                <div className="event-detail-item">
                  <span className="event-detail-label">Date</span>
                  <span className="event-detail-value">Sunday, August 30, 2026</span>
                </div>
                <div className="event-detail-item">
                  <span className="event-detail-label">Time</span>
                  <span className="event-detail-value">Ceremony: 9:30 AM – 12:30 PM</span>
                </div>
                <div className="event-detail-item">
                  <span className="event-detail-label">Venue</span>
                  <span className="event-detail-value">Hotel Travancore Regency, Mavelikkara</span>
                </div>
              </div>

              <a href="https://maps.app.goo.gl/nK6QkqaKXDN2Ppz4A" target="_blank" rel="noopener noreferrer" className="event-btn">
                Get Directions
              </a>
            </div>

            {/* Reception Card */}
            <div className="event-card reveal delay-300">
              <svg className="event-icon" viewBox="0 0 24 24">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
              </svg>
              <h3 className="event-title">The Reception</h3>

              <div className="event-details">
                <div className="event-detail-item">
                  <span className="event-detail-label">Date</span>
                  <span className="event-detail-value">Sunday, August 30, 2026</span>
                </div>
                <div className="event-detail-item">
                  <span className="event-detail-label">Time</span>
                  <span className="event-detail-value">From 4:00 PM Onwards</span>
                </div>
                <div className="event-detail-item">
                  <span className="event-detail-label">Venue</span>
                  <span className="event-detail-value">Adarsh Nivas, Pattiyam, Pookode</span>
                </div>
              </div>

              <a href="https://maps.app.goo.gl/zDFr87VavDdKFQXj6?g_st=ac" target="_blank" rel="noopener noreferrer" className="event-btn">
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           VENUE & TRAVEL SECTION
           ========================================================================== */}
      <section className="venue-section section-padding" id="venue">
        <div className="container">
          <div className="editorial-header text-center">
            <span className="section-tag reveal">Locate Us</span>
            <h2 className="section-title reveal delay-200">Venue & Directions</h2>
            <div className="decor-line reveal delay-300" />
          </div>

          <div className="venue-layout">
            <div className="venue-info reveal">
              <h3 className="venue-card-title">Hotel Travancore Regency</h3>
              <p className="venue-address">
                Mitchel Junction, Mavelikkara, Kerala 690101.<br />
                A premium heritage venue combining classic luxury with traditional Kerala hospitality.
              </p>

              <div className="venue-guide">
                <div className="venue-guide-item">
                  <svg className="venue-guide-icon" viewBox="0 0 24 24">
                    <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-4-4-8-4zM7.5 17c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm8.5-1.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5zm2-6.5H6V6h12v3z" />
                  </svg>
                  <div className="venue-guide-text">
                    <h4>By Train</h4>
                    <p>Mavelikkara Railway Station is just 1.5 km away from the hotel.</p>
                  </div>
                </div>

                <div className="venue-guide-item">
                  <svg className="venue-guide-icon" viewBox="0 0 24 24">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5l7 2.5z" />
                  </svg>
                  <div className="venue-guide-text">
                    <h4>By Flight</h4>
                    <p>Trivandrum International Airport (TRV) is approx. 120 km away. Cochin Airport (COK) is approx. 130 km away.</p>
                  </div>
                </div>
              </div>

              <a href="https://maps.app.goo.gl/nK6QkqaKXDN2Ppz4A" target="_blank" rel="noopener noreferrer" className="event-btn text-center">
                Open in Google Maps
              </a>
            </div>

            <div className="map-wrapper reveal delay-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3937.625807955519!2d76.5401918758807!3d9.274291190800366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0622a555555555%3A0xe54d92ee146f8885!2sHotel%20Travancore%20Regency!5e0!3m2!1sen!2sin!4v1719999999999!5m2!1sen!2sin"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           DRESS CODE SECTION
           ========================================================================== */}
      <section className="dresscode-section section-padding" id="dresscode">
        <div className="container">
          <div className="editorial-header text-center">
            <span className="section-tag reveal">Etiquette</span>
            <h2 className="section-title reveal delay-200">Dress Code</h2>
            <div className="decor-line reveal delay-300" />
          </div>

          <div className="dresscode-box reveal">
            <p className="text-center" style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontStyle: 'italic', opacity: 0.9 }}>
              We would be honored to see our family and friends in traditional attire matching the purity and warmth of our wedding.
            </p>

            <div className="dresscode-grid">
              <div className="dresscode-column reveal delay-100">
                <h3 className="dresscode-title">Ladies</h3>
                <span className="dresscode-attire">Kerala Kasavu Saree or Ethnic Wear</span>
                <div className="dresscode-swatch-container">
                  <div className="dresscode-swatch swatch-cream" title="Off-White/Cream" />
                  <div className="dresscode-swatch swatch-gold" title="Gold Border" />
                </div>
                <p className="dresscode-desc">
                  Elegant traditional Kerala Kasavu sarees, handloom silks, or classic ethnic ensembles in tones of cream, off-white, and antique gold.
                </p>
              </div>

              <div className="dresscode-column reveal delay-300">
                <h3 className="dresscode-title">Gentlemen</h3>
                <span className="dresscode-attire">Kerala Mundu & Shirt or Kurta</span>
                <div className="dresscode-swatch-container">
                  <div className="dresscode-swatch swatch-white" title="White/Cream Shirt" />
                  <div className="dresscode-swatch swatch-gold" title="Gold Border Mundu" />
                </div>
                <p className="dresscode-desc">
                  Classic Kerala double-mundu with gold borders paired with silk or handloom cream/white shirts, or traditional kurtas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           ACCOMMODATION SECTION
           ========================================================================== */}
      <section className="accommodation-section section-padding" id="accommodation">
        <div className="container">
          <div className="editorial-header text-center">
            <span className="section-tag reveal">For Guests</span>
            <h2 className="section-title reveal delay-200">Stay & Accommodation</h2>
            <div className="decor-line reveal delay-300" />
            <p className="editorial-para reveal delay-400">Comfortable accommodation options near the venue</p>
          </div>

          <div className="accommodation-grid">
            <div className="accommodation-card reveal">
              <svg className="accommodation-icon" viewBox="0 0 24 24">
                <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
              </svg>
              <h3 className="accommodation-name">Travancore Regency</h3>
              <span className="accommodation-distance">At the Venue</span>
              <p className="accommodation-desc">
                Premium rooms are available directly at the wedding venue. Please contact the wedding coordinators to block your stay.
              </p>
              <span className="accommodation-phone">Contact: +91 479 230 4001</span>
            </div>

            <div className="accommodation-card reveal delay-200">
              <svg className="accommodation-icon" viewBox="0 0 24 24">
                <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
              </svg>
              <h3 className="accommodation-name">Regency Plaza</h3>
              <span className="accommodation-distance">1.5 km from Venue</span>
              <p className="accommodation-desc">
                Comfortable budget and semi-luxury rooms located close to Mavelikkara Railway Station. Ideal for short stays.
              </p>
              <span className="accommodation-phone">Contact: +91 479 230 4220</span>
            </div>

            <div className="accommodation-card reveal delay-400">
              <svg className="accommodation-icon" viewBox="0 0 24 24">
                <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
              </svg>
              <h3 className="accommodation-name">KTDC Tamarind</h3>
              <span className="accommodation-distance">2.0 km from Venue</span>
              <p className="accommodation-desc">
                Government-run heritage tourism rooms offering peaceful green surroundings, clean rooms, and traditional dining facilities.
              </p>
              <span className="accommodation-phone">Contact: +91 479 234 1856</span>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           GALLERY SECTION
           ========================================================================== */}
      <section className="gallery-section section-padding" id="gallery">
        <div className="container">
          <div className="editorial-header text-center">
            <span className="section-tag reveal">Moments</span>
            <h2 className="section-title reveal delay-200">Our Gallery</h2>
            <div className="decor-line reveal delay-300" />
            <p className="editorial-para reveal delay-400">Capturing pure smiles and shared memories</p>
          </div>

          <Gallery />
        </div>
      </section>

      {/* ==========================================================================
           FAMILY SECTION
           ========================================================================== */}
      <section className="family-section section-padding" id="family">
        <div className="container">
          <div className="editorial-header text-center">
            <span className="section-tag reveal">The Pillars</span>
            <h2 className="section-title reveal delay-200">The Families</h2>
            <div className="decor-line reveal delay-300" />
          </div>

          <div className="family-grid">
            {/* Bride's Family */}
            <div className="family-column reveal">
              <h3 className="family-title">Bride's Family</h3>
              <ul className="family-list">
                <li className="family-member">
                  <span className="member-name">Mr. Radhakrishnan</span>
                  <span className="member-relation">Father</span>
                </li>
                <li className="family-member">
                  <span className="member-name">Mrs. Bindu Radhakrishnan</span>
                  <span className="member-relation">Mother</span>
                </li>
                <li className="family-member">
                  <span className="member-name">Sidharth Radhakrishnan</span>
                  <span className="member-relation">Brother</span>
                </li>
              </ul>
            </div>

            {/* Groom's Family */}
            <div className="family-column reveal delay-200">
              <h3 className="family-title">Groom's Family</h3>
              <ul className="family-list">
                <li className="family-member">
                  <span className="member-name">Mr. Mohanan</span>
                  <span className="member-relation">Father</span>
                </li>
                <li className="family-member">
                  <span className="member-name">Mrs. Geetha Mohanan</span>
                  <span className="member-relation">Mother</span>
                </li>
                <li className="family-member">
                  <span className="member-name">Arjun Mohanan</span>
                  <span className="member-relation">Brother</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           RSVP SECTION
           ========================================================================== */}
      <section className="rsvp-section section-padding" id="rsvp">
        <div className="container">
          <div className="editorial-header text-center">
            <span className="section-tag reveal">Response Required</span>
            <h2 className="section-title reveal delay-200">RSVP</h2>
            <div className="decor-line reveal delay-300" />
            <p className="editorial-para reveal delay-400">Kindly respond by August 15, 2026 to help us make arrangements.</p>
          </div>

          <div className="rsvp-wrapper reveal">
            <RsvpForm />
          </div>
        </div>
      </section>

      {/* ==========================================================================
           FAQ SECTION
           ========================================================================== */}
      <section className="faq-section section-padding" id="faq">
        <div className="container">
          <div className="editorial-header text-center">
            <span className="section-tag reveal">Clarifications</span>
            <h2 className="section-title reveal delay-200">Frequently Asked Questions</h2>
            <div className="decor-line reveal delay-300" />
          </div>

          <div className="faq-wrapper">
            {FAQ_ITEMS.map((item, index) => (
              <div
                key={index}
                className={`faq-item reveal ${activeFaqIndex === index ? 'active' : ''}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <button className="faq-question" onClick={() => toggleFaq(index)}>
                  <span>{item.question}</span>
                  <svg viewBox="0 0 24 24">
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                  </svg>
                </button>
                <div
                  className="faq-answer"
                  style={{
                    maxHeight: activeFaqIndex === index ? '200px' : '0px',
                    transition: 'max-height 0.4s ease-out',
                    overflow: 'hidden'
                  }}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
           FOOTER & THANK YOU
           ========================================================================== */}
      <footer className="footer">

        <div className="container">
          <div className="footer-content reveal">
            <svg className="footer-arch" viewBox="0 0 100 100">
              <path d="M50,15 C20,15 15,45 15,90 L85,90 C85,45 80,15 50,15 Z" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M50,22 C26,22 22,48 22,90 L78,90 C78,48 74,22 50,22 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" />
              <path d="M50,5 L50,15" stroke="currentColor" strokeWidth="2" />
              <circle cx="50" cy="5" r="3" fill="currentColor" />
            </svg>

            <h2 className="footer-message">Thank You</h2>
            <p className="footer-sub">For being a beautiful part of our lives and story.</p>

            <span className="footer-copyright">
              Sruthy & Adarsh • 2026
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
