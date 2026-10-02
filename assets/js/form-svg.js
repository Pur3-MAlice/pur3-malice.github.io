const svg = document.getElementById("frame");
const formBody = document.getElementById("form-body");

const middle = document.getElementById("middle-section");
const bottom = document.getElementById("bottom-section");

const MIDDLE_HEIGHT = 1000;
const SVG_WIDTH = 1807.18;

// Controls how much the middle stretches.
// Lower = less stretching.
const STRETCH_FACTOR = 0.75;

function resizeFrame() {

    const svgWidth = svg.getBoundingClientRect().width;
    const scale = svgWidth / SVG_WIDTH;

    const formHeight = formBody.getBoundingClientRect().height / scale;

    const extraHeight = Math.max(
        0,
        (formHeight - MIDDLE_HEIGHT) * STRETCH_FACTOR
    );

    const middleHeight = MIDDLE_HEIGHT + extraHeight;
    const totalHeight = 3000 + extraHeight;

    // Stretch middle
    middle.setAttribute(
        "transform",
        `translate(0 1000)
         scale(1 ${middleHeight / MIDDLE_HEIGHT})
         translate(0 -1000)`
    );

    // Move bottom
    bottom.setAttribute(
        "transform",
        `translate(0 ${extraHeight})`
    );

    // Make SVG taller
    svg.setAttribute(
        "viewBox",
        `596.41 0 1807.18 ${totalHeight}`
    );
}

const observer = new ResizeObserver(() => {
    console.log(
        "Form height:",
        formBody.getBoundingClientRect().height
    );

    resizeFrame();
});

observer.observe(formBody);

resizeFrame();