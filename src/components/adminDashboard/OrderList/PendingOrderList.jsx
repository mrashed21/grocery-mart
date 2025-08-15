"use client";//

import { AdminAuthContext } from "@/context/AdminProvider";
import useDebounced from "@/hooks/useDebounced";
import { useAllStaff } from "@/lib/getStaffData";
import { BASE_URL } from "@/utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import OrderTable from "./OrderTable";

const PendingOrderList = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const { admin, adminLoading } = useContext(AdminAuthContext);
  const user = admin;

  //handle item search function....
  const handleSearchValue = (value) => {
    setSearchValue(value);
    setLimit(10);
    setPage(1);
  };

  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  useEffect(() => {
    setSearchTerm(searchText);
  }, [searchText]);

  let isSuperAdmin = false;
  // Decide API endpoint based on role
  if (user?.role_id?.order_show && OTP ) {
    isSuperAdmin = true; // assign, not compare
  } else if (user?.role_id?.assign_staff_order_show) {
    isSuperAdmin = false;
  }

  const apiUrl = isSuperAdmin
    ? `${BASE_URL}/order/dashboard?order_status=pending&page=${page}&limit=${limit}&searchTerm=${searchTerm}`
    : `${BASE_URL}/order/assign_staff_order?assign_staff_id=${user?._id}&order_status=pending&page=${page}&limit=${limit}&searchTerm=${searchTerm}`;

  // Fetch orders
  const {
    data: ordersData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [apiUrl],
    queryFn: async () => {
      const res = await fetch(apiUrl, { credentials: "include" });
      const data = await res.json();
      return data;
    },
    enabled: !!user?._id, // wait for user data
  });

  // Fetch staff list (only for admin use)
  const { data: staffData, isLoading: isLoadingStaff } = useAllStaff({
    page: 1,
    limit: 9999,
    searchTerm: "",
  });

  return (
    <>
      <div className="bg-white rounded py-6 px-4 ">
        <div className="flex justify-between mt-6">
          <div>
            <h1 className="text-2xl">Pending Order List</h1>
          </div>
        </div>
        <div className=" flex justify-end">
          <input
            type="text"
            defaultValue={searchTerm}
            onChange={(e) => handleSearchValue(e.target.value)}
            placeholder="Search Order Invoice No..."
            className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>
        {/* show All Order Table List Component*/}
        <OrderTable
          ordersData={ordersData?.data}
          refetch={refetch}
          limit={limit}
          page={page}
          setPage={setPage}
          setLimit={setLimit}
          isLoading={isLoading}
          user={user}
          totalData={ordersData?.totalData}
          adminLoading={adminLoading}
          staffData={staffData?.data}
          isLoadingStaff={isLoadingStaff}
        />

        {/* add all ReSeller modal component */}
      </div>
    </>
  );
};

export default PendingOrderList;
