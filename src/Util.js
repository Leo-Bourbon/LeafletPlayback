L.Playback = L.Playback || {};

L.Playback.Util = L.Class.extend({
  statics: {
    DateStr: function (time) {
      return new Date(time).toDateString();
    },

    TimeStr: function (time) {
      const d = new Date(time);
      let h = d.getHours();
      let m = d.getMinutes();
      let s = d.getSeconds();
      const tms = time / 1000;
      const dec = (tms - Math.floor(tms)).toFixed(2).slice(1);
      let mer = "AM";
      if (h > 11) {
        h %= 12;
        mer = "PM";
      }
      if (h === 0) h = 12;
      if (m < 10) m = "0" + m;
      if (s < 10) s = "0" + s;
      return h + ":" + m + ":" + s + dec + " " + mer;
    },

    ParseGPX: function (gpx) {
      const geojsonRoot = {
        type: "FeatureCollection",
        features: [],
      };

      const parser = new DOMParser();
      const xml = parser.parseFromString(gpx, "text/xml");

      const trks = xml.getElementsByTagName("trk");
      for (
        let trackIdx = 0, numberOfTracks = trks.length;
        trackIdx < numberOfTracks;
        trackIdx++
      ) {
        const track = trks[trackIdx];
        const geojson = {
          type: "Feature",
          geometry: {
            type: "MultiPoint",
            coordinates: [],
          },
          properties: {
            trk: {},
            time: [],
            speed: [],
            altitude: [],
            bbox: [],
          },
        };

        geojson.properties.trk.name =
          track.getElementsByTagName("name")[0].textContent;
        if (track.getElementsByTagName("desc")[0] !== undefined) {
          geojson.properties.trk.desc =
            track.getElementsByTagName("desc")[0].textContent;
        }
        if (track.getElementsByTagName("type")[0] !== undefined) {
          geojson.properties.trk.type =
            track.getElementsByTagName("type")[0].textContent;
        }
        if (track.getElementsByTagName("src")[0] !== undefined) {
          geojson.properties.trk.src =
            track.getElementsByTagName("src")[0].textContent;
        }

        const pts = track.getElementsByTagName("trkpt");
        for (let i = 0, len = pts.length; i < len; i++) {
          const p = pts[i];
          const lat = parseFloat(p.getAttribute("lat"));
          const lng = parseFloat(p.getAttribute("lon"));
          const timeStr = p.getElementsByTagName("time")[0].textContent;
          const eleStr =
            p.getElementsByTagName("ele")[0] !== undefined
              ? p.getElementsByTagName("ele")[0].textContent
              : null;
          const t = new Date(timeStr).getTime();
          const ele = parseFloat(eleStr);

          const coords = geojson.geometry.coordinates;
          const props = geojson.properties;

          const time = props.time;
          const altitude = geojson.properties.altitude;

          coords.push([lng, lat]);
          time.push(t);
          altitude.push(ele);
        }
        geojsonRoot.features.push(geojson);
      }

      return geojsonRoot;
    },
  },
});
