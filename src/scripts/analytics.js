/* Baltica Home - GTM dataLayer Engine & Console Logger
 */

// Initialize global dataLayer
window.dataLayer = window.dataLayer || [];

/**
 * Enhanced console logger with branded badge styling
 */
function logToConsole(eventName, payload) {
  const badgeStyle = 'background: #8A9A86; color: #FFFFFF; font-weight: bold; padding: 3px 8px; border-radius: 4px;';
  const eventStyle = 'color: #2C3E50; font-weight: bold;';
  const timestamp = new Date().toLocaleTimeString();

  console.groupCollapsed(`%c[Baltica Home Analytics]%c ${eventName} @ ${timestamp}`, badgeStyle, eventStyle);
  console.log('Event Name:', eventName);
  console.log('Payload:', payload);
  console.log('Current dataLayer length:', window.dataLayer.length);
  console.groupEnd();
}

/**
 * Dispatch event to GTM dataLayer and log to console
 */
export function trackEvent(eventName, payload = {}) {
  const eventObject = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...payload,
  };

  // Push to GTM dataLayer
  window.dataLayer.push(eventObject);

  // Console logging
  logToConsole(eventName, payload);
}

/**
 * Specific Event Dispatchers
 */
export function trackCtaClick(location, text, target) {
  trackEvent('cta_click', {
    cta_label: text,
    cta_location: location,
    cta_text: text,
    cta_target: target,
  });
}

export function trackCookieConsentAccepted() {
  trackEvent('cookie_consent_accepted', {
    consent_level: 'all',
  });
}

/**
 * Track outbound link clicks (social / external links)
 */
export function trackOutboundLink(target) {
  trackEvent('outbound_link_click', {
    link_target: target,
  });
}

export function trackFaqToggle(questionTitle, state) {
  trackEvent('faq_toggle', {
    question_title: questionTitle,
    state: state, // 'open' | 'closed'
  });
}