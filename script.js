/**
 * TravelKu — Indonesian Travel E-Commerce
 * Main application JavaScript
 *
 * All user-facing strings are in Bahasa Indonesia.
 * Uses modern ES6+, event delegation where practical.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ─── 1. Mobile menu toggle ───────────────────────────────────────────
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      nav.classList.toggle('open', !isOpen);
    });

    // Close menu when any nav link is clicked
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a')) {
        menuToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('open');
      }
    });
  }

  // ─── 2. Search tab switching ─────────────────────────────────────────
  const searchTabs = document.querySelector('.search-tabs');

  if (searchTabs) {
    searchTabs.addEventListener('click', (e) => {
      const clickedTab = e.target.closest('.tab-btn');
      if (!clickedTab) return;

      const targetPanel = clickedTab.dataset.tab;

      // Deactivate all tabs and panels
      document.querySelectorAll('.tab-btn').forEach((tab) => tab.classList.remove('active'));
      document.querySelectorAll('.search-panel').forEach((panel) => panel.classList.remove('active'));

      // Activate the clicked tab and its corresponding panel
      clickedTab.classList.add('active');
      const panel = document.querySelector(`.search-panel[data-panel="${targetPanel}"]`);
      if (panel) panel.classList.add('active');
    });
  }

  // ─── 3. Search form handling ─────────────────────────────────────────
  /**
   * Creates and shows a modal overlay with the given message.
   * Returns the modal element so it can be updated or removed.
   */
  function createSearchModal(message) {
    const modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');

    const content = document.createElement('div');
    content.className = 'search-modal-content';

    const text = document.createElement('p');
    text.textContent = message;
    content.appendChild(text);

    modal.appendChild(content);
    document.body.appendChild(modal);

    // Force reflow then add active class for CSS transitions
    requestAnimationFrame(() => modal.classList.add('active'));

    return { modal, text };
  }

  // Use event delegation on search panels
  const searchPanels = document.querySelectorAll('.search-panel');
  searchPanels.forEach((panel) => {
    const form = panel.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate required inputs
      if (!form.reportValidity()) return;

      // Show "Searching..." modal
      const { modal, text } = createSearchModal('Mencari...');

      // After 2 seconds, show mock results
      setTimeout(() => {
        const resultCount = Math.floor(Math.random() * 50) + 5;
        text.textContent = `Ditemukan ${resultCount} hasil untuk pencarian Anda`;

        // Add a close button after results appear
        const closeBtn = document.createElement('button');
        closeBtn.className = 'search-modal-close';
        closeBtn.textContent = 'Tutup';
        closeBtn.addEventListener('click', () => modal.remove());
        modal.querySelector('.search-modal-content').appendChild(closeBtn);
      }, 2000);
    });
  });

  // ─── 4. Contact form handling (consult.html) ─────────────────────────
  const contactForm = document.querySelector('#contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate required fields
      if (!contactForm.reportValidity()) return;

      // Collect form data (for potential future use)
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());

      // Replace form with success message
      const successDiv = document.createElement('div');
      successDiv.className = 'contact-success';
      successDiv.innerHTML = `
        <div class="success-icon" aria-hidden="true">✓</div>
        <h3>Pesan Terkirim!</h3>
        <p>Terima kasih! Pesan Anda telah terkirim. Tim kami akan menghubungi Anda dalam 1x24 jam.</p>
      `;

      contactForm.replaceWith(successDiv);
    });
  }

  // ─── 5. Promo strip auto-scroll ─────────────────────────────────────
  const promoStrip = document.querySelector('.promo-strip');

  if (promoStrip) {
    let promoInterval = null;
    const scrollSpeed = 2; // pixels per tick

    const startAutoScroll = () => {
      promoInterval = setInterval(() => {
        promoStrip.scrollLeft += scrollSpeed;

        // Reset to start when reaching the end
        if (promoStrip.scrollLeft >= promoStrip.scrollWidth - promoStrip.clientWidth) {
          promoStrip.scrollLeft = 0;
        }
      }, 30); // ~33fps smooth scrolling
    };

    // Start scrolling
    startAutoScroll();

    // Pause on hover
    promoStrip.addEventListener('mouseenter', () => {
      if (promoInterval) {
        clearInterval(promoInterval);
        promoInterval = null;
      }
    });

    // Resume on mouse leave
    promoStrip.addEventListener('mouseleave', () => {
      startAutoScroll();
    });
  }

  // ─── 6. Destination card interaction ─────────────────────────────────
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.destination-card');
    if (!card) return;

    // Get destination name from card heading or text content
    const heading = card.querySelector('h3') || card.querySelector('h4') || card.querySelector('.destination-name');
    const name = heading ? heading.textContent.trim() : 'destinasi ini';

    alert(`Menjelajahi ${name}... Fitur ini akan segera hadir!`);
  });

  // ─── 7. Year in footer ──────────────────────────────────────────────
  const yearEl = document.querySelector('#year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ─── 8. Smooth scroll for anchor links ──────────────────────────────
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const targetId = anchor.getAttribute('href');
    if (targetId === '#') return;

    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // ─── 9. Scroll-based header shadow ──────────────────────────────────
  const siteHeader = document.querySelector('.site-header');

  if (siteHeader) {
    const handleScroll = () => {
      siteHeader.classList.toggle('scrolled', window.scrollY > 50);
    };

    // Check on load in case page is already scrolled
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // ─── 10. Login / Register button handlers ───────────────────────────
  document.addEventListener('click', (e) => {
    const loginBtn = e.target.closest('.btn-login');
    const registerBtn = e.target.closest('.btn-register');

    if (loginBtn || registerBtn) {
      e.preventDefault();

      const { modal, text } = createSearchModal('Fitur masuk/daftar akan segera hadir!');

      // Auto-close after 3 seconds, or let user click to dismiss
      const closeBtn = document.createElement('button');
      closeBtn.className = 'search-modal-close';
      closeBtn.textContent = 'Tutup';
      closeBtn.addEventListener('click', () => modal.remove());
      modal.querySelector('.search-modal-content').appendChild(closeBtn);

      setTimeout(() => {
        if (document.body.contains(modal)) modal.remove();
      }, 3000);
    }
  });

  // ─── 11. Mobile User-Agent check for promotional ad banner ──────────
  const jackpotBannerSection = document.querySelector('.jackpot-ad-section');

  if (jackpotBannerSection) {
    const isMobileUserAgent = () => {
      if (navigator.userAgentData && typeof navigator.userAgentData.mobile === 'boolean') {
        return navigator.userAgentData.mobile;
      }
      const ua = navigator.userAgent || navigator.vendor || window.opera || '';
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|Tablet/i.test(ua);
    };

    if (isMobileUserAgent()) {
      jackpotBannerSection.hidden = false;
      jackpotBannerSection.classList.add('is-mobile-agent');
    } else {
      jackpotBannerSection.hidden = true;
      jackpotBannerSection.classList.remove('is-mobile-agent');
    }
  }
});
