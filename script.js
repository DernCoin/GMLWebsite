const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close main navigation' : 'Open main navigation');
  });
}

const slider = document.querySelector('[data-slider]');

if (slider) {
  const slides = Array.from(slider.querySelectorAll('[data-slide]'));
  const dots = Array.from(slider.querySelectorAll('[data-dot]'));
  const prevButton = slider.querySelector('[data-prev]');
  const nextButton = slider.querySelector('[data-next]');

  let currentIndex = 0;

  const showSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === currentIndex);
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('is-active', dotIndex === currentIndex);
      dot.setAttribute('aria-selected', String(dotIndex === currentIndex));
    });
  };

  prevButton?.addEventListener('click', () => {
    showSlide(currentIndex - 1);
  });

  nextButton?.addEventListener('click', () => {
    showSlide(currentIndex + 1);
  });

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', () => {
      showSlide(dotIndex);
    });
  });

  let autoRotate = setInterval(() => {
    showSlide(currentIndex + 1);
  }, 6500);

  slider.addEventListener('mouseenter', () => {
    clearInterval(autoRotate);
  });

  slider.addEventListener('mouseleave', () => {
    autoRotate = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 6500);
  });

  showSlide(0);
}
