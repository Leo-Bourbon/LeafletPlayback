L.Playback = L.Playback || {};

L.Playback.TrackController = L.Class.extend({
  initialize: function (map, tracks, options) {
    this.options = options || {};

    this._map = map;

    this._tracks = [];

    // initialize tick points
    this.setTracks(tracks);
  },

  clearTracks: function () {
    while (this._tracks.length > 0) {
      const track = this._tracks.pop();
      const marker = track.getMarker();

      if (marker) {
        this._map.removeLayer(marker);
      }
    }
  },

  setTracks: function (tracks) {
    // reset current tracks
    this.clearTracks();

    this.addTracks(tracks);
  },

  addTracks: function (tracks) {
    // return if nothing is set
    if (!tracks) {
      return;
    }

    if (tracks instanceof Array) {
      for (let i = 0, len = tracks.length; i < len; i++) {
        this.addTrack(tracks[i]);
      }
    } else {
      this.addTrack(tracks);
    }
  },

  // add single track
  addTrack: function (track, timestamp) {
    // return if nothing is set
    if (!track) {
      return;
    }

    const marker = track.setMarker(timestamp, this.options);

    if (marker) {
      marker.addTo(this._map);

      this._tracks.push(track);
    }
  },

  tock: function (timestamp, transitionTime) {
    for (let i = 0, len = this._tracks.length; i < len; i++) {
      const lngLat = this._tracks[i].tick(timestamp);
      const latLng = new L.LatLng(lngLat[1], lngLat[0]);
      this._tracks[i].moveMarker(latLng, transitionTime, timestamp);
    }
  },

  getStartTime: function () {
    let earliestTime = 0;

    if (this._tracks.length > 0) {
      earliestTime = this._tracks[0].getStartTime();
      for (let i = 1, len = this._tracks.length; i < len; i++) {
        const t = this._tracks[i].getStartTime();
        if (t < earliestTime) {
          earliestTime = t;
        }
      }
    }

    return earliestTime;
  },

  getEndTime: function () {
    let latestTime = 0;

    if (this._tracks.length > 0) {
      latestTime = this._tracks[0].getEndTime();
      for (let i = 1, len = this._tracks.length; i < len; i++) {
        const t = this._tracks[i].getEndTime();
        if (t > latestTime) {
          latestTime = t;
        }
      }
    }

    return latestTime;
  },

  getTracks: function () {
    return this._tracks;
  },
});
