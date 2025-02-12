# LeafletPlayback

Leaflet Playback provides the ability to replay GPS Tracks in the form of GeoJSON objects. Rather than simply animating a marker along a polyline, the speed of the animation is synchroized to a clock. The playback functionality is similar to a video player--you can start and stop playback, change the playback speed, load GPS tracks, as well as set the playback time with a slider or calendar/time-picker widget.

## Examples

### [Example 0](http://leafletplayback.theoutpost.io/examples/example_0.html)

Basic example of LeafletPlayback plugin, that pre-loads some GPS GeoJSON tracks and lets you play them back.

### [Example 1](http://leafletplayback.theoutpost.io/examples/example_1.html)

Use vis.js timeline as slider control.

### [Example 2](http://leafletplayback.theoutpost.io/examples/example_2.html)

Custom interface example - Includes the usage of Maki Markers and Twitter Bootstrap.

### Example 3

Using GPX loading.

### Example 4

Shows the ability to have markers orient themselves to the bearing of the track.

### Example 5

Shows the ability to have tooltips on markers.

### [Virtual Fence Demo](http://virtualfence.theoutpost.io/)
I began my work on LeafletPlayback in my web mapping class at [Oregon State University](http://cartography.oregonstate.edu/). My final project involved animating GPS tracks that triggered geo-fences. _Note: this may stop working on August 2015 when Geoloqui will discontinue their web services._

## GPS Data Format

Leaflet Playback consumes GPS tracks in the form of GeoJSON. Limited GPX import is provided with the `L.Playback.Util.ParseGPX()` convertion function. The schema of the GeoJSON data is as follows:

```javascript
{
  "type": "Feature",
  "geometry": {
    "type": "MultiPoint",
    "coordinates": [/*array of [lng,lat] coordinates*/]
  },
  "properties": {
    "time": [/*array of UNIX timestamps*/]
  }
}
```

Other attributes may be added to the GeoJSON object, but this is the required minimum schema for the plug-in to work.

There are three leaflet controls defined in `src/Controls.js`:

1. L.Playback.DateControl - Current tick date/time;
2. L.Playback.PlayControl -  Play/stop button to control time flow of LeafletPlayback;
3. L.Playback.SliderControl - Simple time slider;

# Usage

## API

### new L.Playback(map, geoJSON, onPlaybackTimeChange, options)

#### parameters

```javascript
var playback = new L.Playback(map, geoJSON, onPlaybackTimeChange, options);
```

* `map` - LeafLet map object. **Required**.

* `geoJSON` - GeoJSON object or an array of GeoJSON objects. Pass `null` if you don't have any data yet. **Required**.

* `onPlaybackTimeChange` - A function with signature `(timestamp)` that will send the `timestamp` value on each tick. **Required**.

* `options` - An options object. **Optional**.

#### options

* `tickLen` - Set tick length in miliseconds. Increasing this value, may improve performance, at the cost of animation smoothness. **Default: `250`**.

* `speed` - Set `float` multiplier for default animation speed. **Default: `1`**.

* `maxInterpolationTime` - Set max interpolation time in seconds. **Default: `5*60*1000` (5 minutes)**.

* `tracksLayer` - Set `true` if you want to show layer control on the map. **Default: `true`**.

* `playControl` - Set `true` if play button is needed. **Default: `false`**.

* `dateControl` - Set `true` if date label is needed. **Default: `false`**.

* `sliderControl` - Set `true` if slider control is needed. **Default: `false`**.

* `layer` - Object or function with signature `(featureData)` that returns geoJSON layer options object. Useful for setting path color. **Default: `{}`**.

* `marker` - Object or function with signature `(featureData)` that returns leaflet marker options, to extend `L.Playback.MoveableMarker`. Useful for custom icons. **Default: `{}`**.

  * `getPopup` - The label you want on your popup.

  * `getPopupOptions` - Useful for custom popups. Uses [popup options](https://leafletjs.com/reference-1.6.0.html#popup). **Default: `{}`**.

  * `getTooltip` - The label you want on your tooltip.

  * `getLocationWrapper` - The content that you want to surround the LatLng readout and the label you want to give it. Useful if you are using a map with y x points rather than latitude longitude. This affects the current location shown on popups and tooltips. **Default: `{}`**.

  * `getTooltipOptions` - Useful for custom tooltips. Uses [tooltip options](https://leafletjs.com/reference-1.6.0.html#tooltip). **Default: `{}`**.

* `orientIcons` - Set `true` if you want icons to orient themselves on each tick based on the bearing towards their next location. **Default: `false`**.

* `mouseOverCallback` - A function with signature `(event)` that will be sent events on 'mouseover' on each marker **Optional**.

* `clickCallback` - A function with signature `(event)` that will be sent events on 'click' on each marker **Optional**.

* `popups` - Set `true` if popups on markers are required. **Default: `false`**.

* `tooltips` - Set `true` if tooltips on markers are required. **Default: `false`**.

* `staleTime` - Set time before a track is considered stale and faded out. **Default: `60*60*1000` (1 hour)**.

* `fadeMarkersWhenStale` - Set `true` markers should hide when not yet present in time and fade out after staleTime has passed **Default: `false`**.

* `tracksLayerName` - String with the name of the tracks layer  **Default: `GPS Tracks`**.

### playback#setData(geoJSON)

Reset current data and add new.

* `geoJSON` - GeoJSON object or an array of GeoJSON objects. **Required**.

### playback#addData(geoJSON)

Add new data.

* `geoJSON` - GeoJSON object or an array of GeoJSON objects. **Required**.

### playback#clearData()

Clear all data and tracks layer.

### L.Playback.Util.ParseGPX(gpxString)
Convert `gpxString` content into geoJSON that can be  used as input data for `Playback()`.
* `gpxString` - a string containg the content of a GPX file. **Required**.


## Authors and Contributors

* @hallahan - Nicholas Hallahan
* @recallfx - Marius
* @lbuter - Luke Butler
* @dgorissen - Dirk Gorissen
* @apre
* @jambonium - Michelle-Louise Janion
