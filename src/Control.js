L.Playback = L.Playback || {};

L.Playback.DateControl = L.Control.extend({
  options: {
    position: "bottomleft",
    dateFormatFn: L.Playback.Util.DateStr,
    timeFormatFn: L.Playback.Util.TimeStr,
  },

  initialize: function (playback, options) {
    L.setOptions(this, options);
    this.playback = playback;
  },

  onAdd: function (map) {
    this._container = L.DomUtil.create(
      "div",
      "leaflet-control-layers leaflet-control-layers-expanded"
    );

    const playback = this.playback;
    const time = playback.getTime();

    const datetime = L.DomUtil.create(
      "div",
      "datetimeControl",
      this._container
    );

    // date time
    this._date = L.DomUtil.create("p", "", datetime);
    this._time = L.DomUtil.create("p", "", datetime);

    this._date.innerHTML = this.options.dateFormatFn(time);
    this._time.innerHTML = this.options.timeFormatFn(time);

    // setup callback
    playback.addCallback((ms) => {
      this._date.innerHTML = this.options.dateFormatFn(ms);
      this._time.innerHTML = this.options.timeFormatFn(ms);
    });

    return this._container;
  },
});

L.Playback.PlayControl = L.Control.extend({
  options: {
    position: "bottomright",
  },

  initialize: function (playback) {
    this.playback = playback;
  },

  onAdd: function (map) {
    this._container = L.DomUtil.create(
      "div",
      "leaflet-control-layers leaflet-control-layers-expanded"
    );

    const playback = this.playback;
    playback.setSpeed(100);

    const playControl = L.DomUtil.create("div", "playControl", this._container);

    this._button = L.DomUtil.create("button", "", playControl);
    this._button.innerHTML = "Play";

    const stop = L.DomEvent.stopPropagation;

    const play = () => {
      if (playback.isPlaying()) {
        playback.stop();
        this._button.innerHTML = "Play";
      } else {
        playback.start();
        this._button.innerHTML = "Stop";
      }
    };

    L.DomEvent.on(this._button, "click", stop)
      .on(this._button, "mousedown", stop)
      .on(this._button, "dblclick", stop)
      .on(this._button, "click", L.DomEvent.preventDefault)
      .on(this._button, "click", play, this);

    return this._container;
  },
});

L.Playback.SliderControl = L.Control.extend({
  options: {
    position: "bottomleft",
  },

  initialize: function (playback) {
    this.playback = playback;
  },

  onAdd: function (map) {
    this._container = L.DomUtil.create(
      "div",
      "leaflet-control-layers leaflet-control-layers-expanded"
    );

    const playback = this.playback;

    // slider
    this._slider = L.DomUtil.create("input", "slider", this._container);
    this._slider.type = "range";
    this._slider.min = playback.getStartTime();
    this._slider.max = playback.getEndTime();
    this._slider.value = playback.getTime();

    L.DomEvent.disableClickPropagation(this._slider);

    L.DomEvent.on(this._slider, "change", onSliderChange, this).on(
      this._slider,
      "mousemove",
      onSliderChange,
      this
    );

    function onSliderChange(e) {
      const val = Number(e.target.value);
      playback.setCursor(val);
    }

    playback.addCallback((ms) => {
      this._slider.value = ms;
    });

    map.on("playback:add_tracks", () => {
      this._slider.min = playback.getStartTime();
      this._slider.max = playback.getEndTime();
      this._slider.value = playback.getTime();
    });

    return this._container;
  },
});
