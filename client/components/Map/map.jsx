import { MapContainer, Marker, Popup, TileLayer  } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { useEffect, useState } from "react";
import axios from "axios";



const customIcon = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/128/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const Map = () => {
  return (
    <MapContainer
      className="map1"
      center={[42.602636, 20.902977]}
      zoom={8}
      scrollWheelZoom={false}
      style={{ height: 850, width: 500 }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker className="pin" position={[42.602636, 20.902977]} icon={customIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
