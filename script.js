const base = " We're Getting Married ";
const sep = "\u00A0\u00A0\u00A0♥\u00A0\u00A0\u00A0";
const repeatCount = 100;

const text = Array.from({ length: repeatCount }, () => base).join(sep);

document.getElementById("tp").textContent = text;

var dur = 20.0;
let tl = gsap.timeline({ repeat: -1 });

tl.fromTo(".repeatText",
    { attr: { startOffset: "-100%" } },  // start off-screen left
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