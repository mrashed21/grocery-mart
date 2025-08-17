"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import OrderTable from "./OrderTable";

const OrderList = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const user = false;
  const loading = true;
  //handle item search function....
  const handleSearchValue = (value) => {
    setSearchValue(value);
    setLimit(10);
    setPage(1);
  };

  const {
    data: ordersData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/order/dashboard?order_status=pending&page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/order/dashboard?order_status=pending&page=${page}&limit=${limit}&searchTerm=${searchTerm}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      return data;
    },
  });

  return (
    <>
      <div className="bg-white rounded py-6 px-4 ">
        <div className="flex justify-between mt-6">
          <div>
            <h1 className="text-2xl">Pending Order List</h1>
          </div>
          <div></div>
        </div>
        <div className="mt-3 flex justify-end">
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
          loading={loading}
        />

        {/* add all ReSeller modal component */}
      </div>
    </>
  );
};

export default OrderList;
