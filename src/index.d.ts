import * as L from "leaflet";
import * as geojson from "geojson";

declare module "leaflet" {
  namespace Playback {
    // Clock.js
    class Clock extends L.Class {
      constructor(trackController?: any, callback?: any, options?: any);

      addCallback(
        fn: (...args: any) => any
      ): (fn: (...args: any) => any) => void;
      start(): () => void;
      stop(): () => void;
      getSpeed(): number;
      isPlaying(): boolean;
      setSpeed(speed: number): (speed: number) => void;
      setCursor(ms: number): (ms: number) => void;
      getTime(): () => number;
      getStartTime(): () => number;
      getEndTime(): () => number;
      getTickLen(): () => number;
    }

    // Control.js
    interface DateControlOptions extends L.ControlOptions {
      dateFormatFn: string;
      timeFormatFn: string;
    }
    class DateControl extends L.Control {
      constructor(playback?: any, options?: DateControlOptions);
    }

    class PlayControl extends L.Control {
      constructor(playback?: any);
    }

    class SliderControl extends L.Control {
      constructor(playback?: any);
    }

    // MoveableMarker.js
    interface MoveableMarkerOptions extends L.MarkerOptions {
      marker(featureData: geojson.Feature): L.MarkerOptions;
      popups?: boolean;
      getPopup?(featureData: geojson.Feature): string;
      popupOptions?: L.PopupOptions;
      tooltips?: boolean;
      getTooltip?(featureData: geojson.Feature): string;
      tooltipOptions?: L.TooltipOptions;
    }
    class MoveableMarker extends L.Marker {
      constructor(
        startLatLng: L.LatLngExpression,
        options: MoveableMarkerOptions,
        feature: geojson.Feature
      );
      getPopupContent(): string | null;
      getPopupOptions(): L.PopupOptions | null;
      getTooltipContent(): string | null;
      getTooltipOptions(): L.TooltipOptions | null;

      move(latLng: L.LatLngExpression, transitionTime: number): void;
      setIconAngle(iconAngle: number): void;
    }

    // Track.js
    interface TrackOptions {
      tickLen: number;
      staleTime: number;
      fadeMarkersWhenStale: number;
      orientIcons: boolean;
    }
    type Tick = any;
    class Track extends L.Class {
      constructor(geoJSON: L.GeoJSON, options: TrackOptions);
      getFirstTick(): Tick[];
      getLastTick(): Tick[];
      getStartTime(): number;
      getEndTime(): number;
      getTickMultiPoint(): GeoJSON<{ ["time"]: number }, geojson.MultiPoint>;
      trackPresentAtTick(timestamp: any): boolean;
      trackStaleAtTick(timestamp: any): boolean;
      tick(timestamp: any): Tick;
      courseAtTime(timestamp: any): number;
      setMarker(timestamp: any, options: MoveableMarkerOptions): number;
      moveMarker(
        latLng: L.LatLngExpression,
        transitionTime: number,
        timestamp: any
      ): void;
      getMarker(): MoveableMarker;
    }

    // TrackController.js
    class TrackController extends L.Class {
      constructor(map: L.Map, tracks: Track[], options: MoveableMarkerOptions);
      clearTracks(): void;
      setTracks(tracks: Track[]): void;
      addTracks(tracks: Track[]): void;
      addTrack(track: Track, timestamp: any): void;
      tock(timestamp: any, transitionTime: number): void;
      getStartTime(): number;
      getEndTime(): number;
      getTracks(): Track[];
    }

    // TracksLayer.js
    interface TracksLayerOptions {
      layer: L.LayerOptions;
      tracksLayerName?: string;
    }
    class TracksLayer extends L.Class {
      constructor(map: L.Map, options: TracksLayerOptions);
      clearLayer(): void;
      addLayer(geoJSON: L.GeoJSON): void;
    }

    // Util.js
    class Util extends L.Class {
      static DateStr(time: string): string;
      static TimeStr(time: string): string;
      static ParseGPX(
        gpx: any
      ): geojson.FeatureCollection<geojson.MultiPoint, any>;
    }
  }
  // Playback.js
  interface PlaybackOptions {
    tickLen: number;
    speed: number;
    maxInterpolationTime: number;
    tracksLayer: boolean;
    playControl: boolean;
    dateControl: boolean;
    sliderControl: boolean;
    // options
    layer: any;
    marker: any;
  }

  class PlaybackClass extends L.Playback.Clock {
    // public static MoveableMarker: Playback.MoveableMarker;
    // public Track: Playback.Track;
    // public TrackController: L.Playback.TrackController;
    // public Clock: L.Playback.Clock;
    // public Util: L.Playback.Util;

    // public TracksLayer: L.Playback.TracksLayer;
    // public PlayControl: L.Playback.PlayControl;
    // public DateControl: L.Playback.DateControl;
    // public SliderControl: L.Playback.SliderControl;

    constructor(
      map: L.Map,
      geoJSON: L.GeoJSON,
      callback: any,
      options: PlaybackOptions
    );

    clearData(): void;
    setData(geoJSON: L.GeoJSON): void;
    addData(geoJSON: L.GeoJSON, ms: number): void;
    destroy(): void;
  }

  // class Playback extends PlaybackClass {}
  type Playback = typeof PlaybackClass;

  function playback(
    map: L.Map,
    geoJSON: L.GeoJSON,
    callback: any,
    options: PlaybackOptions
  ): Playback;
}
