import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LoadingScreen } from '../Load/LoadingScreen';

const Map = ({ latitude, longitude }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const customIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/684/684908.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <MapContainer
          center={[latitude, longitude]}
          zoom={8}
          scrollWheelZoom={false}
          style={{ height: 510, width: 500 }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker className="pin" position={[latitude, longitude]} icon={customIcon}>
            <Popup>
              A custom marker with a popup.
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
