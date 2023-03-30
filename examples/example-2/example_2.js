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

  // Colors for AwesomeMarkers
  let _colorIdx = 0;
  const _colors = [
    "orange",
    "green",
    "blue",
    "purple",
    "darkred",
    "cadetblue",
    "red",
    "darkgreen",
    "darkblue",
    "darkpurple",
  ];

  function _assignColor() {
    return _colors[_colorIdx++ % 10];
  }

  // =====================================================
  // =============== Playback ============================
  // =====================================================

  // Playback options
  const playbackOptions = {
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

    marker: function () {
      return {
        icon: L.AwesomeMarkers.icon({
          prefix: "fa",
          icon: "bullseye",
          markerColor: _assignColor(),
        }),
      };
    },
  };

  // Initialize playback
  const playback = new L.Playback(map, demoTracks, null, playbackOptions);

  // Initialize custom control
  const control = new L.Playback.Control(playback);
  control.addTo(map);

  // Add data
  playback.addData(blueMountain);
});
