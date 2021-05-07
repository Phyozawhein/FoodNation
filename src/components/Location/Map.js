import *as react from 'react'
import { useState } from 'react';
import ReactMapGL , {Marker, NavigationControl}from 'react-map-gl';

export default function Map() {
    const [viewport, setViewport] = useState({
        width: "100vw",
        height: "100vh",
        latitude: 40.7128,
        longitude: -74.0060,
        zoom: 4
      });

      const navControlStyle= {
        right: 10,
        top: 10
      };

      function successLocation(position) {
        console.log(position)
        
      }
      function errorLocation() {
        console.log("error")
        
      }

      return (
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken = {process.env.REACT_APP_MAPBOX}
          navigator = {navigator.geolocation.getCurrentPosition(successLocation,errorLocation, {enableHighAccuracy: true})}
          onViewportChange={nextViewport => setViewport(nextViewport)}
          mapStyle = "mapbox://styles/jamesey123/ckodjdc43157k17nnkfcn10ii"
        >
          <NavigationControl style={navControlStyle} />

          </ReactMapGL>
      );


}