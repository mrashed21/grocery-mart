"use client";
import { AdminAuthContext } from "@/context/AdminProvider";
import useDebounced from "@/hooks/useDebounced";
import { useAllStaff } from "@/lib/getStaffData";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import AddAllStaff from "./AddAllStaff";
import AllStaffTable from "./AllStaffTable";

const AllStaff = () => {
  //Add staff modal open state
  const [openAddStaffModal, setOpenAddStaffModal] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const { admin, adminLoading } = useContext(AdminAuthContext);
  const user = admin;
  const {
    data: staffData,
    isLoading: isLoadingStaff,
    refetch,
  } = useAllStaff({ page, limit, searchTerm });

  // handle item search function....
  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  useEffect(() => {
    setSearchTerm(searchText);
  }, [searchText]);

  // Role data fetch
  const { data: roleData, isLoading } = useQuery({
    queryKey: [`/api/v1/role`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/role`, {
        credentials: "include",
      });

      const data = await res.json();
      return data?.data;
    },
  });

  // handle item search function....
  const handleSearchValue = (value) => {
    setSearchValue(value);
    setLimit(10);
    setPage(1);
  };

  return (
    <>
      <div className="rounded py-6 px-4">
        <div className="flex justify-between mt-6">
          <div>
            <h1 className="text-2xl">All Staff List </h1>
          </div>
          <div>
            {user?.role_id?.admin_create === true && (
              <div>
                <button
                  className="w-[138px] h-[40px] rounded-[8px] py-[10px] px-[14px] bg-[#084C4E] text-white   text-sm cursor-pointer"
                  onClick={() => setOpenAddStaffModal(true)}
                >
                  Add Staff
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-3">
          <input
            type="text"
            defaultValue={searchTerm}
            onChange={(e) => handleSearchValue(e.target.value)}
            placeholder="Search Category..."
            className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        {/* show All Staff Table List Component*/}
        <AllStaffTable
          staffData={staffData?.data}
          totalData={staffData?.totalData}
          refetch={refetch}
          limit={limit}
          page={page}
          setPage={setPage}
          setLimit={setLimit}
          roleData={roleData}
          isLoading={isLoading}
          user={user}
          isLoadingStaff={isLoadingStaff}
          adminLoading={adminLoading}
        />

        {/* add all Staff modal component */}
        {openAddStaffModal && (
          <AddAllStaff
            setOpenAddStaffModal={setOpenAddStaffModal}
            roleData={roleData}
            refetch={refetch}
            isLoading={isLoading}
            user={user}
          />
        )}
      </div>
    </>
  );
};

export default AllStaff;
