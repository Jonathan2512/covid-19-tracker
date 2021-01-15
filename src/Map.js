import React from 'react'
import { MapContainer, TileLayer } from "react-leaflet";
import { CircleMap } from './Circle'
import './Map.css';
import "leaflet/dist/leaflet.css";

function Map({ casesType, countries, center, zoom }) {
    return (
        <div className="map">
            <MapContainer center={center} zoom={zoom}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <CircleMap countries={countries} casesType={casesType} />
            </MapContainer>
        </div>
    )
}

export default Map;
