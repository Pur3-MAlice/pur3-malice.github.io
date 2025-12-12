const base = " We're Getting Married ";
const sep = "\u00A0\u00A0\u00A0♥\u00A0\u00A0\u00A0";
const repeatCount = 100;

const text = Array.from({ length: repeatCount }, () => base).join(sep);

document.getElementById("tp").textContent = text;

var dur = 350.0;
let tl = gsap.timeline({ repeat: -1 });

tl.fromTo(".repeatText",
    { attr: { startOffset: "-1000%" } },  // start off-screen left
    { attr: { startOffset: "100%" }, duration: dur, ease: "linear" }  // move to off-screen right
);

const btn = document.getElementById("pauseBtn");
let paused = false;

btn.addEventListener("click", () => {
    if (!paused) {
        tl.pause();
        btn.textContent = "Resume";
    } else {
        tl.resume();
        btn.textContent = "Pause";
    }
    paused = !paused;
});



///nav bar
const navEl = document.querySelector('.nav');
const hamburgerEl = document.querySelector('.hamburger');
const navItemEls = document.querySelectorAll('.nav__item');

hamburgerEl.addEventListener('click', () => {
  navEl.classList.toggle('nav--open');
  hamburgerEl.classList.toggle('hamburger--open');
});

navItemEls.forEach(navItemEl => {
  navItemEl.addEventListener('click', () => {
    navEl.classList.remove('nav--open');
    hamburgerEl.classList.remove('hamburger--open');
  });
});