"use client";

import LoaderOverlay from "@/components/Skeleton/LoaderOverlay";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import AllSiteSetting from "./AllSiteSetting";
import PhoneCredential from "./PhoneCredential";

const Settings = () => {
  const [activeNavButton, setActiveNavButton] = useState("SiteSetting");

  const handleNavButtonClick = (buttonName) => {
    setActiveNavButton(buttonName);
    sessionStorage.setItem("activeTab", buttonName);
  };
  useEffect(() => {
    // Retrieve active dropdown from localStorage when the component mounts
    const saveDropDown = sessionStorage.getItem("activeTab");
    if (saveDropDown) {
      setActiveNavButton(saveDropDown);
    }
  }, []);

  //data fetching of Authentication by Tans Tack Query
  const {
    data: getInitialAuthenticationData,
    isLoading: authLoading,
    refetch,
  } = useQuery({
    queryKey: [`/api/v1/authentication`],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/authentication`, {
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.text(); // Get more info about the error
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          );
        }

        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error; // Rethrow to propagate the error to react-query
      }
    },
  });

  //data fetching of Currency by Tans Tack Query
  const {
    data: getInitialCurrencyData,
    isLoading: currencyLoading,
    refetch: currencyRefetch,
  } = useQuery({
    queryKey: [`/api/v1/setting`],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/setting`, {
          credentials: "include",
        });

        if (!res.ok) {
          const errorData = await res.text(); // Get more info about the error
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          );
        }

        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error; // Rethrow to propagate the error to react-query
      }
    },
  });

  if (authLoading || currencyLoading) {
    return <LoaderOverlay />;
  }

  return (
    <div>
      <div className="flex flex-wrap  gap-4 mt-8">
        <button
          className={`duration-200 p-2 font-medium text-sm sm:text-base border-2 border-gray-200 rounded cursor-pointer ${
            activeNavButton === "SiteSetting"
              ? "bg-[#084C4E] text-white text-sm rounded-lg border-none px-5"
              : "bg-gray-100"
          }`}
          onClick={() => handleNavButtonClick("SiteSetting")}
        >
          Site Setting
        </button>

        <button
          className={`duration-200 p-2 font-medium text-sm sm:text-base border-2 border-gray-200 rounded cursor-pointer ${
            activeNavButton === "phoneCredential"
              ? "bg-[#084C4E] text-white text-sm rounded-lg border-none px-5"
              : "bg-gray-100"
          }`}
          onClick={() => handleNavButtonClick("phoneCredential")}
        >
          OTP By Phone Credential
        </button>

        {/* <button
          className={`duration-200 p-2 font-medium text-sm sm:text-base border-2 border-gray-200 rounded cursor-pointer ${
            activeNavButton === "Currency Configuration"
              ? "bg-[#084C4E] text-white text-sm rounded-lg border-none px-5"
              : "bg-gray-100"
          }`}
          onClick={() => handleNavButtonClick("Currency Configuration")}
        >
          Currency Symbol
        </button>
        <button
          className={`duration-200 p-2 font-medium text-sm sm:text-base border-2 border-gray-200 rounded cursor-pointer ${
            activeNavButton === "ShippingConfiguration"
              ? "bg-[#084C4E] text-white text-sm rounded-lg border-none px-5"
              : "bg-gray-100"
          }`}
          onClick={() => handleNavButtonClick("ShippingConfiguration")}
        >
          Shipping Configuration
        </button> */}
      </div>

      <div className="mt-6 min-w-[1050px]">
        {/* {activeNavButton == "Currency Configuration" && (
          <CurrencySymbol
            refetch={currencyRefetch}
            getInitialCurrencyData={getInitialCurrencyData?.data[0]}
          />
        )} */}

        {activeNavButton == "phoneCredential" && (
          <PhoneCredential
            refetch={refetch}
            initialAuthenticationData={getInitialAuthenticationData?.data[0]}
          />
        )}
        {/* {activeNavButton == "ShippingConfiguration" && (
          <ShippingConFiguration
            refetch={currencyRefetch}
            getInitialCurrencyData={getInitialCurrencyData?.data[0]}
          />
        )} */}
        {activeNavButton == "SiteSetting" && (
          <AllSiteSetting
            refetch={currencyRefetch}
            getInitialCurrencyData={getInitialCurrencyData?.data[0]}
          />
        )}
      </div>
    </div>
  );
};

export default Settings;
