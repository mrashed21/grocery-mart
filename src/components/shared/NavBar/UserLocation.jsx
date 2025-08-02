"use client";
import { useEffect, useState } from "react";
import { CiLocationOn } from "react-icons/ci"; 
import { IoIosArrowDown } from "react-icons/io";

const UserLocation = () => {
  const [locationText, setLocationText] = useState("Getting location...");
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();

            if (data.address) {
              const road = data.address.road || "";
              const neighbourhood =
                data.address.neighbourhood || data.address.suburb || "";
              const city =
                data.address.city ||
                data.address.town ||
                data.address.village ||
                "";

              let formattedAddress = "";
              if (road) formattedAddress += `${road}, `;
              if (neighbourhood) formattedAddress += `${neighbourhood}, `;
              if (city) formattedAddress += `${city}`;

              setLocationText(
                formattedAddress ||
                  "Location found, but address could not be parsed."
              );
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
        },
        (err) => {
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
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLocationText("Geolocation not supported.");
    }
  }, []);

  return (
    <div className="flex items-center space-x-0.5 lg:space-x-2">
      {" "}
      {/* Using flexbox for alignment */}
      <span>
        <CiLocationOn className="text-[#5E8B8C] text-[14px] lg:text-lg" />{" "}
        {/* Adjust size as needed */}
      </span>
      <p className="text-[12px] lg:text-sm text-[#2C2C2C] font-nunito font-medium">
        {locationText}
      </p>
      <span>
        <IoIosArrowDown className="text-[#5E8B8C] hidden lg:flex text-lg" />{" "}
        {/* Adjust size as needed */}
      </span>
      {error && <p className="text-xs text-red-500">{error}</p>}{" "}
      {/* Display error if any */}
    </div>
  );
};

export default UserLocation;
