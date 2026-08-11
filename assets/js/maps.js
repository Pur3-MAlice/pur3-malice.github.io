async function initMap() {

const { Map } = await google.maps.importLibrary("maps");
const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
const { InfoWindow  } = await google.maps.importLibrary("maps");
const message = ["<h3>The Stables, Lower Byrom Street</h3>"];

const map = new Map(document.getElementById("map"), {
    center: {
    lat: 53.477797,
    lng: -2.256257
    },

    zoom: 15,

    mapId: "wedding-venue"
});

const markerContent = document.createElement("div");

const infoWindow = new InfoWindow({
  content: message[0]
});

markerContent.className = "custom-marker";

markerContent.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="#818865" 
    stroke-width="1" 
    stroke-linecap="round" 
    stroke-linejoin="round" 
    class="feather feather-map-pin">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#818865" />
    <circle cx="12" cy="10" r="3" fill="#38492d" />
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
    map.setZoom(18);
    infoWindow.open({
        anchor: marker,
        map
    });
});

}

window.initMap = initMap;
