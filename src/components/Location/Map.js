import React, { useRef, useEffect, useState } from "react";

import mapboxgl from "!mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import classes from "./Map.module.css";
mapboxgl.accessToken = "pk.eyJ1IjoiamFtZXNleTEyMyIsImEiOiJja29kZWdwem8wMWN0MnBsamZjdTFubzVqIn0.XpxBfYx--XvD0ekrbAju8w";

export default function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-74.006);
  const [lat, setLat] = useState(40.7128);
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false,
    });
    map.current.addControl(new mapboxgl.NavigationControl());
    map.current.addControl(
      new mapboxgl.AttributionControl({
        compact: true,
      })
    );
    map.current.addControl(new mapboxgl.FullscreenControl());

    var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
    });
    map.current.addControl(directions, "top-left");
  });

  return <div ref={mapContainer} className={classes.mapContainer} />;
}
