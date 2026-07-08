// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close menu on link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 80) {
    navbar.style.boxShadow = '0 2px 30px rgba(0,0,0,0.12)';
  } else {
    navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  }
  lastScroll = currentScroll;
});

// Smooth scroll offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

if (lightbox) {
  const galleryItems = document.querySelectorAll('.gallery-item');
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    const item = galleryItems[index];
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-caption').textContent;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    currentIndex += direction;
    if (currentIndex < 0) currentIndex = galleryItems.length - 1;
    if (currentIndex >= galleryItems.length) currentIndex = 0;
    openLightbox(currentIndex);
  }

  // Click on gallery items
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  // Close button
  lightboxClose.addEventListener('click', closeLightbox);

  // Click outside image
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Navigation buttons
  lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(-1);
  });

  lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(1);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1000);
  }
});

// ===== SCROLL TO TOP =====
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== PROFILE VIDEO TOGGLE WITH BLOOM =====
const profileContainer = document.getElementById('profileContainer');
const profileVideo = document.getElementById('profileVideo');
const profileImage = document.getElementById('profileImage');
const playIndicator = document.getElementById('playIndicator');

if (profileContainer && profileVideo) {
  let isAnimating = false;

  profileContainer.addEventListener('click', () => {
    if (isAnimating) return;

    const isVideoActive = profileContainer.classList.contains('video-active');
    
    if (isVideoActive) {
      // Stop video, show image
      isAnimating = true;
      profileContainer.classList.add('bloom-reverse');
      profileContainer.classList.remove('video-active');
      profileContainer.classList.remove('blooming');
      
      setTimeout(() => {
        profileVideo.pause();
        profileVideo.currentTime = 0;
        profileContainer.classList.remove('bloom-reverse');
        isAnimating = false;
      }, 600);
    } else {
      // Bloom animation then play video
      isAnimating = true;
      profileContainer.classList.add('blooming');
      
      // After bloom animation, show video
      setTimeout(() => {
        profileVideo.play();
        profileContainer.classList.add('video-active');
        isAnimating = false;
      }, 800);
    }
  });

  // Pause video when it ends
  profileVideo.addEventListener('ended', () => {
    profileContainer.classList.remove('video-active');
    profileContainer.classList.remove('blooming');
  });
}
