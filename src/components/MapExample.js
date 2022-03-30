import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
export default function MapExample() {
    const defaultCenter = {
        lat: 40.748817,
        lng: -73.985428,
    };
    const center = {
        lat: 70.748817,
        lng: -73.985428,
    };
    const [showModal, setShowModal] = useState(false);

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

                        <Marker key="location" position={center} />
                    </GoogleMap>
                </LoadScript>

            </div>
            {/* <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>

                <ModalBody>

                    <p>{defaultCenter}</p>
                </ModalBody>
            </Modal> */}
        </>
    );
}
