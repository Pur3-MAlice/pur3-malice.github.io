async function initMap() {

const { Map } = await google.maps.importLibrary("maps");
const { AdvancedMarkerElement } =
    await google.maps.importLibrary("marker");

const map = new Map(document.getElementById("map"), {
    center: {
    lat: 53.477797,
    lng: -2.256257
    },

    zoom: 16,

    mapId: "wedding-venue"
});

const markerContent = document.createElement("div");

markerContent.className = "custom-marker";

markerContent.innerHTML = `
    <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">

    <path
        d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
        fill="#222222"/>

    <circle
        cx="12"
        cy="9"
        r="2.5"
        fill="white"/>

    </svg>
`;

const marker = new AdvancedMarkerElement({
    map: map,
    position: {
    lat: 53.477797,
    lng: -2.256257
    },
    title: "YOUR VENUE NAME",
    content: markerContent
});

marker.addListener("click", () => {
    alert("YOUR VENUE INFORMATION");
});
}

window.initMap = initMap;
