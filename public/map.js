const map = L.map('map').setView([39.2, -77], 9);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibnZhcm5lciIsImEiOiJjazc3dDVoaXIwYTAzM2lvMm1mbzdrbWZpIn0.-goJwGAVy24o5mMMslkBwQ'
}).addTo(map);

fetch("/md-current-data")
    .then((resp) => resp.json())
    .then(function(data) {
        let max = 0;
        let min = -1;
        const stuff = [];
        for (const point of data) {
            const val = point["Value"];
            if (val > max) {
                max = val;
            }
            if (val < min || min < 0) {
                min = val;
            }
        }
        for (const point of data) {
            stuff.push([point["Latitude"], point["Longitude"], (point["Value"] - min) / (max - min)]);
            L.marker([point["Latitude"], point["Longitude"]]).addTo(map);
        }
        L.idwLayer(stuff, { opacity: 0.3, cellSize: 15, gradient: { 0: "blue", 1: "red" } }).addTo(map);
    });