// Simply shows all of the track points as circles.
// TODO: Associate circle color with the marker color.

L.Playback = L.Playback || {};

L.Playback.TracksLayer = L.Class.extend({
  initialize: function (map, options) {
    const layer_options_function = options.layer || {};
    this._tracksLayerName = options.tracksLayerName || "GPS Tracks";

    let layer_options = {};

    if (layer_options_function instanceof Function) {
      // ? Does this impact something ?
      // layer_options = layer_options(feature);
      layer_options = layer_options();
    }

    if (!options.pointToLayer) {
      layer_options.pointToLayer = function (featureData, latlng) {
        return new L.CircleMarker(latlng, { radius: 5 });
      };
    }

    this.layer = new L.GeoJSON(null, layer_options);

    const overlayControl = {};
    overlayControl[this._tracksLayerName] = this.layer;

    L.control
      .layers(null, overlayControl, {
        collapsed: false,
      })
      .addTo(map);
  },

  // clear all geoJSON layers
  clearLayer: function () {
    for (const i in this.layer._layers) {
      this.layer.removeLayer(this.layer._layers[i]);
    }
  },

  // add new geoJSON layer
  addLayer: function (geoJSON) {
    this.layer.addData(geoJSON);
  },
});
