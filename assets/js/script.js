function initNavigation() {
  const navEl = document.querySelector('.nav');
  const hamburgerEl = document.querySelector('.hamburger');
  const navItemEls = document.querySelectorAll('.nav-item');

  hamburgerEl.addEventListener('click', () => {
    console.log("Hamburger clicked");

    navEl.classList.toggle('nav--open');
    hamburgerEl.classList.toggle('hamburger--open');
  });

  navItemEls.forEach(navItemEl => {
    navItemEl.addEventListener('click', () => {
      navEl.classList.remove('nav--open');
      hamburgerEl.classList.remove('hamburger--open');
    });
  });
}


// Create an observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
});

// Observe all elements with a specific class
document.querySelectorAll('.fade-on-scroll').forEach(el => {
  observer.observe(el);
});