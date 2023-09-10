import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import leaflet from 'leaflet';
import MarkerIcon from '~/assets/marker-icon.png';
import MarkerShadow from '~/assets/marker-shadow.png';
import { ComponentResize } from './ComponentResize';
import 'leaflet/dist/leaflet.css';

const Map = () => {
  return (
    <MapContainer
      center={[-5.111133561412902, -42.84109078804454]}
      zoom={13}
      className="w-full h-[265px]"
    >
      <ComponentResize />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        icon={
          new leaflet.Icon({
            iconUrl: MarkerIcon.src,
            iconRetinaUrl: MarkerIcon.src,
            iconSize: [25, 41],
            iconAnchor: [12.5, 41],
            popupAnchor: [0, -41],
            shadowUrl: MarkerShadow.src,
            shadowSize: [41, 41],
          })
        }
        position={[-5.111133561412902, -42.84109078804454]}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
