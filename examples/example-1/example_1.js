/// <reference types="../src/index.d.ts" />
/* global demoTracks, vis */
window.addEventListener("DOMContentLoaded", function () {
  // Get start/end times
  const startTime = new Date(demoTracks[0].properties.time[0]);
  const endTime = new Date(
    demoTracks[0].properties.time[demoTracks[0].properties.time.length - 1]
  );

  // Create a DataSet with data
  const timelineData = new vis.DataSet([
    { start: startTime, end: endTime, content: "Demo GPS Tracks" },
  ]);

  // Set timeline options
  const timelineOptions = {
    width: "100%",
    height: 120,
    type: "box",
    orientation: "top",
    showCurrentTime: true,
  };

  // Setup timeline
  const timeline = new vis.Timeline(
    document.getElementById("timeline"),
    timelineData,
    timelineOptions
  );

  // Set custom time marker (blue)
  timeline.setCurrentTime(startTime);

  // Setup leaflet map
  const map = new L.Map("map");

  const basemapLayer = new L.TileLayer(
    "https://{s}.tile.osm.org/{z}/{x}/{y}.png"
  );

  // Center map and default zoom level
  map.setView([44.5, -123.6], 10);

  // Adds the background layer to the map
  map.addLayer(basemapLayer);

  // =====================================================
  // =============== Playback ============================
  // =====================================================

  // Playback options
  const playbackOptions = {
    playControl: true,
    dateControl: true,

    // layer and marker options
    layer: {
      pointToLayer: function (featureData, latlng) {
        let result = {};

        if (
          featureData &&
          featureData.properties &&
          featureData.properties.path_options
        ) {
          result = featureData.properties.path_options;
        }

        if (!result.radius) {
          result.radius = 5;
        }

        return new L.CircleMarker(latlng, result);
      },
    },

    marker: {
      getPopup: function (featureData) {
        let result = "";

        if (
          featureData &&
          featureData.properties &&
          featureData.properties.title
        ) {
          result = featureData.properties.title;
        }

        return result;
      },
    },
  };

  // Initialize playback
  const playback = new L.Playback(
    map,
    null,
    onPlaybackTimeChange,
    playbackOptions
  );

  playback.setData(demoTracks);
  playback.addData(blueMountain);

  // Uncomment to test data reset;
  //playback.setData(blueMountain);

  // Set timeline time change event, so cursor is set after moving custom time (blue)
  timeline.on("timechange", onCurrentTimeChange);

  // A callback so timeline is set after changing playback time
  function onPlaybackTimeChange(ms) {
    timeline.setCurrentTime(new Date(ms));
  }

  //
  function onCurrentTimeChange(properties) {
    if (!playback.isPlaying()) {
      playback.setCursor(properties.time.getTime());
    }
  }
});
