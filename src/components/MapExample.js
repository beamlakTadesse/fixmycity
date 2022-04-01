import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
export default function MapExample() {
    const defaultCenter = {
        lat: 9.0380,
        lng: 38.7618,
    };
    const center = {
        lat: 8.97332944,
        lng: 38.792996828,
    };

    return (
        <>
            <div className="relative w-full rounded-xl shadow-lg">
                <LoadScript googleMapsApiKey="AIzaSyCN5RsuQUGXEAd3TqNpEkHygtmhFxNiDZk">
                    <GoogleMap
                        mapContainerClassName="w-full h-full rounded-xl"
                        zoom={13}
                        center={defaultCenter}
                    >
                        <Marker key="location" position={defaultCenter} />

                        <Marker key="location1" position={center} />
                    </GoogleMap>
                </LoadScript>

            </div>

        </>
    );
}
