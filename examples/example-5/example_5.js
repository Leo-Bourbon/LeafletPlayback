/* global demoTracks */
window.addEventListener("DOMContentLoaded", function () {
  // Setup leaflet map
  const map = new L.Map("map");

  const basemapLayer = new L.tileLayer(
    "https://{s}.tile.osm.org/{z}/{x}/{y}.png",
    {
      maxZoom: 18,
      attribution:
        "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors",
      tileSize: 512,
      zoomOffset: -1,
    }
  );

  // Center map and default zoom level
  map.setView([44.61131534, -123.4726739], 9);

  // Adds the background layer to the map
  map.addLayer(basemapLayer);

  // =====================================================
  // =============== Playback ============================
  // =====================================================

  // Playback options
  const playbackOptions = {
    playControl: true,
    dateControl: true,
    sliderControl: true,
    tooltips: true,
    popups: true,
    // marker options
    marker: function (featureData) {
      return {
        notLatLngBased: true,
        getPopup: function (featureData) {
          let result = "";

          if (
            featureData &&
            featureData.properties &&
            featureData.properties.title
          ) {
            result =
              "<strong>" + featureData.properties.title + "</strong><br/>";
          }

          return result;
        },
        getPopupOptions: function () {
          return {
            keepInView: true,
          };
        },
        getTooltip: function (featureData) {
          let result = "";
          if (
            featureData &&
            featureData.properties &&
            featureData.properties.title
          ) {
            result =
              '<strong style="font-size: 18px;">' +
              featureData.properties.title +
              "</strong><br/>";
          }
          return result;
        },
        getTooltipOptions: function () {
          return {
            offset: [4, -4],
            direction: "right",
            permanent: true,
          };
        },
        getLocationWrapper: function () {
          return {
            start: "<strong>Coordinates:</strong> <i>[",
            end: "]</i>",
          };
        },
      };
    },
  };

  // Initialize playback
  const playback = new L.Playback(map, demoTracks, null, playbackOptions);
});
