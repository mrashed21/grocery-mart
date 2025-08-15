"use client";

import { AdminAuthContext } from "@/context/AdminProvider";
import useDebounced from "@/hooks/useDebounced";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import CreateZone from "./CreateZone";
import ZoneTable from "./ZoneTable";

const Zone = () => {
  const [zoneCreateModal, setZoneCreateModal] = useState(false);
  const { admin, adminLoading } = useContext(AdminAuthContext);
  const user = admin;
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchValue, setSearchValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  useEffect(() => {
    setSearchTerm(searchText);
  }, [searchText]);

  // Fetch Zone data
  const {
    data: zoneData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/zone/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/zone/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) {
          const errorData = await res.text();
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          );
        }

        const data = await res.json();
        return data;
      } catch (error) {
        console.error("Fetch error:", error);
        throw error;
      }
    },
  });

  // handle item search function....
  const handleSearchValue = (value) => {
    setSearchValue(value);
    setLimit(10);
    setPage(1);
  };

  return (
    <div className="py-6 px-1">
      <div className="flex justify-between mt-6">
        <div>
          <h1 className="text-2xl  uppercase">Delivery Zone</h1>
        </div>

        {user?.role_id?.zone_create && (
          <div>
            <button
              type="button"
              className="rounded-[8px] py-[10px] px-[14px] bg-[#084C4E]  transform hover:translate-y-[-2px] transition duration-200 text-white font-semibold text-sm cursor-pointer uppercase"
              onClick={() => setZoneCreateModal(true)}
            >
              Create Zone
            </button>
          </div>
        )}
      </div>
      {/* search Category... */}
      <div className="mt-3">
        <input
          type="text"
          defaultValue={searchTerm}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="SEARCH ZONE..."
          className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:textColor focus:border-transparent transition duration-200"
        />
      </div>
      {/* Category Data Show and update and delete operation file */}

      <ZoneTable
        zoneData={zoneData}
        setPage={setPage}
        setLimit={setLimit}
        page={page}
        limit={limit}
        totalData={zoneData?.totalData}
        setSearchTerm={setSearchTerm}
        refetch={refetch}
        user={user}
        isLoading={isLoading}
        adminLoading={adminLoading}
      />

      {/* Create category modal */}
      {zoneCreateModal && (
        <CreateZone
          refetch={refetch}
          setZoneCreateModal={setZoneCreateModal}
          user={user}
        />
      )}
    </div>
  );
};

export default Zone;
