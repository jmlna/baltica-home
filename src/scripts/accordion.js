/**
 * Baltica Feline Selection - Accessible WAI-ARIA FAQ Accordion Engine
 */

import { trackFaqToggle } from './analytics.js';

export function initAccordion() {
  const accordionItems = document.querySelectorAll('[data-accordion-item]');

  if (!accordionItems.length) return;

  accordionItems.forEach((item) => {
    const trigger = item.querySelector('[data-accordion-trigger]');
    const content = item.querySelector('[data-accordion-content]');
    const icon = item.querySelector('[data-accordion-icon]');

    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const questionTitle = trigger.querySelector('.faq-question-text')?.textContent?.trim() || 'FAQ Question';

      // Toggle current
      if (isExpanded) {
        // Close
        trigger.setAttribute('aria-expanded', 'false');
        content.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
        item.classList.remove('border-salmon', 'bg-salmon-light');
        item.classList.add('border-soft', 'bg-surface');
        trackFaqToggle(questionTitle, 'closed');
      } else {
        // Open
        trigger.setAttribute('aria-expanded', 'true');
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
        item.classList.remove('border-soft', 'bg-surface');
        item.classList.add('border-salmon', 'bg-salmon-light');
        trackFaqToggle(questionTitle, 'open');
      }
    });

    // Keyboard navigation (Enter / Space already trigger button click natively; add ARIA Arrow keys)
    trigger.addEventListener('keydown', (e) => {
      const items = Array.from(document.querySelectorAll('[data-accordion-trigger]'));
      const currentIndex = items.indexOf(trigger);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = items[(currentIndex + 1) % items.length];
        next?.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = items[(currentIndex - 1 + items.length) % items.length];
        prev?.focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        items[0]?.focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1]?.focus();
      }
    });
  });
}
