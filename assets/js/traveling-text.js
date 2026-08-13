const base = " we're gettin' married ";
const sep = '\u00A0\u00A0\u00A0 <tspan class="heart">❤</tspan> \u00A0\u00A0\u00A0';
const repeatCount = 100;

const text = Array.from({ length: repeatCount }, () => base).join(sep);

document.getElementById("tp").innerHTML = text;

var dur = 350.0;
let tl = gsap.timeline({ repeat: -1 });

tl.fromTo(".repeatText",
    { attr: { startOffset: "-1000%" } },  // start off-screen left
    { attr: { startOffset: "100%" }, duration: dur, ease: "linear" }  // move to off-screen right
);

// const btn = document.getElementById("pauseBtn");
// let paused = false;

// btn.addEventListener("click", () => {
//     if (!paused) {
//         tl.pause();
//         btn.innerHTML = '<i class="fa fa-play" aria-hidden="true"></i>';
//     } else {
//         tl.resume();
//         btn.innerHTML = '<i class="fa fa-pause" aria-hidden="true"></i>';
//     }
//     paused = !paused;
// });