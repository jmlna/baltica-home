/**
 * Baltica Home - Main Application Entry Point
 */

import './styles/main.css';
import { trackCtaClick, trackCookieConsentAccepted, trackOutboundLink } from './scripts/analytics.js';
import { initAccordion } from './scripts/accordion.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Module Engines
  initAccordion();

  // 2. Sticky Header Scroll Effect (flat, border-based)
  const header = document.getElementById('main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('bg-surface', 'border-b', 'border-soft');
        header.classList.remove('bg-transparent');
      } else {
        header.classList.remove('bg-surface', 'border-b', 'border-soft');
        header.classList.add('bg-transparent');
      }
    });
  }

  // 3. CTA Click Tracking
  document.querySelectorAll('[data-cta-location]').forEach((cta) => {
    cta.addEventListener('click', (e) => {
      const location = cta.getAttribute('data-cta-location') || 'unknown';
      const text = cta.textContent?.trim() || 'CTA';
      const target = cta.getAttribute('href') || cta.getAttribute('data-cta-target') || '#';
      trackCtaClick(location, text, target);
    });
  });

  // 3b. Outbound link tracking (social / external links)
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    link.addEventListener('click', () => {
      const target = link.getAttribute('href') || '#';
      trackOutboundLink(target);
    });
  });

  // 4. Cookie Consent Banner (session state)
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAcceptBtn = document.getElementById('cookie-accept');
  const cookieSettingsBtn = document.getElementById('cookie-settings');

  function showCookieBanner() {
    if (!cookieBanner) return;
    const consent = sessionStorage.getItem('balticaCookieConsent');
    if (consent !== 'accepted') {
      cookieBanner.classList.remove('hidden');
    }
  }

  function acceptCookies() {
    if (!cookieBanner) return;
    sessionStorage.setItem('balticaCookieConsent', 'accepted');
    cookieBanner.classList.add('hidden');
    trackCookieConsentAccepted();
  }

  if (cookieAcceptBtn) {
    cookieAcceptBtn.addEventListener('click', acceptCookies);
  }

  // "Ustawienia" — acts as a lightweight mock: marks as accepted & closes
  if (cookieSettingsBtn) {
    cookieSettingsBtn.addEventListener('click', () => {
      sessionStorage.setItem('balticaCookieConsent', 'accepted');
      if (cookieBanner) {
        cookieBanner.classList.add('hidden');
      }
    });
  }

  // Initialize: show cookie banner
  showCookieBanner();
});