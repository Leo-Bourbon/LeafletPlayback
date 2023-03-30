/// <reference types="../src/index.d.ts" />
/* global demoTracks */
window.addEventListener("DOMContentLoaded", function () {
  // Setup leaflet map
  const map = new L.Map("map");

  const basemapLayer = new L.TileLayer(
    "https://{s}.tile.osm.org/{z}/{x}/{y}.png"
  );

  // Center map and default zoom level
  map.setView([44.61131534, -123.4726739], 9);

  // Adds the background layer to the map
  map.addLayer(basemapLayer);

  // =====================================================
  // =============== Playback ============================
  // =====================================================

  // Playback options
  /**
   * @type { L.PlaybackOptions }
   */
  const playbackOptions = {
    playControl: true,
    dateControl: true,
    sliderControl: true,
    marker: (feature) => {
      return {
        popups: true,
        tooltips: true,
      };
    },
  };

  // Initialize playback
  const playback = new L.Playback(map, demoTracks, null, playbackOptions);
});
