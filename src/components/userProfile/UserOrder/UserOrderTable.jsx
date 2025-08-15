"use client";

import TableLoadingSkeleton from "@/components/Skeleton/TableLoadingSkeleton";
import { useUserInfoQuery } from "@/redux/feature/auth/authApi";
import { BASE_URL } from "@/utils/baseURL";
import { DateFormat } from "@/utils/DateFormate";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { FaRegEye } from "react-icons/fa";

const UserOrderTable = () => {
  const { data: userInfo, isLoding: userGetLoading } = useUserInfoQuery();
  const id = userInfo?.data?._id;
  const { data: ordersData, isLoading } = useQuery({
    queryKey: [`/api/v1/order?user_id=${id}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/order?user_id=${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      return data;
    },
  });

  if (userGetLoading) {
    return (
      <div className="flex justify-center items-center mt-6">
        <div className="h-8 w-8 border-4 border-gray-300 border-t-[#977b63] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <section className="pt-8">
          {/* Make the table wrapper horizontally scrollable */}
          <div className="mt-5 overflow-x-auto shadow-md">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="bg-[#5E8B8C]">
                <tr className="divide-x divide-gray-300  font-semibold text-center text-white">
                  <td className="whitespace-nowrap p-2">SL No</td>
                  <td className="whitespace-nowrap p-2">Date</td>
                  <td className="whitespace-nowrap p-2">Invoice No</td>
                  <td className="whitespace-nowrap p-2">Order Status</td>
                  <td className="whitespace-nowrap p-2">Total Amount</td>
                  <td className="whitespace-nowrap p-2">Discount Amount</td>
                  <td className="whitespace-nowrap p-2">Shipping Cost</td>
                  <td className="whitespace-nowrap p-2">Grand Total Amount</td>
                  <td className="whitespace-nowrap p-2">Zone</td>
                  <td className="whitespace-nowrap p-2">Address</td>
                  <td className="whitespace-nowrap p-2">View Details</td>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-center">
                {ordersData?.data?.map((order, index) => (
                  <tr
                    key={order?._id}
                    className={`divide-x divide-gray-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-[#e4e0e1]"
                    }`}
                  >
                    <td className="whitespace-nowrap p-2"> {index + 1}</td>
                    <td className="whitespace-nowrap p-2">
                      {DateFormat(order?.createdAt)}
                    </td>

                    <td className="whitespace-nowrap p-2">
                      <Link
                        href={`/user-profile/order-info/${order?._id}`}
                        className="underline font-medium text-blue-600"
                      >
                        {order?.invoice_id}
                      </Link>
                    </td>

                    <td className="whitespace-nowrap p-2 capitalize">
                      {order?.order_status}
                    </td>

                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {order?.sub_total_amount}
                    </td>
                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {order?.discount_amount}
                    </td>
                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {order?.shipping_cost}
                    </td>
                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {order?.grand_total_amount}
                    </td>
                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {order?.zone_id?.zone_name}
                    </td>

                    <td className="whitespace-nowrap p-2">
                      {" "}
                      {order?.shipping_address}
                    </td>

                    <td className="whitespace-nowrap flex justify-center items-center p-2">
                      <div>
                        <Link
                          href={`/user-profile/order-info/${order?._id}`}
                          className=" text-gray-500 hover:text-gray-900"
                        >
                          <FaRegEye size={23} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
};

export default UserOrderTable;
