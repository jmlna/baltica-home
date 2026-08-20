/**
 * Baltica Home - Mobile Flavors Carousel
 *
 * Scroll-snap driven horizontal carousel for mobile viewports (< 768px).
 * On desktop (md+), the layout falls back to a CSS grid and this script
 * is a no-op.
 */

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('flavor-carousel');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotsContainer = document.getElementById('carousel-dots');

  // Bail out if any required element is missing
  if (!carousel || !prevBtn || !nextBtn || !dotsContainer) return;

  // Only activate on mobile (below md breakpoint = 768px)
  const isDesktop = () => window.matchMedia('(min-width: 768px)').matches;
  if (isDesktop()) return;

  const cards = Array.from(carousel.querySelectorAll('article'));
  if (cards.length === 0) return;

  const dots = Array.from(dotsContainer.querySelectorAll('.dot'));
  if (dots.length === 0) return;

  let currentIndex = 0;

  /**
   * Scroll the carousel to show the card at the given index.
   * Uses scrollLeft with smooth behavior for a polished feel.
   */
  function scrollToCard(index) {
    const card = cards[index];
    if (!card) return;
    const cardLeft = card.offsetLeft;
    const scrollAmount = cardLeft - carousel.offsetLeft;
    carousel.scrollTo({
      left: scrollAmount,
      behavior: 'smooth',
    });
  }

  /**
   * Update the active dot based on the current scroll position.
   */
  function updateActiveDot() {
    const scrollLeft = carousel.scrollLeft;
    const threshold = carousel.offsetWidth / 3;

    let newIndex = 0;
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardLeft = card.offsetLeft;
      if (cardLeft <= scrollLeft + threshold) {
        newIndex = i;
      }
    }

    if (newIndex !== currentIndex) {
      currentIndex = newIndex;
      refreshDots();
    }
  }

  /**
   * Refresh dot active states.
   */
  function refreshDots() {
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add('bg-sage', 'opacity-100');
        dot.classList.remove('bg-sage-light/50', 'opacity-50');
      } else {
        dot.classList.add('bg-sage-light/50', 'opacity-50');
        dot.classList.remove('bg-sage', 'opacity-100');
      }
    });
  }

  /**
   * Navigate to the previous card (with wrap-around).
   */
  function goToPrev() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    scrollToCard(currentIndex);
    refreshDots();
  }

  /**
   * Navigate to the next card (with wrap-around).
   */
  function goToNext() {
    currentIndex = (currentIndex + 1) % cards.length;
    scrollToCard(currentIndex);
    refreshDots();
  }

  // --- Event Listeners ---

  if (prevBtn) {
    prevBtn.addEventListener('click', goToPrev);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', goToNext);
  }

  // Dot click navigation
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentIndex = i;
      scrollToCard(i);
      refreshDots();
    });
  });

  // Update active dot on scroll
  let scrollTimeout;
  carousel.addEventListener('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateActiveDot, 100);
  });

  // Re-check on resize — if we cross into desktop, do nothing (grid takes over)
  window.addEventListener('resize', () => {
    if (isDesktop()) {
      // Clean up: remove any inline scroll positions
      carousel.style.overflowX = '';
    }
  });

  // Initialize
  refreshDots();
});
