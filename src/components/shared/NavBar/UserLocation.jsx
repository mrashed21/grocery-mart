"use client";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaMarker } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const UserLocation = () => {
  const [locationText, setLocationText] = useState("Getting location...");
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  // Get user geolocation on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPosition({ lat: latitude, lng: longitude });
          setMapCenter({ lat: latitude, lng: longitude });
          fetchAddress(latitude, longitude);
        },
        (err) => {
          handleGeoError(err);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLocationText("Geolocation not supported.");
    }
  }, []);

  // Reverse geocode function
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();

      if (data.address) {
        const road = data.address.road || "";
        const neighbourhood =
          data.address.neighbourhood || data.address.suburb || "";
        const city =
          data.address.city || data.address.town || data.address.village || "";

        let formattedAddress = "";
        if (road) formattedAddress += `${road}, `;
        if (neighbourhood) formattedAddress += `${neighbourhood}, `;
        if (city) formattedAddress += `${city}`;

        setLocationText(
          formattedAddress || "Location found, but address could not be parsed."
        );

        // Log details you want to console
        console.log("Selected Location Details:");
        console.log("Road:", road);
        console.log("Neighbourhood / Area:", neighbourhood);
        console.log("City:", city);
      } else {
        setLocationText(
          "Location found, but address details are not available."
        );
      }
    } catch (err) {
      setError("Could not get address details from coordinates.");
      setLocationText("Error getting address.");
      console.error("Reverse geocoding error:", err);
    }
  };

  const handleGeoError = (err) => {
    switch (err.code) {
      case err.PERMISSION_DENIED:
        setError("Location access denied by user.");
        setLocationText("Location access denied.");
        break;
      case err.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        setLocationText("Location unavailable.");
        break;
      case err.TIMEOUT:
        setError("The request to get user location timed out.");
        setLocationText("Location request timed out.");
        break;
      default:
        setError("An unknown error occurred.");
        setLocationText("Unknown location error.");
        break;
    }
    console.error("Geolocation error:", err);
  };

  // When user drags marker or clicks map, update marker & fetch new address
  const onMapClick = (event) => {
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setMarkerPosition({ lat, lng });
    fetchAddress(lat, lng);
  };

  const onMarkerDragEnd = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    fetchAddress(lat, lng);
  };

  return (
    <>
      <div className="flex items-center space-x-0.5 lg:space-x-2">
        <span>
          <CiLocationOn className="text-[#5E8B8C] text-[14px] lg:text-lg" />
        </span>
        <p className="text-[12px] lg:text-sm text-[#2C2C2C] font-nunito font-medium">
          {locationText}
        </p>
        <span
          className="cursor-pointer"
          onClick={() => setModalOpen(true)}
          title="Set location on map"
        >
          <IoIosArrowDown className="text-[#5E8B8C] hidden lg:flex text-lg" />
        </span>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50  bg-black/70 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-[90vw] max-w-2xl h-[50vh] flex flex-col mt-20 ml-10">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Set Your Location</h2>
              <button
                className="text-gray-600 hover:text-gray-900 cursor-pointer"
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <APIProvider apiKey="AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao">
              <Map
                mapId="" // optional custom map style id
                defaultCenter={mapCenter}
                center={mapCenter}
                defaultZoom={14}
                style={{ flexGrow: 1 }}
                onClick={onMapClick}
              >
                {markerPosition && (
                  <FaMarker
                    position={markerPosition}
                    draggable={true}
                    onDragEnd={onMarkerDragEnd}
                  />
                )}
              </Map>
            </APIProvider>
          </div>
        </div>
      )}
    </>
  );
};

export default UserLocation;
