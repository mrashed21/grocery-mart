
"use client";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
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
        (err) => handleGeoError(err)
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLocationText("Geolocation not supported.");
    }
  }, []);

  // Reverse geocode with OpenStreetMap
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

        console.log("Selected Location:", { road, neighbourhood, city });
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

  // Map click → update marker & address
  const onMapClick = (event) => {
    if (!event.latLng) return;
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    fetchAddress(lat, lng);
  };

  // Marker drag → update marker & address
  const onMarkerDragEnd = (event) => {
    if (!event.latLng) return;
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPosition({ lat, lng });
    fetchAddress(lat, lng);
  };

  return (
    <>
      <div className="flex items-center space-x-1">
        <CiLocationOn className="text-[#5E8B8C] text-lg" />
        <p className="text-sm text-[#2C2C2C] font-medium">{locationText}</p>
        <span
          className="cursor-pointer"
          onClick={() => setModalOpen(true)}
          title="Set location on map"
        >
          <IoIosArrowDown className="text-[#5E8B8C] text-lg" />
        </span>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-[90vw] max-w-2xl h-[60vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Set Your Location</h2>
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => setModalOpen(false)}
              >
                ✕
              </button>
            </div>
            {/* AIzaSyCAZDJRxvK4Yb-zcGlOyAfdGfGOvKTkq3A */}
            {/* AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao */}
            <APIProvider apiKey="AIzaSyCAZDJRxvK4Yb-zcGlOyAfdGfGOvKTkq3A">
              <Map
                defaultCenter={mapCenter}
                center={mapCenter}
                defaultZoom={14}
                style={{ flexGrow: 1 }}
                onClick={onMapClick}
              >
                {markerPosition && (
                  <Marker
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
